import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../../components/Layout";
import { CartContext } from "../../../contexts/CartContext";
import { Rating } from "@mui/material";

const ProductPage = (props) => {
  const { product } = props;
  const { cart, addToCart } = useContext(CartContext);

  const router = useRouter();

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  console.log(product);
  return (
    <Layout title={product.title}>
      <div
        className="p-10 flex justify-center 
      bg-[#fafafa]
       rounded-xl"
      >
        <div className="w-full max-w-4xl">
          <a href="/" className="text-gray-500 text-sm mb-4 inline-block">
            &lt; Back to products
          </a>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-w-full rounded-md shadow-md"
              />
            </div>
            <div>
              <h1
                className="text-3xl font-bold text-black
               mb-2"
              >
                {product.title}
              </h1>
              <h2 className="text-lg font-medium text-zinc-600 mb-4">
                {product.category}
              </h2>
              <div className="text-md capitalize text-zinc-500 mb-2 flex justify-">
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.1}
                  readOnly
                />
                {product.rating.count}
                <div>{product.reviews.length} reviews</div>
              </div>

              <p className="text-zinc-500 text-lg mb-6">
                {product.description}
              </p>

              <div className="card py-6 px-8 bg-white rounded-lg shadow-md">
                <div className="mb-2 flex justify-between items-center">
                  <div className="text-lg font-medium text-zinc-900">Price</div>
                  <div className="text-lg font-bold text-zinc-600">
                    ${product.price}
                  </div>
                </div>
                <div className="mb-2 flex justify-between items-center">
                  <div className="text-lg font-medium text-zinc-900">
                    Status
                  </div>
                  <div className="text-lg font-medium text-zinc-600">
                    In Stock
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const results = await fetch(
    // `https://fakestoreapi.com/products/${params.id}`
    `https://dummyjson.com/products/${params.id}`
  ).then((res) => res.json());

  return {
    props: {
      product: results,
    },
  };
}
export async function getStaticPaths() {
  const allProducts = await fetch("https://dummyjson.com/products").then((r) =>
    r.json()
  );
  // console.log(allProducts.products);
  let myProducts = allProducts.products;
  return {
    paths: myProducts.map((product) => {
      return {
        params: {
          id: product.id.toString(),
        },
      };
    }),
    fallback: false,
  };
}

export default ProductPage;
