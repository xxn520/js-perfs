package com.m2mbob.jsperfs.dao;

import com.m2mbob.jsperfs.model.TimingRecord;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;

/**
 * Created by m2mbob on 2017/4/24.
 */
public interface TimingRecordRepository extends HibernateBasedRepository<TimingRecord, Long>{

    @QueryHints(@QueryHint(name = org.hibernate.jpa.QueryHints.HINT_CACHEABLE, value = "true"))
    TimingRecord findByType(String type);

}
