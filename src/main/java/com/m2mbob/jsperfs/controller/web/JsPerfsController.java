package com.m2mbob.jsperfs.controller.web;

import com.m2mbob.jsperfs.Constants;
import org.glassfish.jersey.server.mvc.Viewable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by m2mbob on 2017/4/19.
 */
@Controller
@Path(Constants.ROOT_PATH + "js-perfs")
public class JsPerfsController {

    @Value("${spring.profiles.active}")
    private String profile;

    @GET
    @Path("/angular")
    public Viewable angular() {
        Map<String, String> model = new HashMap<>();
        model.put("pageName", "angular");
        model.put("env", profile);
        return new Viewable("/js-perfs/angular.ftl", model);
    }

    @GET
    @Path("/angular-trackby")
    public Viewable angularTrackBy() {
        Map<String, String> model = new HashMap<>();
        model.put("pageName", "angular-trackby");
        model.put("env", profile);
        return new Viewable("/js-perfs/angular-trackby.ftl", model);
    }

    @GET
    @Path("/vue1")
    public Viewable vue1() {
        Map<String, String> model = new HashMap<>();
        model.put("pageName", "vue1");
        model.put("env", profile);
        return new Viewable("/js-perfs/vue1.ftl", model);
    }

    @GET
    @Path("/vue2")
    public Viewable vue2() {
        Map<String, String> model = new HashMap<>();
        model.put("pageName", "vue2");
        model.put("env", profile);
        return new Viewable("/js-perfs/vue2.ftl", model);
    }

    @GET
    @Path("/react")
    public Viewable react() {
        Map<String, String> model = new HashMap<>();
        model.put("pageName", "react");
        model.put("env", profile);
        return new Viewable("/js-perfs/react.ftl", model);
    }

    @GET
    @Path("/react-fiber")
    public Viewable reactFiber() {
        Map<String, String> model = new HashMap<>();
        model.put("pageName", "react-fiber");
        model.put("env", profile);
        return new Viewable("/js-perfs/react-fiber.ftl", model);
    }

    @GET
    @Path("/innerHTML")
    public Viewable innerHTML() {
        Map<String, String> model = new HashMap<>();
        model.put("pageName", "innerHTML");
        model.put("env", profile);
        return new Viewable("/js-perfs/innerHTML.ftl", model);
    }

    @GET
    @Path("/backbone")
    public Viewable backbone() {
        Map<String, String> model = new HashMap<>();
        model.put("pageName", "backbone");
        model.put("env", profile);
        return new Viewable("/js-perfs/backbone.ftl", model);
    }

}
