import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { CartContext } from "../contexts/CartContext";
import ProductCard from "./ProductCard";
import { AuthContext } from "../contexts/AuthContext";

const HomePage = () => {
  const [productData, setProductData] = useState([]);
  const { cart, removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const storedData = localStorage.getItem("productData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProductData(parsedData);
    } else {
      async function fetchData() {
        const res = await fetch(`https://dummyjson.com/products`);
        const data = await res.json();
        setProductData(data);
        localStorage.setItem("productData", JSON.stringify(data)); // set data to localStorage
      }
      fetchData();
    }
  }, []);

  // console.log(productData.products);
  console.log(currentUser);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" px-24  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {productData.products?.map((product) => (
        <ProductCard product={product} key={product.id}></ProductCard>
      ))}
    </div>
  );
};

export default HomePage;
