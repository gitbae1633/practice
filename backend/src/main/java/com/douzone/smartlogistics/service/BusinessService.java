package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.smartlogistics.repository.BusinessRepository;
import com.douzone.smartlogistics.vo.BusinessVo;

@Service
public class BusinessService {

	@Autowired
	private BusinessRepository businessRepository;
	
	public List<BusinessVo> getBusinessList() {
		return businessRepository.findAll();
	}
	
	public List<BusinessVo> getBusinessListByKeyword(BusinessVo vo) {
		return businessRepository.findAllByKeyword(vo);
	}

	public boolean addBusinessItem(BusinessVo vo) {
		return businessRepository.insert(vo);
		
	}
	
	public BusinessVo findByCode(String businessCode) {
		return businessRepository.findByCode(businessCode);
	}

	public int updateByCode(String businessCode, BusinessVo vo) {
		return  businessRepository.updateByCode(businessCode,vo);
	}

	public boolean deleteItem(List<String> deleteItem) {
		
		return businessRepository.delete(deleteItem);
	}

}
