package com.m2mbob.jsperfs.controller.api;

import com.m2mbob.jsperfs.Constants;
import com.m2mbob.jsperfs.dao.TimingRecordRepository;
import com.m2mbob.jsperfs.model.TimingRecord;
import com.m2mbob.jsperfs.service.AbstractService;
import org.glassfish.jersey.server.internal.inject.ParamConverterFactory;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by m2mbob on 2017/4/24.
 */
@Controller
@Path(Constants.API_PATH + "timing")
public class TimingApiController extends AbstractService{

    @Inject
    private TimingRecordRepository repository;

    @GET
    public List<TimingRecord> find(@Context UriInfo uri, @Context ParamConverterFactory pcf) {
        if (!uri.getQueryParameters().isEmpty()) {
            return this.repository.findAll(this.specification(uri, pcf));
        } else {
            return this.repository.findAll();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public TimingRecord create(TimingRecord timingRecord) {
        TimingRecord record = repository.findByType(timingRecord.getType());
        if (record == null) {
            return repository.save(timingRecord);
        } else {
            Integer times = record.getTimes();
            record.setAppcacheTime(
                record.getAppcacheTime()
                    .multiply(BigDecimal.valueOf(times))
                    .add(timingRecord.getAppcacheTime())
                    .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setConnectTime(
                    record.getConnectTime()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getConnectTime())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setDomReadyTime(
                    record.getDomReadyTime()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getDomReadyTime())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setFirstPaintTime(
                    record.getFirstPaintTime()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getFirstPaintTime())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setInitDomTreeTime(
                    record.getInitDomTreeTime()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getInitDomTreeTime())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setLoadEventTime(
                    record.getLoadEventTime()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getLoadEventTime())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setLoadTime(
                    record.getLoadTime()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getLoadTime())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setLookupDomainTime(
                    record.getLookupDomainTime()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getLookupDomainTime())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setReadyStart(
                    record.getReadyStart()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getReadyStart())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setRedirectTime(
                    record.getRedirectTime()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getRedirectTime())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setRequestTime(
                    record.getRequestTime()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getRequestTime())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setUnloadEventTime(
                    record.getUnloadEventTime()
                            .multiply(BigDecimal.valueOf(times))
                            .add(timingRecord.getUnloadEventTime())
                            .divide(BigDecimal.valueOf(times + 1), 2, BigDecimal.ROUND_HALF_UP)
            );
            record.setTimes(times + 1);
            return repository.save(record);
        }
    }

}
