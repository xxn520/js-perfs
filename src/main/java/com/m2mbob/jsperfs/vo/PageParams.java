package com.m2mbob.jsperfs.vo;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.QueryParam;

public class PageParams extends PageRequest {

	public PageParams(int page, int size, Direction direction, String... properties) {
		super(page, size, direction, properties);
	}

	public PageParams(int page, int size, Sort sort) {
		super(page, size, sort);
	}

	public PageParams(@QueryParam("page") int page, @QueryParam("page-size") @DefaultValue("10") int size) {
        super(page, size, Direction.DESC, "id");
	}

}
