package com.m2mbob.jsperfs.vo;

import javax.ws.rs.BeanParam;

public class ModelParams<T> implements IModelParams<T> {

	@BeanParam
	protected T model;

	public ModelParams() {
		super();
	}

	public ModelParams(T model) {
		this.model = model;
	}

	public T getModel() {
		return model;
	}

}
