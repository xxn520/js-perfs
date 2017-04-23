package com.m2mbob.jsperfs.controller.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.m2mbob.jsperfs.Constants;
import com.m2mbob.jsperfs.service.AbstractService;
import org.glassfish.jersey.server.mvc.Viewable;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 * Created by m2mbob on 2017/4/14.
 */
@Controller
@Path(Constants.ROOT_PATH)
public class IndexController extends AbstractService {

    @Inject
    private ObjectMapper objectMapper;

    @GET
    public Viewable index() {
        return new Viewable("/index.ftl");
    }

}
