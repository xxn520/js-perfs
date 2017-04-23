package com.m2mbob.jsperfs.jersey;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.glassfish.jersey.server.mvc.Viewable;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.ForbiddenException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.ServerErrorException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@Provider
public class CommonExceptionMapper implements ExceptionMapper<Exception> {
    Log log = LogFactory.getLog(this.getClass());
    @Context
    private HttpServletRequest request;

    @Override
    public Response toResponse(Exception exception) {
        Map<String, Object> map = new HashMap<>();
        WebApplicationException we;
        if (exception instanceof AccessDeniedException) {
            we = new ForbiddenException(exception);
        } else if (exception instanceof NullPointerException) {
            we = new NotFoundException();
        } else if (exception instanceof WebApplicationException) {
            we = (WebApplicationException) exception;
        } else {
            we = new ServerErrorException(Status.INTERNAL_SERVER_ERROR, exception);
        }
        log.error("error", exception);
        map.put("error", we);
        String extension = FilenameUtils.getExtension(this.request.getRequestURI());
        if (MediaType.APPLICATION_JSON_TYPE.getSubtype().equals(extension)) {
            return Response.fromResponse(we.getResponse()).type(MediaType.APPLICATION_JSON_TYPE)
                    .entity(new Error(String.valueOf(we.getResponse().getStatus()), we)).build();
        }
        return Response.status(we.getResponse().getStatusInfo()).entity(new Viewable("/500", map)).build();
    }
}
