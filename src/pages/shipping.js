import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";

const ShippingAddressForm = () => {
  return (
    <Layout>
      <div className="bg-[#15202B]">
        <div className="pt-48 py-36   ">
          <div className="mx-24">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
              <Breadcrumb.Item active>Shipping</Breadcrumb.Item>

              <Breadcrumb.Item href="/payment">Payment</Breadcrumb.Item>
              <Breadcrumb.Item href="/order">Order</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <form
            className="flex flex-col mx-auto bg-[#22303C] w-1/3 rounded-lg shadow-md p-8 "
            // className="bg-[#22303C] rounded-lg shadow-md p-8"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className=" w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="123 Main St."
                className="w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="city"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="New York"
                className="w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="state"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="NY"
                className="w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="zip"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="10001"
                className="w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="country"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="United States"
                className="w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <Link
              href={"/payment"}
              type="submit"
              className="bg-[#009BF9] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
              // className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Submit
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingAddressForm;
