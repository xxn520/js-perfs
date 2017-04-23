package com.m2mbob.jsperfs.jersey;

import org.apache.commons.lang3.StringUtils;
import org.glassfish.jersey.server.internal.LocalizationMessages;

import javax.inject.Singleton;
import javax.ws.rs.ext.ParamConverter;
import javax.ws.rs.ext.ParamConverterProvider;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.time.LocalDateTime;

@Singleton
public class LocalDateTimeProvider implements ParamConverterProvider {

    /* (non-Javadoc)
     * @see javax.ws.rs.ext.ParamConverterProvider#getConverter(java.lang.Class, java.lang.reflect.Type, java.lang.annotation.Annotation[])
     */
    @Override
    public <T> ParamConverter<T> getConverter(Class<T> rawType, Type genericType, Annotation[] annotations) {
        return (rawType != LocalDateTime.class) ? null : new ParamConverter<T>() {

            @Override
            public T fromString(String value) {
                if (StringUtils.isEmpty(value)) {
                    throw new IllegalArgumentException(LocalizationMessages.METHOD_PARAMETER_CANNOT_BE_NULL("value"));
                }
                return rawType.cast(LocalDateTime.parse(value));
            }

            @Override
            public String toString(T value) {
                if (value == null) {
                    throw new IllegalArgumentException(LocalizationMessages.METHOD_PARAMETER_CANNOT_BE_NULL("value"));
                }
                return ((LocalDateTime)value).toString();
            }

        };
    }

}
