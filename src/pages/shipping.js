import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";
import { CartContext } from "../../contexts/CartContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"; // Import react-hook-form

const ShippingAddressForm = () => {
  const { cart, shippingAddress, setShippingAddress } = useContext(CartContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm(); // Destructure the useForm hook and its methods

  // Update the form fields with the initial form data
  useEffect(() => {
    setValue("name", shippingAddress.name);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("state", shippingAddress.state);
    setValue("zip", shippingAddress.zip);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  // Watch for changes in the form fields and update the form data accordingly
  const formData = watch(); // Get the values of all form fields
  console.log(formData); // Use formData object to access form field values

  // Update the form data with the handleChange function
  function handleChange(event) {
    const { name, value } = event.target;
    setValue(name, value);
  }

  function onSubmit(data) {
    // Form data is valid, submit the form
    // ...
    console.log("form data is valid");

    setShippingAddress(data);
    Cookies.set("shippingAddress", JSON.stringify(data));
    router.push("/order");
  }

  useEffect(() => {
    // Load the cart from cookies when the component mounts
    const shippingAddress = Cookies.get("shippingAddress");
    if (shippingAddress) {
      setShippingAddress(JSON.parse(shippingAddress));
    }
    // console.log(shippingAddress);
  }, []);
  console.log(shippingAddress);
  console.log(formData);

  return (
    <Layout>
      <div className="bg-[#fafafa]">
        <div className="pt-48 py-36   ">
          <div className="mx-64">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
              <Breadcrumb.Item active>Shipping</Breadcrumb.Item>
              {/* <Breadcrumb.Item href="/payment">Payment</Breadcrumb.Item> */}
              <Breadcrumb.Item href="/order">Order</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <form
            className="flex flex-col mx-auto bg-[#22303C] w-1/2 rounded-lg shadow-md p-8 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-6 flex flex-col">
              <label className="text-black" htmlFor="country">
                Country
              </label>
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-black block text-gray-700 font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className={
                  errors.name
                    ? "w-full px-4 py-2 rounded-lg border-red-500 focus:outline-none focus:border-indigo-500"
                    : "w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                }
                // value={formData.name}
                onChange={(event) => handleChange(event, "name")}
                // onChange={handleChange}
                {...register("name", {
                  required: "Please enter full name",
                })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
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
                className={
                  errors.address
                    ? "w-full px-4 py-2 rounded-lg border-red-500 focus:outline-none focus:border-indigo-500"
                    : "w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                }
                // value={formData.address}
                // onChange={(event) => handleChange(event, formData.address)} // Update the onChange event handler
                onChange={handleChange}
                {...register("address", {
                  required: "Please enter address",
                })}
              />
              {errors.address && (
                <span className="text-red-500">{errors.address.message}</span>
              )}
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
                className={
                  errors.city
                    ? "w-full px-4 py-2 rounded-lg border-red-500 focus:outline-none focus:border-indigo-500"
                    : "w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                }
                // value={formData.city}
                onChange={handleChange}
                {...register("city", {
                  required: "Please enter city",
                })}
              />
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
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
                className={
                  errors.state
                    ? "w-full px-4 py-2 rounded-lg border-red-500 focus:outline-none focus:border-indigo-500"
                    : "w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                }
                // value={formData.state}
                onChange={handleChange}
                {...register("state", {
                  required: "Please enter state",
                })}
              />
              {errors.state && (
                <span className="text-red-500">{errors.state.message}</span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="zip"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                Zip
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="12345"
                className={
                  errors.zip
                    ? "w-full px-4 py-2 rounded-lg border-red-500 focus:outline-none focus:border-indigo-500"
                    : "w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                }
                // value={formData.zip}
                onChange={handleChange}
                {...register("zip", {
                  required: "Please enter zip code",
                })}
              />
              {errors.zip && (
                <span className="text-red-500">{errors.zip.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingAddressForm;
