import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";

const Payment = () => {
  return (
    <Layout>
      <div className="bg-[#15202B] pt-48 py-36 ">
        <div className="mx-24">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
            <Breadcrumb.Item href="/shipping">Shipping</Breadcrumb.Item>

            <Breadcrumb.Item active>Payment</Breadcrumb.Item>
            <Breadcrumb.Item href="/order">Order</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* <div className="py-12 w-full max-w-md mx-auto"> */}
          <form className="bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-white text-lg font-bold mb-6">
              Payment Method
            </h2>
            <div className="mb-6">
              <label
                htmlFor="cardNumber"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="**** **** **** ****"
                className="text-[#8899A6] w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="expirationDate"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                Expiration Date
              </label>
              {/* <div className="flex">
                <select
                  id="exp-date"
                  name="exp-date"
                  className="w-1/6 px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                >
                  <option value="" disabled selected>
                    01
                  </option>
                  <option value="01/24">01/24</option>
                  <option value="02/24">02/24</option>
                  <option value="03/24">03/24</option>
                  <option value="04/24">04/24</option>
                  <option value="05/24">05/24</option>
                  <option value="06/24">06/24</option>
                  <option value="07/24">07/24</option>
                  <option value="08/24">08/24</option>
                  <option value="09/24">09/24</option>
                  <option value="10/24">10/24</option>
                  <option value="11/24">11/24</option>
                  <option value="12/24">12/24</option>
                </select>
                <select
                  id="exp-date"
                  name="exp-date"
                  className="w-1/5 px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-gray-500"
                >
                  <option className=" " value="" disabled selected>
                    2023
                  </option>
                  <option value="01 ">01</option>
                  <option value="02 ">02</option>
                  <option value="03 ">03</option>
                  <option value="04 ">04</option>
                  <option value="05 ">05</option>
                  <option value="06 ">06</option>
                  <option value="07 ">07</option>
                  <option value="08 ">08</option>
                  <option value="09 ">09</option>
                  <option value="10 ">10</option>
                  <option value="11 ">11</option>
                  <option value="12 ">12</option>
                </select>
              </div> */}
              <div className="flex">
                <select
                  id="exp-date"
                  name="exp-date"
                  className="text-[#8899A6] w-1/6 px-2 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500 mr-2"
                  defaultValue="01"
                >
                  <option value="01" selected>
                    01
                  </option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <select
                  id="exp-year"
                  name="exp-year"
                  className="w-1/5 text-[#8899A6] px-2 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-gray-500"
                  defaultValue="2023"
                >
                  <option value="2023" selected>
                    2023
                  </option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="cvv"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                className="text-[#8899A6] w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-600"
              />
            </div>
            <Link
              href={"/order"}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Pay Now
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
