package com.m2mbob.jsperfs.controller.api;

import com.m2mbob.jsperfs.Constants;
import com.m2mbob.jsperfs.dao.MonitorRecordRepository;
import com.m2mbob.jsperfs.model.MonitorRecord;
import com.m2mbob.jsperfs.service.AbstractService;
import com.m2mbob.jsperfs.vo.PageParams;
import org.glassfish.jersey.server.internal.inject.ParamConverterFactory;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

/**
 * Created by m2mbob on 2017/4/21.
 */
@Controller
@Path(Constants.API_PATH + "monitor")
public class MonitorApiController extends AbstractService {

    @Inject
    private MonitorRecordRepository repository;

    @GET
    public Page<MonitorRecord> find(@BeanParam PageParams pageParams, @Context UriInfo uri, @Context ParamConverterFactory pcf) {
        if (!uri.getQueryParameters().isEmpty()) {
            return this.repository.findAll(this.specification(uri, pcf), pageParams);
        } else {
            return this.repository.findAll(pageParams);
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public MonitorRecord create(MonitorRecord monitorRecord) {
        return repository.save(monitorRecord);
    }

    @DELETE
    @Path("{id:\\d+}")
    @Transactional
    public Long destroy(@PathParam("id") Long id) {
        this.repository.delete(id);
        return id;
    }

}
