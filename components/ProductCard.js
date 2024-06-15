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

  const { cart, addToCart } = useContext(CartContext);

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

          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "green",
            },
          },
        }}
      />
      <div className=" max-w-xs rounded-lg  overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
        <div className=" overflow-hidden relative ">
          <Link
            href={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <img
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
        </div>
        <div className="px-4 py-2 bg-[#f5f5f5]">
          <Link
            href={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <h2 className="text-black font-bold text-xl mb-2">
              {product.title}
            </h2>
          </Link>

          <div className="flex items-center mb-4">
            <div className="text-lg text-zinc-600 font-bold mr-2">
              $ {product.price}
            </div>
            <div className="flex items-center text-yellow-500">
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.1}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
