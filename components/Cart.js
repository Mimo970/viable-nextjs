import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseAmount,
    decreaseAmount,
    handleAmountChange,
  } = useContext(CartContext);

  const [allCartItems, setAllCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
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
    const savedCart = Cookies.get("cart");
    if (savedCart) {
      setAllCartItems(JSON.parse(savedCart));
    }
  }, [cart]);

  const cartItems = allCartItems.map((item) => (
    <div
      className="bg-white flex items-center justify-between p-6 mb-4 shadow-sm rounded-lg"
      key={item.id}
    >
      <div className="flex items-center">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="ml-6">
          <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
          <p className="text-gray-600">{item.description}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-4 text-gray-500">Qty: </span>
        <select
          className="text-gray-700 bg-gray-100 border rounded-md p-1"
          value={item.quantity}
          onChange={(e) => handleAmountChange(e.target.value, item.id)}
        >
          {[...Array(item.stock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
        <span className="mx-6 text-gray-700">${item.price}</span>
        <button
          className="text-red-500 hover:text-red-700 focus:outline-none"
          onClick={() => handleRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  ));

  const total =
    cart.length > 0
      ? cart.reduce(
          (accumulator, currentItem) =>
            accumulator + currentItem.price * currentItem.amount,
          0
        )
      : 0;

  const proceedToShipping = () => {
    cart.length > 0 ? router.push("/shipping") : alert("Your cart is empty.");
  };

  return (
    <div className="bg-gray-50 py-8 container mx-auto rounded-lg">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Shopping Cart
          </h2>
          <span className="text-gray-600">
            {cart.reduce((total, item) => total + item.amount, 0)} items
          </span>
        </div>

        {cartItems.length > 0 ? (
          cartItems
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-500 mb-4">
              Your cart is empty.
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              className="bg-blue-500 text-decoration-none hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow"
              href="/"
              passHref
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="flex justify-end items-center mt-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm w-full md:w-1/3">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Subtotal (
                  {cart.reduce((total, item) => total + item.amount, 0)} items)
                </h3>
                <h3 className="text-lg font-semibold text-gray-800">
                  ${total.toFixed(2)}
                </h3>
              </div>
              <button
                onClick={proceedToShipping}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                Proceed to Shipping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
