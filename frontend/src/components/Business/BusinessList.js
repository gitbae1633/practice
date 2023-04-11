import React, { useRef, useState, useEffect } from 'react';
import BusinessItem from './BusinessItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField, Box, FormControl, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
    &&{
        top : 74.9px;
    };
  `;

/** 조건에 맞는 리스트 주르륵 출력 */
function List({
  businesses, 
  setBusinesses, 
  fetchBusinessList,
  businessDetail,
  setItem
 }) {

  // const [newDatas, setNewDats] = useState({code: '', name:'', phone:''});
  /** fetch, 즉 list를 출력하기 위한 state */
  const refForm = useRef(null);
  /** Delete를 위한 체크박스 State */
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  /**  submit하기위한 check여부 */
  const isCheck = useRef(true);

  /** form 데이터를 관리하기 위한 state */
  const [data, setData] = useState({});
  // =================================== DELETE =======================================
  /** delete 체크박스 Handler  */
  const changeHandler = (checked, code) => {
    console.log(`checked: ${checked}, code: ${code}`);
    if (checked) {
      setCheckedButtons([...checkedButtons, code]);
      console.log('체크 반영 완료');
      console.log(checkedButtons);
      console.log(checkedButtons.length);
    } else {
        // 클릭된 'code'랑 같으면 제거해서 새로운 배열을 만듬
        setCheckedButtons(checkedButtons.filter(el => el !== code));
        console.log('체크 해제 반영 완료');
    }
  };

  /** 모두 선택해주는 체크박스 */
  const allCheckBox = (e) => {
    if(!isChecked) { // e.currentTarget.checked
      setIsChecked(e.target.checked);
      // checkedButtons에 business의 모든 code 값 넣기
      const data = businesses.map(el => el.code);
      console.log(data);
      setCheckedButtons(data);
    } else {
      setIsChecked(e.target.checked);
      setCheckedButtons([]);
    }
  }

  /** 삭제 api */
  const deleteItemHandler = async (data) => {
    console.log(" ===== delete ===== ");
    console.log(data);
    try {
      const response = await fetch(`/api/business/delete`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      setIsChecked(false);  // allCheckBox 체크 해제
      setCheckedButtons([]);  // check된 행의 code를 담고 있던 state clear
      fetchBusinessList();  // 리스트 fetch
      setItem({ code: "", name: "", phone: "" }); // 업데이트 항목에 있는 item clear
      
    } catch (err) {
      console.log(err.message);
    }
  };
  // ================================================================================

  // 이건 왜 있는거지...?
  useEffect(()=>{
    fetchBusinessList();
  }, []);

  // =================================== ADD =======================================
  /** 데이터를 리스트에 추가하는 Handler */
  const addItemHandler = async function(data) {
    try {
      const response = await fetch('/api/business/add', {
          method: 'post',      // get방식
          headers: {
            'Content-Type': 'application/json',    
            'Accept': 'application/json'    // application/json방식으로 받을 수 있다
          },
          body: JSON.stringify(data)
      });
      if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if(json.result !== 'success') {
          throw new Error(`${json.result} ${json.message}`)
      }
      
      setBusinesses([...businesses, json.data]);
    } catch(err) {
        console.log(err.message);
    }
  }

  /** form 데이터 변환 */
  function handleSubmit(e) {
    e.preventDefault();

    const data = Array.from(refForm.current.elements, (input) => {
                  return {n: input.name, v: input.value};
                  })
                  .filter(({n}) => n !== '')
                  .reduce((res, {n, v}) => {
                      // console.log(`res: ${res}, n: ${n}, v: ${v}`);
                      if (v === "") {
                        if (isCheck.current) {
                          isCheck.current = false;
                          document.getElementById(n).focus();
                        }
                      }
                      res[n] = v;
                      return res;
                  }, {});

    setData(data);
    
    if (isCheck.current) {
      addItemHandler(data);
      refForm.current.reset();
    }
    isCheck.current = true;
  }

  /** 마지막행에서 Enter 누르면 */
  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSubmit(e);
    }
  }
  // ================================================================================

  return (
    <Box sx={{
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      position: 'relative'
    }}>
      <DeleteIcon sx={{
        position: 'relative',
        float: 'right',
        padding: '5px',
        marginRight: 3,
        marginTop: 2,
        cursor: 'pointer'
      }}
        onClick={() => 
          (checkedButtons.length === 0 ? console.log("비어있음") : deleteItemHandler(checkedButtons))
          }/>

      <FormControl 
        component='form' 
        onSubmit={handleSubmit}
        ref={refForm}>

        <TableContainer 
            component={Paper}
            sx={{
              width: 700,
              padding: 3,
              paddingTop: 0,
              boxShadow: 'none',
              height: 450
          }}>
          <Table stickyHeader>
            <TableHead sx={{
              backgroundColor: '#E8E6E6'
            }}>
              <TableRow sx={{
                fontWeight: 600
              }}>
                <TableCell sx={{width: '10%'}}>
                  <Checkbox 
                    onChange={(e)=> {
                      allCheckBox(e);
                    }}
                    checked={isChecked}
                  />
                </TableCell>
                <TableCell sx={{width: '10%'}}>순번</TableCell>
                <TableCell>거래처 아이디</TableCell>
                <TableCell>거래처명</TableCell>
                <TableCell>연락처</TableCell>
              </TableRow>

              <TableRow>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField 
                      id="code" 
                      name="code" 
                      type="text" 
                      variant="outlined" 
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.code === "" ? true : false}
                      ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField 
                      id="name" 
                      name="name" 
                      type="text" 
                      variant="outlined" 
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.code === "" ? true : false}
                      ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField 
                      id="phone" 
                      name="phone" 
                      type="text" 
                      variant="outlined" 
                      size="small" 
                      onKeyPress={handleKeyDown}
                      error={data && data.code === "" ? true : false}></TextField>
                  </TableStickyTypeCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                businesses.length > 0 ? (
                  businesses.map((item, index) => <BusinessItem key={`business_item_${item.code}`}
                                                                no={index}
                                                                code={item.code}
                                                                name={item.name}
                                                                phone={item.phone}
                                                                businessDetail={businessDetail}
                                                                checkedButtons={checkedButtons}
                                                                changeHandler={changeHandler}
                                                  />)
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={{textAlign: 'center'}}>등록된 거래처가 없습니다.</TableCell>
                  </TableRow>
                  
                )}
            </TableBody> 
          </Table>
        </TableContainer>
      </FormControl>
    </Box>
  )
}

export default List