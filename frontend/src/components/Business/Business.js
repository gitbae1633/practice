import React, { useEffect, useState } from 'react'
import Search from './Search';
import BusinessList from './BusinessList';
import AddItem from './AddItem';
import { Box } from '@mui/material';


const Business = () => {
  /** fetch, 즉 list를 출력하기 위한 state */
  const [businesses, setBusinesses] = useState([{}]);  
  /** 검색을 위한 state */
  const [datas, setDatas] = useState({code: "", name: "", phone: "", insertDate: "", userId: ""});
  const [Detail, setDetail] = useState([]);
  const [item, setItem] = useState({ code: "", name: "", phone: "" });    // 수정된 행의 전체 값
  
  // const fileInputRef = useRef(null);
  
  /** 처음 실행될 때 Business List를 불러오기 위한 fetch 함수 */
  const fetchBusinessList = async () => {
    console.log("===== fetch =====");
    try {
      const response = await fetch('/api/business', {
          method: 'get',      // get방식
          headers: {
              'Accept': 'application/json'    // application/json방식으로 받을 수 있다
          }
      });
      if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if(json.result !== 'success') {
          throw new Error(`${json.result} ${json.message}`)
      }
      setBusinesses(json.data);
    } catch(err) {
        console.log(err.message);
    }
  }
  // useEffect(()=>{
  //   fetchBusinessList();
  // }, []);

  /** 들어오는 값이 빈 값이면 모든 리스트 출력 / 아니면 검색어에 대한 결과값 출력 */
  const textHandleChanges = (e) => {
    // console.log(e.target.elements[0].name);
    const _target = e.target.elements;
    console.log(_target[2].value);
    (_target[0].value === '' && _target[1].value === '') ? fetchBusinessList() : search(e.target)
    
  }
  const search = (_target) => {
    const datas = Array.from(_target, (input) => {
      return {n: input.name, v: input.value};
    })
    .filter(({n}) => n !== '')
    .reduce((res, {n, v}) => {
        console.log(`res: ${res}, name: ${n}, value: ${v}`);
        res[n] = v;
        return res;
    }, {});
    console.log(datas);
    searchFormHandler(datas);
  }

  /** 검색, 조회하는 Handler */
  const searchFormHandler = async function(datas) {
    // console.log(datas);
    try {
      const response = await fetch('/api/business/search', {
          method: 'post',      // get방식
          headers: {
            'Content-Type': 'application/json',    
            'Accept': 'application/json'    // application/json방식으로 받을 수 있다
          },
          body: JSON.stringify(datas)
      });
      if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if(json.result !== 'success') {
          throw new Error(`${json.result} ${json.message}`)
      }
      
      setBusinesses(json.data);
    } catch(err) {
        console.log(err.message);
    }
  }
  useEffect(() => {
    searchFormHandler(datas);
    console.log(datas);
    return () => {};
  }, [datas]);

  
  /** Update Handler */
  const itemUpdateHandler = async (item, target) => {
    console.log("===== update =====");
    try {
      const response = await fetch(`/api/business/update?bc=${target}`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      fetchBusinessList();
    } catch (err) {
      console.log(err.message);
    }
  };

  
  const businessDetail = async (code) => {
    try {
      const response = await fetch(`/api/business/detail?bc=${code}`, {
        method: "get",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      //console.log(json.data);
      setDetail(json.data);
    } catch (err) {
      console.log(err);
    }
  };


  


  return (
    <div>
        <Search textHandleChanges={textHandleChanges} />
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5
        }}>
          <BusinessList 
            businesses={businesses} 
            setBusinesses={setBusinesses} 
            fetchBusinessList={fetchBusinessList}
            businessDetail={businessDetail}
            setItem={setItem}
          />
          <AddItem 
            businessDetail={Detail}
            itemUpdateHandler={itemUpdateHandler}
            item={item}
            setItem={setItem}
          />  {/*addList={addList} */}
        </Box>
    </div>
  )
}

export default Business