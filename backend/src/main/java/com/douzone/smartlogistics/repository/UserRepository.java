package com.douzone.smartlogistics.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.smartlogistics.vo.UserVo;

@Repository
public class UserRepository {
	@Autowired
	private SqlSession sqlSession;

	public List<UserVo> findAll() {
		return sqlSession.selectList("user.findAll");
	}

	public Boolean addUser(UserVo userVo) {
		return 1==sqlSession.insert("user.insert",userVo);
	}

	public Boolean findUser(UserVo userVo) {
		return sqlSession.selectOne("user.findUser",userVo)!=null?true:false;
	}

	public UserVo getUserLogin(UserVo vo) {
		return sqlSession.selectOne("user.getuserlogin",vo);
	}
}