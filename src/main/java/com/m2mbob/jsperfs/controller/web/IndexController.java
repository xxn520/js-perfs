package com.m2mbob.jsperfs.controller.web;

import com.m2mbob.jsperfs.Constants;
import com.m2mbob.jsperfs.service.AbstractService;
import org.glassfish.jersey.server.mvc.Viewable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by m2mbob on 2017/4/14.
 */
@Controller
@Path(Constants.ROOT_PATH)
public class IndexController extends AbstractService {

    @Value("${spring.profiles.active}")
    private String profile;

    @GET
    public Viewable index() {
        Map<String, String> model = new HashMap<>();
        model.put("env", profile);
        return new Viewable("/index.ftl", model);
    }

}
