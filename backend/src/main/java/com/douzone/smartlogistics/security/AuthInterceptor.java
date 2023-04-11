package com.douzone.smartlogistics.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.douzone.smartlogistics.vo.UserVo;

public class AuthInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// 1. handler 종류 확인
		if (!(handler instanceof HandlerMethod)) {
			// DefaulteServletHandler가 처리하는 경우 (정적자원, /assets/**)
			return true;
		}
		// 2. casting
		HandlerMethod handlerMethod = (HandlerMethod) handler;

		// 3. handler method의 @Auth 가져오기
		Auth auth = handlerMethod.getMethodAnnotation(Auth.class);

		// 4. Handler Method에 @Auth가 없으면 Type(Class)에 붙어있는지 확인한다.
		auth = (auth == null) ? handlerMethod.getBeanType().getAnnotation(Auth.class) : auth;

		// 5. Type이나 Method에 @Auth가 없는 경우
		if(auth == null) {
			return true;
		}
		
		// 6. @Auth가 붙어 있기 때문에 인증(Authenfication)여부 확인
		HttpSession session = request.getSession();
		UserVo authUser = (UserVo) session.getAttribute("authUser");

		if (authUser == null) {
			response.sendRedirect(request.getContextPath());
			return false;
		}
		// 7. 권한(Authorization) 체크를 위해 @Auth의 role가져오기를 해야 함("Admin아니면 User")
		String role = auth.role();
		String authUserRole = authUser.getRole();
		
		if(role.equals(authUserRole)) {
			return true;
		}
		
		if(!role.equals(authUserRole)) {
			response.sendRedirect(request.getContextPath());
			return false;
		}

		// 6. 인증 확인
		return true;
	}

}
