import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

// const productData = [
//   {
//     id: 1,
//     title: "iPhone 9",
//     description: "An apple mobile which is nothing like apple",
//     price: 549,
//     discountPercentage: 12.96,
//     rating: 4.69,
//     stock: 94,
//     brand: "Apple",
//     category: "smartphones",
//     thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/1/1.jpg",
//       "https://i.dummyjson.com/data/products/1/2.jpg",
//       "https://i.dummyjson.com/data/products/1/3.jpg",
//       "https://i.dummyjson.com/data/products/1/4.jpg",
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 2,
//     title: "iPhone X",
//     description:
//       "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
//     price: 899,
//     discountPercentage: 17.94,
//     rating: 4.44,
//     stock: 34,
//     brand: "Apple",
//     category: "smartphones",
//     thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/2/1.jpg",
//       "https://i.dummyjson.com/data/products/2/2.jpg",
//       "https://i.dummyjson.com/data/products/2/3.jpg",
//       "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
//     ],
//   },
// ];

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : []
  );

  const [shippingAddress, setShippingAddress] = useState(
    Cookies.get("shippingAdrress")
      ? JSON.parse(Cookies.get("shippingAddress"))
      : {}
  );

  const [paymentInformation, setPaymentInformation] = useState(
    Cookies.get("paymentInformation")
      ? JSON.parse(Cookies.get("paymentInformation"))
      : {}
  );
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    const amount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount;
    }, 0);
    setItemAmount(amount);
  }, [cart]);

  // const addToCart = (addedProduct) => {
  //   const existingItemIndex = cart.findIndex(
  //     (item) => item.id === addedProduct.id
  //   );

  //   if (existingItemIndex >= 0) {
  //     // If the item already exists in the cart, increment the amount by 1
  //     const updatedCart = [...cart];
  //     updatedCart[existingItemIndex].amount += 1;
  //     setCart(updatedCart);
  //   } else {
  //     // If the item doesn't exist in the cart, add it with amount 1
  //     const product = { ...addedProduct, amount: 1 };
  //     setCart([...cart, product]);
  //   }
  // };

  // const addToCart = (addedProduct) => {
  //   const existingItemIndex = cart.findIndex(
  //     (item) => item.id === addedProduct.id
  //   );

  //   if (existingItemIndex >= 0) {
  //     // If the item already exists in the cart, increment the amount by 1
  //     const updatedCart = [...cart];
  //     updatedCart[existingItemIndex].amount += 1;
  //     setCart(updatedCart);
  //   } else {
  //     // If the item doesn't exist in the cart, add it with amount 1
  //     const product = { ...addedProduct, amount: 1 };
  //     setCart([...cart, product]);
  //   }

  //   // Save the updated cart in cookies
  //   Cookies.set("cart", JSON.stringify(cart));
  //   // Cookies.set("cart", JSON.stringify([...cart, product]));
  // };

  const notify = () =>
    toast.success("item added to cart", {
      duration: 4000,
      position: "bottom-center",

      // Styling
      style: {},
      className: "",

      // Custom Icon

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });

  const addToCart = (addedProduct) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.id === addedProduct.id
    );

    if (existingItemIndex >= 0) {
      // If the item already exists in the cart, increment the amount by 1
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].amount += 1;
      setCart(updatedCart);
      Cookies.set("cart", JSON.stringify(updatedCart)); // pass updatedCart to Cookies.set()
    } else {
      // If the item doesn't exist in the cart, add it with amount 1
      const product = { ...addedProduct, amount: 1 };
      setCart([...cart, product]);
      Cookies.set("cart", JSON.stringify([...cart, product])); // pass [...cart, product] to Cookies.set()
    }
    notify();
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem.amount < 2) {
      removeFromCart(id);
    } else {
      const newCart = cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      );
      setCart(newCart);
    }
  };

  const handleAmountChange = (amount, id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, amount: parseInt(amount) } : item
    );
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        handleAmountChange,
        itemAmount,
        total,
        shippingAddress,
        setShippingAddress,
        paymentInformation,
        setPaymentInformation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
