package com.m2mbob.jsperfs.service;

import com.m2mbob.jsperfs.model.BaseModel;
import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.BooleanJunction;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Map;

@Service
public class SearchService<T extends BaseModel> extends AbstractService {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    public Page<T> search(String keywords, Pageable page, Class<T> clazz, String... fields) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(clazz).get();
        Query q = qb.keyword().onFields(fields).matching(keywords).createQuery();
        FullTextQuery query = fullTextEntityManager.createFullTextQuery(q, clazz);
        query.setMaxResults(page.getPageSize());
        query.setFirstResult(page.getOffset());
        return new PageImpl<T>(query.getResultList(), page, query.getResultSize());
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public Page<T> search(Map<String, String> kv, Pageable page, Class<T> clazz) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(clazz).get();
        BooleanJunction<BooleanJunction> bj = qb.bool();
        for (Map.Entry<String, String> entry : kv.entrySet()) {
            bj.must(qb.keyword().onField(entry.getKey()).matching(entry.getValue()).createQuery());
        }
        FullTextQuery query = fullTextEntityManager.createFullTextQuery(bj.createQuery(), clazz);
        return new PageImpl<T>(query.getResultList(), page, query.getResultSize());
    }
}
