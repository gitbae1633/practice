package com.douzone.smartlogistics.security;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.core.MethodParameter;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.douzone.smartlogistics.vo.UserVo;

public class AuthUserHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

		if (!supportsParameter((parameter))) {
			return WebArgumentResolver.UNRESOLVED;
		}
		HttpServletRequest request = (HttpServletRequest)webRequest.getNativeRequest();
		HttpSession session = request.getSession();
		
		UserVo authUser = (UserVo)session.getAttribute("authUser");
		if(authUser!=null) {
			authUser.setId(authUser.getId());
			authUser.setInsert_ip(getClientIp(request));
			System.out.println(authUser);
		}
		return authUser;
	}

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		AuthUser authUser = parameter.getParameterAnnotation(AuthUser.class);
		// @AuthUser가 안붙어 있으면
		if(authUser == null) {
			return false;
		}
		
		// 파라미터 타입이 UserVo
		if(!parameter.getParameterType().equals(UserVo.class)) {
			return false;
		}
			return true;
	}
	
	public static String getClientIp(HttpServletRequest request) {
	    String clientIp = null;
	    boolean isIpInHeader = false;

	    List<String> headerList = new ArrayList<>();
	    headerList.add("X-Forwarded-For");
	    headerList.add("HTTP_CLIENT_IP");
	    headerList.add("HTTP_X_FORWARDED_FOR");
	    headerList.add("HTTP_X_FORWARDED");
	    headerList.add("HTTP_FORWARDED_FOR");
	    headerList.add("HTTP_FORWARDED");
	    headerList.add("Proxy-Client-IP");
	    headerList.add("WL-Proxy-Client-IP");
	    headerList.add("HTTP_VIA");    
	    headerList.add("IPV6_ADR");

	    for (String header : headerList) {
	        clientIp = request.getHeader(header);
	        if (StringUtils.hasText(clientIp) && !clientIp.equals("unknown")) {
	            isIpInHeader = true;
	            break;
	        }
	    }

	    if (!isIpInHeader) {
	        clientIp = request.getRemoteAddr();
	    }

	    return clientIp;
	}
}
