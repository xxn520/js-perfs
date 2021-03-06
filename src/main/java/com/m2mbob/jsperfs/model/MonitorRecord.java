package com.m2mbob.jsperfs.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by m2mbob on 2017/4/21.
 */
@Entity
@Cacheable
public class MonitorRecord extends BaseModel {

    @Column(scale = 2)
    private Double mutations;

    private String type;

    @Lob
    private String json;

    @Temporal(TemporalType.TIMESTAMP)
    private Date start_time;

    @Temporal(TemporalType.TIMESTAMP)
    private Date stop_time;

    public MonitorRecord() {
    }

    public MonitorRecord(Long id) {
        super(id);
    }

    public double getMutations() {
        return mutations;
    }

    public void setMutations(double mutations) {
        this.mutations = mutations;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public Date getStart_time() {
        return start_time;
    }

    public void setStart_time(Date start_time) {
        this.start_time = start_time;
    }

    public Date getStop_time() {
        return stop_time;
    }

    public void setStop_time(Date stop_time) {
        this.stop_time = stop_time;
    }
}
