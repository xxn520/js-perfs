package com.m2mbob.jsperfs.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module.Feature;
import com.m2mbob.jsperfs.jersey.CmsResourceConfigCustomizer;
import com.m2mbob.jsperfs.jpa.DefaultJpaRepository;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jersey.ResourceConfigCustomizer;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.PostConstruct;
import java.io.File;
import java.util.Locale;
import java.util.TimeZone;

@EnableJpaAuditing
@EnableAsync
@EntityScan("com.m2mbob.jsperfs.**.model")
@EnableTransactionManagement
@SpringBootApplication(scanBasePackages = { "com.m2mbob.jsperfs" })
@EnableJpaRepositories(basePackages = { "com.m2mbob.jsperfs.**.dao" }, repositoryBaseClass = DefaultJpaRepository.class)
@CrossOrigin(methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT,
        RequestMethod.OPTIONS, RequestMethod.HEAD })
public class AppConfig {

    @PostConstruct
    public void setDefaultLocale() {
        Locale.setDefault(Locale.SIMPLIFIED_CHINESE);
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Shanghai"));
    }

    @Bean
    public ObjectMapper objectMapper() {
        Hibernate5Module hibernate5Module = new Hibernate5Module().disable(Feature.FORCE_LAZY_LOADING)
                .disable(Feature.USE_TRANSIENT_ANNOTATION);
        return new ObjectMapper().disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
                .disable(DeserializationFeature.FAIL_ON_INVALID_SUBTYPE)
                .disable(SerializationFeature.WRITE_ENUMS_USING_INDEX)
                .setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE).registerModule(hibernate5Module);
    }

    @Bean
    public ResourceConfigCustomizer cmsResourceConfigCustomizer() {
        return new CmsResourceConfigCustomizer();
    }

    @Bean
    public ResourceConfig resourceConfig() {
        return new ResourceConfig();
    }

    @Bean
    @Profile({ "dev", "test" })
    public EmbeddedServletContainerCustomizer containerCustomizer() {
        return new EmbeddedServletContainerCustomizer() {
            @Override
            public void customize(ConfigurableEmbeddedServletContainer container) {
                File root = new File("target/static");
                if (root != null && root.exists() && root.isDirectory()) {
                    container.setDocumentRoot(root.getAbsoluteFile());
                }
            }
        };
    }

}
