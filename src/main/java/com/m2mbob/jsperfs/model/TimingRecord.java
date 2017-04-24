package com.m2mbob.jsperfs.model;

import javax.persistence.Cacheable;
import javax.persistence.Entity;
import java.math.BigDecimal;

/**
 * Created by m2mbob on 2017/4/24.
 */
@Entity
@Cacheable
public class TimingRecord extends BaseModel {

    private String type;

    private BigDecimal appcacheTime;

    private BigDecimal connectTime;

    private BigDecimal domReadyTime;

    private BigDecimal firstPaintTime;

    private BigDecimal initDomTreeTime;

    private BigDecimal loadEventTime;

    private BigDecimal loadTime;

    private BigDecimal lookupDomainTime;

    private BigDecimal readyStart;

    private BigDecimal redirectTime;

    private BigDecimal requestTime;

    private BigDecimal unloadEventTime;

    private Integer times = 1;

    public TimingRecord() {
    }

    public TimingRecord(Long id) {
        super(id);
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getAppcacheTime() {
        return appcacheTime;
    }

    public void setAppcacheTime(BigDecimal appcacheTime) {
        this.appcacheTime = appcacheTime;
    }

    public BigDecimal getConnectTime() {
        return connectTime;
    }

    public void setConnectTime(BigDecimal connectTime) {
        this.connectTime = connectTime;
    }

    public BigDecimal getDomReadyTime() {
        return domReadyTime;
    }

    public void setDomReadyTime(BigDecimal domReadyTime) {
        this.domReadyTime = domReadyTime;
    }

    public BigDecimal getFirstPaintTime() {
        return firstPaintTime;
    }

    public void setFirstPaintTime(BigDecimal firstPaintTime) {
        this.firstPaintTime = firstPaintTime;
    }

    public BigDecimal getInitDomTreeTime() {
        return initDomTreeTime;
    }

    public void setInitDomTreeTime(BigDecimal initDomTreeTime) {
        this.initDomTreeTime = initDomTreeTime;
    }

    public BigDecimal getLoadEventTime() {
        return loadEventTime;
    }

    public void setLoadEventTime(BigDecimal loadEventTime) {
        this.loadEventTime = loadEventTime;
    }

    public BigDecimal getLoadTime() {
        return loadTime;
    }

    public void setLoadTime(BigDecimal loadTime) {
        this.loadTime = loadTime;
    }

    public BigDecimal getLookupDomainTime() {
        return lookupDomainTime;
    }

    public void setLookupDomainTime(BigDecimal lookupDomainTime) {
        this.lookupDomainTime = lookupDomainTime;
    }

    public BigDecimal getReadyStart() {
        return readyStart;
    }

    public void setReadyStart(BigDecimal readyStart) {
        this.readyStart = readyStart;
    }

    public BigDecimal getRedirectTime() {
        return redirectTime;
    }

    public void setRedirectTime(BigDecimal redirectTime) {
        this.redirectTime = redirectTime;
    }

    public BigDecimal getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(BigDecimal requestTime) {
        this.requestTime = requestTime;
    }

    public BigDecimal getUnloadEventTime() {
        return unloadEventTime;
    }

    public void setUnloadEventTime(BigDecimal unloadEventTime) {
        this.unloadEventTime = unloadEventTime;
    }

    public Integer getTimes() {
        return times;
    }

    public void setTimes(Integer times) {
        this.times = times;
    }

}
