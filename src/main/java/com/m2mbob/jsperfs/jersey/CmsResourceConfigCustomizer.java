package com.m2mbob.jsperfs.jersey;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.HttpMethodOverrideFilter;
import org.glassfish.jersey.server.mvc.freemarker.FreemarkerMvcFeature;
import org.glassfish.jersey.server.mvc.internal.ErrorTemplateExceptionMapper;
import org.glassfish.jersey.server.mvc.internal.MvcBinder;
import org.springframework.boot.autoconfigure.jersey.JerseyProperties;
import org.springframework.boot.autoconfigure.jersey.ResourceConfigCustomizer;

import javax.inject.Inject;
import javax.ws.rs.ext.ParamConverterProvider;

public class CmsResourceConfigCustomizer implements ResourceConfigCustomizer {

    @Inject
    private JerseyProperties jerseyProperties;

    /*
     * (non-Javadoc)
     *
     * @see
     * org.springframework.boot.autoconfigure.jersey.ResourceConfigCustomizer#
     * customize(org.glassfish.jersey.server.ResourceConfig)
     */
    @Override
    public void customize(ResourceConfig config) {
        config.setProperties(this.jerseyProperties.getInit())
                .register(HttpMethodOverrideFilter.class)
                .register(SinglePageProvider.class)
                .register(MultiPartFeature.class)
                .register(FreemarkerMvcFeature.class)
                .register(CommonExceptionMapper.class)
                .register(ErrorTemplateExceptionMapper.class)
                .register(new MvcBinder())
                .register(new CustomBinder());
    }

    private static class CustomBinder extends AbstractBinder {
        @Override
        protected void configure() {
            bind(DateProvider.class).to(ParamConverterProvider.class).ranked(10);
            bind(LocalDateProvider.class).to(ParamConverterProvider.class).ranked(10);
            bind(LocalTimeProvider.class).to(ParamConverterProvider.class).ranked(10);
            bind(LocalDateTimeProvider.class).to(ParamConverterProvider.class).ranked(10);
        }
    }
}
