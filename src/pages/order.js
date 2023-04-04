import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useRouter } from "next/router";

const OrderPage = () => {
  const router = useRouter();
  const handlePlaceOrder = () => {
    router.push("/orderDetails");
  };
  return (
    <Layout>
      <div className="pt-42 py-36 bg-[#15202B] min-h-screen">
        <div className="mx-24">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
            <Breadcrumb.Item href="/shipping">Shipping</Breadcrumb.Item>

            <Breadcrumb.Item href="/payment">Payment</Breadcrumb.Item>
            <Breadcrumb.Item active>Order</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-[#22303C] shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-4">
                <label
                  htmlFor="product"
                  className="block text-white text-3xl font-bold mb-2"
                >
                  Checkout
                </label>
                <div className="mb-4">
                  <label
                    htmlFor="shipping"
                    className="block text-white font-bold mb-2"
                  >
                    1 Shipping Address
                  </label>
                  <div className="mt-2">
                    <div className="text-red-300">
                      where you put the shipping address info
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="shipping"
                  className="block text-white font-bold mb-2"
                >
                  2 Payment method
                </label>
                <div className="mt-2">
                  <div className="text-red-300">where you put payment info</div>
                  <div></div>
                </div>
              </div>
              <div className="mb-4">
                <h1 className="block text-white font-bold mb-2">
                  4 Review items and shipping
                </h1>
                <label
                  htmlFor="items"
                  className="block text-white font-bold mb-2"
                >
                  Items Shipped from (Brand name)
                </label>
                <div
                  id="quantity"
                  name="quantity"
                  className=""
                  // className="w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                ></div>
              </div>

              <div className="flex items-center border border-zinc-200 rounded-lg p-3  mb-4">
                <div className="flex items-center ">
                  <button
                    onClick={handlePlaceOrder}
                    // href={"/order"}
                    type="submit"
                    className="mr-4 no-underline rounded px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-boldrounded"
                  >
                    Place your order
                  </button>
                  <div className="flex flex-col  ">
                    <label
                      htmlFor="total"
                      className="text-lg block text-white font-bold mb-2"
                    >
                      Order total: $0.00
                    </label>
                    <div className="text-[#8899A6]">
                      By placing your order, you agree to Viable's privacy
                      notice and conditions of use.
                    </div>
                  </div>
                </div>

                {/* <p className="text-gray-900 font-semibold">$0.00</p> */}
              </div>
              <div className="text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderPage;
