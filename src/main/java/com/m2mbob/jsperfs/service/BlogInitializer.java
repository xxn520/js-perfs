package com.m2mbob.jsperfs.service;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;


@Service
public abstract class BlogInitializer extends AbstractService implements Initializer {


	@Override
	@PostConstruct
	public void init() {
		doInit();
	}

	protected abstract void doInit();

}
