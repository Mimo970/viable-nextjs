import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../../components/Layout";
import { CartContext } from "../../../contexts/CartContext";
// import Product from "../../models/Product";
// import db from "../../utils/db";
// import { CartContext } from "../../contexts/CartContext";
// import { ProductsContext } from "../../utils/ProductsContext";
const ProductPage = (props) => {
  const { product } = props;
  const { cart, addToCart } = useContext(CartContext);

  const router = useRouter();

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  return (
    <Layout title={product.title}>
      <div className=" py-60 flex justify-center bg-[#15202b]">
        <a href="/" className="text-gray-500 text-sm mb-4 inline-block">
          &lt; Back to products
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-center items-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-w-full rounded-md shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {product.title}
            </h1>
            <h2 className="text-lg font-medium text-zinc-300 mb-4">
              {product.category}
            </h2>
            <div className="text-md capitalize text-[#8899A6] mb-2">
              {product.rating.rate} stars, {product.rating.count} ratings
            </div>
            <p className="text-[#8899A6] text-lg mb-6">{product.description}</p>

            <div className="card py-6 px-8">
              <div className="mb-2 flex justify-between items-center">
                <div className="text-lg font-medium text-gray-900">Price</div>
                <div className="text-lg font-bold text-primary">
                  ${product.price}
                </div>
              </div>
              <div className="mb-2 flex justify-between items-center">
                <div className="text-lg font-medium text-gray-900">Status</div>
                <div className="text-lg font-medium text-green-500">
                  In Stock
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
        </div>
      </div>
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;

//   await db.connect();
//   const product = await Product.findOne({ id }).lean();
//   await db.disconnect();
//   return {
//     props: {
//       product: product ? db.convertDocToObj(product) : null,
//     },
//   };
// }

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

// export async function getStaticPaths() {
//   const allProducts = await fetch("https://fakestoreapi.com/products").then(
//     (r) => r.json()
//   );
//   console.log(allProducts);
//   return {
//     paths: allProducts.map((product) => {
//       return {
//         params: {
//           id: product.id.toString(),
//         },
//       };
//     }),
//     fallback: false,
//   };
// }

export default ProductPage;
