package com.douzone.smartlogistics.security;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import com.douzone.smartlogistics.service.UserService;
import com.douzone.smartlogistics.vo.UserVo;
import com.fasterxml.jackson.databind.ObjectMapper;


public class LoginInterceptor implements HandlerInterceptor {
	@Autowired
	private UserService userService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		Map<String, Object> inputMap = new ObjectMapper().readValue(request.getInputStream(), Map.class);
		
		UserVo vo = new UserVo();	
		vo.setId((String)inputMap.get("id"));
		vo.setPassword((String)inputMap.get("password"));
		System.out.println("loginInterceptor");
		
		UserVo authUser = userService.getUserLogin(vo);
		
		request.setAttribute("authUser", authUser);
		
		HttpSession session = request.getSession(true);
		session.setAttribute("authUser", authUser);
		System.out.println("AuthUSer : "+authUser);
		return true;
	}

	
}
