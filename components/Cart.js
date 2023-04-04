import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import Link from "next/link";
const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseAmount,
    decreaseAmount,
    handleAmountChange,
  } = useContext(CartContext);

  const [allCartItems, setAllCartItems] = useState([]);

  useEffect(() => {
    // Save the cart to cookies whenever it changes
    Cookies.set("cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleIncrease = (id) => {
    increaseAmount(id);
  };

  const handleDecrease = (id) => {
    decreaseAmount(id);
  };

  useEffect(() => {
    // Load the cart from cookies when the component mounts
    const savedCart = Cookies.get("cart");
    if (savedCart) {
      setAllCartItems(JSON.parse(savedCart));
    }
  }, []);

  const cartItems = allCartItems.map((item) => (
    <div
      className="  flex items-center justify-between px-4 py-6"
      key={item.id}
    >
      <div className="flex items-center">
        <img
          src={item.images[0]}
          alt={item.title}
          className=" w-20 h-20 object-cover "
        />
        <div className="px-12">
          <h2 className="text-lg text-white font-medium">{item.title}</h2>
          <p className="text-gray-400">{item.description}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mx-4 text-gray-300">{item.amount}</span>
        <div className=" text-gray-300">Qty:&nbsp; </div>
        <select
          className="text-black bg-white"
          value={item.quantity}
          onChange={(e) => handleAmountChange(e.target.value, item.id)}
        >
          {[...Array(item.stock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
        <span className="mx-6 text-gray-300">${item.price}</span>
        <button
          className="text-red-500 focus:outline-none"
          onClick={() => handleRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  ));
  console.log(cart);

  const total =
    cart.length > 0
      ? cart.reduce((accumulator, currentItem) => {
          return accumulator + currentItem.price * currentItem.amount;
        }, 0)
      : 0;
  // console.log(total);
  //  mt-24 pt-24 pb-24
  return (
    <div className="bg-[#192734] pt-12 pb-12 container mx-auto rounded-lg">
      <div className="bg-[#22303C] shadow-lg rounded-lg">
        <div className="flex items-center justify-between   px-6 py-4">
          <h2 className="text-2xl text-white font-medium">Shopping Cart</h2>
          <span className="text-gray-400">
            {cart.reduce((total, item) => total + item.amount, 0)} items
          </span>
        </div>
        {cartItems}
        <div className=" p-4 flex justify-end items-center">
          <div className="flex flex-col  bg-gray-700 p-4 rounded-lg">
            <div className="flex">
              <h3 className="text-lg text-white font-medium">
                Subtotal:&nbsp;(
                {cart.reduce((total, item) => total + item.amount, 0)})
              </h3>
              <h3 className="text-lg text-white font-medium">&nbsp;${total}</h3>
            </div>

            <div className="text-white">
              <Link
                href={"/shipping"}
                className="no-underline bg-[#009BF9] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });

let e = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  images: [
    "https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg",
    "https://i.dummyjson.com/data/products/1/3.jpg",
    "https://i.dummyjson.com/data/products/1/4.jpg",
    "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  ],
};

{
  /* <button
          className="text-gray-400 focus:outline-none"
          onClick={() => handleDecrease(item.id)}
        >
          <i className="fa fa-minus-square fa-lg">-1</i>
        </button> */
}

{
  /* <button
          className="text-gray-400 focus:outline-none"
          onClick={() => handleIncrease(item.id)}
        >
          <i className="fa fa-plus-square fa-lg">+1</i>
        </button> */
}
