package com.m2mbob.jsperfs.service;

import org.springframework.transaction.annotation.Transactional;

public interface Initializer {
	
	@Transactional
	void init();
	
}
