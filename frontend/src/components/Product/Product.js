import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import ProductUpdate from "./ProductUpdate";
import { Box } from "@mui/material";

const Product = () => {
  // productlist
  const [products, setProducts] = useState([]);
  // productdetail
  const [Detail, setDetail] = useState([]);

  const [item, setItem] = useState({ code: "", name: "", size: "", unit: "" });

  useEffect(() => {
    productSearch(null);
  }, []);

  // product 검색
  const productSearch = async (searchKw) => {
    var url = `/api/product/list`;
    if (searchKw) {
      url = `/api/product/list?pk=${searchKw.pkeywd}&ps=${searchKw.psize}`;
    }
    try {
      const response = await fetch(url, {
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
      setProducts(json.data);
    } catch (err) {
      console.log(err);
    }
  };

  // product 추가
  const itemAddHandler = async (item) => {
    //console.log(item);
    if (item != null) {
      try {
        const response = await fetch("/api/product/data", {
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
        //db에 추가작업 끝남
        //console.log(item, "추가완료");
        setProducts([json.data, ...products]);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  //product 수정
  const itemUpdateHandler = async (item, target) => {
    console.log("update");
    try {
      const response = await fetch(`/api/product/update?pc=${target}`, {
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
      productSearch(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  // product 세부사항
  const productDetail = async (code) => {
    try {
      const response = await fetch(`/api/product/detail?pc=${code}`, {
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

  // product 삭제
  const deleteItemHandler = async (data) => {
    console.log(" ===== delete ===== ");
    console.log(data);
    try {
      const response = await fetch(`/api/product/delete`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      setProducts(
        products.filter((product) => json.data.indexOf(product.code) == -1)
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <SearchBar callback={productSearch} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <ProductList
          products={products}
          productDetail={productDetail}
          itemAddHandler={itemAddHandler}
          deleteItemHandler={deleteItemHandler}
          setItem={setItem}
        />
        <ProductUpdate
          productDetail={Detail}
          itemUpdateHandler={itemUpdateHandler}
          item={item}
          setItem={setItem}
        />
      </Box>
    </div>
  );
};

export default Product;
