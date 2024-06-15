import { Rating } from "@mui/material";
import Link from "next/link";
import React from "react";

const ReviewItems = ({ product }) => {
  return (
    <div className="max-w-xs min-h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <div className=" relative overflow-hidden">
        <Link
          href={`/product/${product.id}`}
          style={{ textDecoration: "none" }}
        >
          <img
            className="w-full h-32 object-cover"
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
      <div className="px-2 py-1 bg-[#22303c]">
        <Link
          href={`/product/${product.id}`}
          style={{ textDecoration: "none" }}
        >
          <h2 className="text-white font-bold text-sm mb-1">{product.title}</h2>
        </Link>
        <div className="flex items-center mb-2">
          <div className="text-sm text-[#8899A6] font-bold mr-1">
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
  );
};

export default ReviewItems;
