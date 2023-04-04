import React from "react";
import Cart from "../../components/Cart";
import Layout from "../../components/Layout";

const CartPage = () => {
  return (
    <Layout>
      <div className="h-screen pt-48 pb-24 bg-[#15202b]">
        <Cart />
      </div>
    </Layout>
  );
};

export default CartPage;
