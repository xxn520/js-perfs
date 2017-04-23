package com.m2mbob.jsperfs.jersey;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * Created by m2mbob on 2017/4/21.
 */
@PreMatching
public class SinglePageProvider implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        try {
            if (!requestContext.getUriInfo().getPath().startsWith("api/")
                    && !requestContext.getUriInfo().getPath().startsWith("js-perfs/")) {
                requestContext.setRequestUri(new URI("/"));
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

}
