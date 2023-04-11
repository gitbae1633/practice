package com.douzone.smartlogistics.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.service.BusinessService;
import com.douzone.smartlogistics.vo.BusinessVo;




@RestController
@RequestMapping("/api/business")
public class BusinessController {
	
	@Autowired
	private BusinessService businessService;
	
	@GetMapping("")
	public ResponseEntity<JsonResult> list() {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.getBusinessList()));
	}
	@PostMapping("/search")
	public ResponseEntity<JsonResult> searchBusinessList(@RequestBody BusinessVo businessVo) {
		
		System.out.println(businessVo);
		System.out.println(businessService.getBusinessListByKeyword(businessVo));
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult
				.success(businessService.getBusinessListByKeyword(businessVo)));
	}
	
	@PostMapping("/add")
	public ResponseEntity<JsonResult> add(@RequestBody BusinessVo businessVo) {
		System.out.println("22222=================================================\n");
		businessVo.setInsertId("han0");
		businessVo.setInsertIp("192.168.64.2");
		businessVo.setUpdateId("han0");
		businessVo.setUpdateIp("192.168.64.2");
		
		
		System.out.println("=================================================\n");
		System.out.println(businessVo);
		businessService.addBusinessItem(businessVo);
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessVo));
	}
	
	@GetMapping("/detail")
	public ResponseEntity<JsonResult> readBusiness(
			@RequestParam(value = "bc", required = true, defaultValue = "") String businessCode) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.findByCode(businessCode)));
	}

	@PostMapping("/update")
	public ResponseEntity<JsonResult> updateBusiness(
			@RequestParam(value = "bc", required = true, defaultValue = "") String businessCode,@RequestBody BusinessVo vo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.updateByCode(businessCode,vo)));
	}
	
	@PostMapping("/delete")
	public ResponseEntity<JsonResult> deleteBusiness(@RequestBody List<String> deleteItem) {
		
		for (String item : deleteItem) {
		  System.out.println(item);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.deleteItem(deleteItem)));
	}


}
