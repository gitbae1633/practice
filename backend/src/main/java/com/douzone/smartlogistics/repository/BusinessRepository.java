package com.douzone.smartlogistics.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.smartlogistics.vo.BusinessVo;

@Repository
public class BusinessRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<BusinessVo> findAll() {
		return sqlSession.selectList("business.findAll");
	}

	public List<BusinessVo> findAllByKeyword(BusinessVo vo) {
		return sqlSession.selectList("business.findAllByKeyword", vo);
	}

	public Boolean insert(BusinessVo vo) {
		return 1 == sqlSession.insert("business.insert", vo);
	}
	
	public BusinessVo findByCode(String businessCode) {
		return sqlSession.selectOne("business.findByCode",businessCode);
	}
	public int updateByCode(String businessCode, BusinessVo vo) {
		Map<String, Object> map = Map.of("bcode",businessCode,"vo",vo);
		return sqlSession.update("business.updateByCode",map);
	}

	public Boolean delete(List<String> deleteItem) {
		return 1 == sqlSession.delete("business.delete", deleteItem);
	}


}
