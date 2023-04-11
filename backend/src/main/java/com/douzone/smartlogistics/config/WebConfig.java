package com.douzone.smartlogistics.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.douzone.smartlogistics.security.AuthInterceptor;
import com.douzone.smartlogistics.security.AuthUserHandlerMethodArgumentResolver;
import com.douzone.smartlogistics.security.LoginInterceptor;
import com.douzone.smartlogistics.security.LogoutInterceptor;

@SpringBootConfiguration
public class WebConfig implements WebMvcConfigurer {

	// argument resolver
	@Bean
	public HandlerMethodArgumentResolver handlerMethodArgumentResolver() {
		return new AuthUserHandlerMethodArgumentResolver();
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(handlerMethodArgumentResolver());
	}
	
	@Bean
	public HandlerInterceptor loginInterceptor() {
		return new LoginInterceptor();
	}
	
	@Bean
	public HandlerInterceptor logoutInterceptor() {
		return new LogoutInterceptor();
	}
	
	@Bean
	public HandlerInterceptor authInterceptor() {
		return new AuthInterceptor();
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(loginInterceptor()).addPathPatterns("/api/user/login");
		registry.addInterceptor(logoutInterceptor()).addPathPatterns("api/user/logout");
		registry.addInterceptor(authInterceptor()).addPathPatterns("/**")
				.excludePathPatterns(Arrays.asList("/api/user/login", "api/user/logout", "/assets/**"));
	}
}
