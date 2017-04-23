package com.m2mbob.jsperfs.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.m2mbob.jsperfs.model.BaseModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class PageImpl<T> extends org.springframework.data.domain.PageImpl<T> {

	@JsonIgnore
	private String template;

	private BaseModel model;

	/**
	 * @param content
	 * @param pageable
	 * @param total
	 */
	public PageImpl(List<T> content, Pageable pageable, long total) {
		super(content, pageable, total);
	}

	/**
	 * @param content
	 */
	public PageImpl(List<T> content) {
		super(content);
	}
	
	public PageImpl(List<T> content, BaseModel model) {
		super(content);
		this.model = model;
	}

	public PageImpl(Page<T> page, Pageable pageable, String template) {
		this(page.getContent(), pageable, page.getTotalElements());
		this.template = template;
	}

	public PageImpl(Page<T> page, Pageable pageable, BaseModel model) {
		this(page.getContent(), pageable, page.getTotalElements());
		this.model = model;
	}

	public PageImpl(Page<T> page, Pageable pageable) {
		this(page.getContent(), pageable, page.getTotalElements());
	}

	/**
	 * @return the model
	 */
	public BaseModel getModel() {
		return model;
	}

}
