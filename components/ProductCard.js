import React, { useContext } from "react";
import Link from "next/link";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
// import { ProductsContext } from "../utils/ProductsContext";
// import { CartContext } from "../contexts/CartContext";
import Image from "next/image";
import { Rating } from "@mui/material";
import { CartContext } from "../contexts/CartContext";
import { Toaster } from "react-hot-toast";

const ProductCard = ({ product, addToCartHandler }) => {
  const addToFavorites = (e) => {};
  // const { state, dispatch } = useContext(ProductsContext);
  // const { addToCart } = useContext(CartContext);

  // const addToCartHandler = (product) => {
  //   const existItem = state.cart.cartItems.find((x) => x.id === product.id);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;

  //   if (product.rating.count < quantity) {
  //     alert("Sorry. Product is out of stock");
  //     return;
  //   }

  //   dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
  // };
  const { cart, addToCart } = useContext(CartContext);
  // console.log(cart);

  return (
    <>
      <Toaster
        // position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            // background: "#657786",
            // color: "#1DA1F2",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "green",
            },
          },
        }}
      />
      {/* <div className="max-w-xs rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"> */}
      <div className="max-w-xs rounded-lg  overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
        <div className=" overflow-hidden relative ">
          <Link
            href={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <img
              // className="max-h-[240px]"
              className="w-full  h-48 object-cover"
              src={product.thumbnail}
              alt={product.title}
            />
          </Link>

          <div className="absolute top-2 left-2">
            <span className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-full text-xs uppercase">
              {product.category}
            </span>
          </div>
          {/* <div class="absolute top-2 right-2">
            <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold p-1 rounded-full">
               
              <AiOutlineHeart color="pink" />
            </button>
          </div> */}
        </div>
        <div className="px-4 py-2 bg-[#22303c]">
          <Link
            href={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <h2 className="text-white font-bold text-xl mb-2">
              {product.title}
            </h2>
          </Link>

          <div className="flex items-center mb-4">
            <div className="text-lg text-[#8899A6] font-bold mr-2">
              $ {product.price}
            </div>
            <div className="flex items-center text-yellow-500">
              {/* <span class="text-sm ml-1">{product.rating} of 5.0</span> */}
              {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.1}
                readOnly
              />
            </div>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="bg-[#009BF9] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
