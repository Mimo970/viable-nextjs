import React from "react";
import Cart from "../../components/Cart";
import Layout from "../../components/Layout";

const CartPage = () => {
  return (
    <Layout>
      <div className="min-h-full pt-48 pb-80 bg-[#fafafa]">
        <Cart />
      </div>
    </Layout>
  );
};

export default CartPage;
