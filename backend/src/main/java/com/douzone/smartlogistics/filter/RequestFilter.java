package com.douzone.smartlogistics.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import com.douzone.smartlogistics.wrapper.RequestServletWrapper;

@Component
public class RequestFilter implements Filter{
	@Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest wrappedRequest = new RequestServletWrapper((HttpServletRequest) request);
        chain.doFilter(wrappedRequest, response);
    }

}
