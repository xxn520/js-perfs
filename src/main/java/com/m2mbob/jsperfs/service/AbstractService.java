package com.m2mbob.jsperfs.service;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.TypeUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.glassfish.jersey.server.internal.inject.ParamConverterFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.ParamConverter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
public abstract class AbstractService {

    protected Log logger = LogFactory.getLog(this.getClass());

    public <T> Specification<T> specification(UriInfo uri, ParamConverterFactory pcf) {
        return new QuerySpecification<T>(uri.getQueryParameters(), pcf);
    }

    public <T> Specification<T> specification(MultivaluedMap<String, String> map, ParamConverterFactory pcf) {
        return new QuerySpecification<T>(map, pcf);
    }

    private static class QuerySpecification<T> implements Specification<T> {
        private MultivaluedMap<String, String> map;
        private Predicate predicate;
        private ParamConverterFactory pcf;

        /**
         * @param map
         * @param pcf
         */
        public QuerySpecification(MultivaluedMap<String, String> map, ParamConverterFactory pcf) {
            this.map = map;
            this.pcf = pcf;
        }

        @Override
        public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            if (this.predicate != null) { // 同样的查询条件只做一次拼装
                return this.predicate;
            }
            List<Predicate> list = new ArrayList<Predicate>();
            addAllPredicates(root, cb, list);
            if (!list.isEmpty()) {
                this.predicate = cb.and(list.toArray(new Predicate[list.size()]));
                return this.predicate;
            }
            this.predicate = cb.conjunction();
            return this.predicate;
        }

        @SuppressWarnings("unchecked")
        private <Y extends Comparable<Y>>void addAllPredicates(Root<T> root, CriteriaBuilder cb, List<Predicate> list) {
            for (Map.Entry<String, List<String>> entry : this.map.entrySet()) {
                String value = entry.getValue().get(0).trim();
                if (StringUtils.isEmpty(value)) {
                    continue;
                }
                Path<Y> path = null;
                String key = entry.getKey();
                String operation = "";
                try {
                    if (key.contains("_")) { // 子对象关联查询，通过'_'来连接子对象
                        String[] names = key.split("_");
                        path = root.get(names[0]);
                        for (int i = 1; i < names.length; i++) {
                            path = path.get(names[i]);
                        }
                    } else {
                        path = root.get(key);
                    }
                } catch (Exception e) {
                    int idx = key.indexOf("-");
                    if (idx > -1) {
                        String[] keys = key.split("-");
                        path = root.get(keys[0]);
                        operation = keys[1];
                    } else {
                        continue; // 过滤掉无效的查询参数
                    }
                }
                if (path.getJavaType().getName().equals("java.lang.String")) {
                    if (StringUtils.contains(value, "*")) {
                        list.add(cb.like((Path<String>) path, StringUtils.replace(value, "*", "%")));
                    } else {
                        list.add(cb.equal((Path<String>) path, value));
                    }
                } else if (path.getJavaType().getName().equals("boolean")) {
                    list.add(cb.equal(path, Boolean.valueOf(value)));
                } else {
                    ParamConverter<Y> converter = (ParamConverter<Y>) pcf.getConverter(path.getJavaType(),
                            TypeUtils.wrap(path.getJavaType()).getType(), null);
                    if (converter != null && StringUtils.isNotEmpty(value)) {
                        list.add(getPredicate(cb, value, path, converter, operation));
                    } else {
                        try {
                            // 利用反射获取属性对象实例
                            Method method = path.getJavaType().getMethod("valueOf", String.class);
                            list.add(cb.equal(path, method.invoke(null, value)));
                        } catch (NoSuchMethodException | SecurityException | IllegalAccessException
                                | IllegalArgumentException | InvocationTargetException e) {
                            // TODO 抛出对象不存在valueOf方法的异常
                            e.printStackTrace();
                        }
                    }
                }
            }
        }

        private <Y extends Comparable<Y>>Predicate getPredicate(CriteriaBuilder cb, String value, Path<Y> path,
                                                                ParamConverter<Y> converter, String operation) {
            switch (operation) {
                case "le":
                    return cb.lessThanOrEqualTo(path, converter.fromString(value));
                case "lt":
                    return cb.lessThan(path, converter.fromString(value));
                case "ge":
                    return cb.greaterThanOrEqualTo(path, converter.fromString(value));
                case "gt":
                    return cb.greaterThan(path, converter.fromString(value));
                default:
                    return cb.equal(path, converter.fromString(value));
            }
        }
    }

}
