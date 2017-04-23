package com.m2mbob.jsperfs.jpa;

import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import javax.persistence.EntityManager;
import javax.persistence.QueryHint;
import javax.persistence.TypedQuery;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class DefaultJpaRepository<T, ID extends Serializable> extends SimpleJpaRepository<T, ID> {

	/**
	 * @param domainClass
	 * @param em
	 */
	public DefaultJpaRepository(Class<T> domainClass, EntityManager em) {
		super(domainClass, em);
	}

	/**
	 * @param entityInformation
	 * @param entityManager
	 */
	public DefaultJpaRepository(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
		super(entityInformation, entityManager);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.data.jpa.repository.support.SimpleJpaRepository#
	 * getCountQuery(org.springframework.data.jpa.domain.Specification)
	 */
	@Override
	protected TypedQuery<Long> getCountQuery(Specification<T> spec) {
		TypedQuery<Long> countQuery = super.getCountQuery(spec);
		Map<String, Object> queryHints = findCountQueryHints(this.getRepositoryMethodMetadata().getMethod());
		for (Entry<String, Object> hint : queryHints.entrySet()) {
			countQuery.setHint(hint.getKey(), hint.getValue());
		}
		return countQuery;
	}

	private static Map<String, Object> findCountQueryHints(Method method) {

		Map<String, Object> queryHints = new HashMap<String, Object>();
		QueryHints queryHintsAnnotation = AnnotationUtils.findAnnotation(method, QueryHints.class);

		if (queryHintsAnnotation != null && queryHintsAnnotation.forCounting()) {
			for (QueryHint hint : queryHintsAnnotation.value()) {
				queryHints.put(hint.name(), hint.value());
			}
		}

		return Collections.unmodifiableMap(queryHints);
	}
	
	/* (non-Javadoc)
	 * @see org.springframework.data.jpa.repository.support.SimpleJpaRepository#count()
	 */
	@Override
	public long count() {
		return this.getCountQuery(null).getSingleResult();
	}

	/* (non-Javadoc)
	 * @see org.springframework.data.jpa.repository.support.SimpleJpaRepository#count(org.springframework.data.jpa.domain.Specification)
	 */
	@Override
	public long count(Specification<T> spec) {
		return this.getCountQuery(spec).getSingleResult();
	}

}
