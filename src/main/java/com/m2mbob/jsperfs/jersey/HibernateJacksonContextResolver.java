package com.m2mbob.jsperfs.jersey;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module.Feature;

import javax.inject.Inject;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

@Provider
public class HibernateJacksonContextResolver implements ContextResolver<ObjectMapper> {

    @Inject
    private ObjectMapper objectMapper;

    public HibernateJacksonContextResolver() {
        super();
    }

    @Override
    public ObjectMapper getContext(Class<?> type) {
        if (this.objectMapper == null) {
            Hibernate5Module hibernate5Module = new Hibernate5Module().disable(Feature.FORCE_LAZY_LOADING)
                    .disable(Feature.USE_TRANSIENT_ANNOTATION);
            this.objectMapper = new ObjectMapper().disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
                    .disable(DeserializationFeature.FAIL_ON_INVALID_SUBTYPE)
                    .disable(SerializationFeature.WRITE_ENUMS_USING_INDEX)
                    .setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE).registerModule(hibernate5Module);
        }
        return objectMapper;
    }

}
