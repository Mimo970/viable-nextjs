import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { CartContext } from "../contexts/CartContext";
import ProductCard from "./ProductCard";
import { AuthContext } from "../contexts/AuthContext";
import ReactLoading from "react-loading";
import Loading from "./Loading";
import Toast from "react-bootstrap/Toast";
import { Button, ToastContainer } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState("top-end");
  const { cart, removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true); // Set data loaded to true

    let storedData = localStorage.getItem("productData"); // Declare storedData variable
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProductData(parsedData);
      setTimeout(() => {
        setLoading(false); // Set data loaded to false after 2 seconds
      }, 800); // Set data loaded to true
    } else {
      async function fetchData() {
        setLoading(true); // Set data loaded to true

        const res = await fetch(`https://dummyjson.com/products`);
        const data = await res.json();
        setProductData(data);
        localStorage.setItem("productData", JSON.stringify(data));
        setLoading(false); // Set data loaded to true
      }
      fetchData();
    }
  }, [currentUser]);

  console.log(productData.length);

  return (
    <div>
      {!loading ? (
        <div className=" px-24  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productData.products?.map((product) => (
            <ProductCard product={product} key={product.id}></ProductCard>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default HomePage;
