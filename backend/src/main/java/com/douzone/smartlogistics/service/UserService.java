package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.smartlogistics.repository.UserRepository;
import com.douzone.smartlogistics.vo.UserVo;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	public List<UserVo> getUsers() {
		return userRepository.findAll();
	}
	public Boolean addUser(UserVo userVo) {
		return userRepository.addUser(userVo);
	}
	public Boolean getUser(UserVo userVo) {
		return userRepository.findUser(userVo);
	}
	public UserVo getUserLogin(UserVo vo) {
		return userRepository.getUserLogin(vo);
	}

}
