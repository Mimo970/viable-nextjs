import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useRouter } from "next/router";
import { CartContext } from "../../contexts/CartContext";
import Cookies from "js-cookie";
import Image from "next/image";
import axios from "axios";
import dynamic from "next/dynamic";
import OrderedItems from "../../components/orderedItems";
import { AuthContext } from "../../contexts/AuthContext";
const OrderPage = () => {
  const router = useRouter();

  const {
    shippingAddress,
    setShippingAddress,
    paymentInformation,
    setPaymentInformation,
    setCart,
    cart,
    total,
  } = useContext(CartContext);

  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handlePlaceOrder = () => {
    router.push("/orderDetails");
  };

  useEffect(() => {
    // Get the value of the shippingAddressCookie
    const shippingAddressCookie = Cookies.get("shippingAddress");
    const paymentInformationCookie = Cookies.get("paymentInformation");

    // Check if the cookies are not undefined
    if (shippingAddressCookie) {
      try {
        const parsedShippingAddress = JSON.parse(shippingAddressCookie);
        setAddressData(parsedShippingAddress);
      } catch (error) {
        console.error("Error parsing shipping address cookie:", error);
      }
    }

    if (paymentInformationCookie) {
      try {
        const parsedPaymentInformation = JSON.parse(paymentInformationCookie);
        setPaymentData(parsedPaymentInformation);
      } catch (error) {
        console.error("Error parsing payment information cookie:", error);
      }
    }
  }, []);

  let userShipping = Object.values(addressData);
  let userPayment = Object.values(paymentData);

  let lastFour = userPayment[0]?.slice(-4);

  const generateOrderId = () => {
    // Generate a unique order ID using a combination of a timestamp and a random string
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2);
    return `${timestamp}-${randomString}`;
  };

  let collectedTax = total * (0.0825).toFixed(2);

  const placeOrderHandler = async (orderId) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/orders`, {
        orderId: orderId,
        orderItems: cart,
        shippingInformation: addressData,
        paymentMethod: "stripe",
        itemsPrice: total,
        shippingPrice: 12.99,
        taxPrice: collectedTax,
        totalPrice: total + collectedTax + 12.99,
        userID: currentUser.uid,
      });

      setLoading(false);
      // setCart([]);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const createCheckoutSession = async () => {
    try {
      setLoading(true);
      const orderId = generateOrderId(); // Generate the orderId

      const response = await axios.post("/api/checkout_sessions", {
        orderId: orderId,
        cart: cart,
      });

      setLoading(false);
      console.log(response);
      window.location = response.data.sessionURL;

      placeOrderHandler(orderId);
      Cookies.set("cart", JSON.stringify([])); // Call placeOrderHandler at the end with orderId
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  console.log(addressData);

  let orderTotal = total + collectedTax + 12.99;
  let priceOfOrderTotal = orderTotal.toFixed(2);

  return (
    <Layout>
      <div className="pt-42 py-36 bg-[#fafafa] min-h-screen">
        <div className="mx-48">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
            <Breadcrumb.Item href="/shipping">Shipping</Breadcrumb.Item>

            <Breadcrumb.Item active>Order</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-[#fafafa] shadow-lg rounded-lg overflow-hidden ">
            <div className="px-4 py-5 sm:p-6 ">
              <div className="mb-4">
                <label
                  htmlFor="product"
                  className="block text-black text-3xl font-bold mb-2"
                >
                  Checkout
                </label>
                <div className="mb-4  border-t border-zinc-500">
                  <label
                    htmlFor="shipping"
                    className="block text-black font-bold mb-2"
                  >
                    1 Shipping Address
                  </label>
                  <div className="mt-2 text-zinc-500">
                    {userShipping.map((item) => {
                      return (
                        <div key={item.title}>
                          <div key={item.title} className="text-zinc-500">
                            {item}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mb-4 border-t border-zinc-500  ">
                <label
                  htmlFor="shipping"
                  className="block text-zinc-800 font-bold mb-2"
                >
                  2 Payment method
                </label>
                <div className="text-zinc-500">Stripe</div>
              </div>
              <div className="mb-4 border-t border-zinc-500">
                <h1 className="block text-white font-bold mb-2">
                  ({cart.reduce((total, item) => total + item.amount, 0)})
                  Review items and shipping
                </h1>
                <label
                  htmlFor="items"
                  className="block text-white font-bold mb-2"
                >
                  Items Shipped from Viable
                </label>
                <div
                  id="quantity"
                  name="quantity"
                  className=" rounded-lg  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {cart.map((item) => (
                    <OrderedItems key={item.id} product={item}>
                      {item?.title}
                    </OrderedItems>
                  ))}
                </div>
              </div>

              <div className="flex items-center border border-zinc-200 rounded-lg p-3  mb-4">
                <div className="flex flex-col items-start  ">
                  <button
                    onClick={createCheckoutSession}
                    // onClick={handlePlaceOrder}
                    type="submit"
                    className="my-2 mr-4 no-underline rounded px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-boldrounded"
                  >
                    Place your order
                  </button>
                  <div className="text-[#8899A6] border-b w-full py-2">
                    By placing your order, you agree to Viable's privacy notice
                    and conditions of use.
                  </div>
                  <div className="flex flex-col  ">
                    <h1 className="text-black">Order Summary</h1>
                    <div className="flex text-[#8899A6]">
                      <div>Items:</div>&nbsp; <div>${total.toFixed(2)}</div>
                    </div>
                    <div className="flex text-[#8899A6] border-b w-fit py-2">
                      <div>Total before tax:</div>&nbsp;
                      <div>${total.toFixed(2)}</div>
                    </div>
                    <div className="flex text-[#8899A6]  py-1">
                      <div>Shipping and handling:</div>&nbsp;
                      <div>$12.99</div>
                    </div>
                    <div className="flex text-[#8899A6]  py-1">
                      <div>Estimated tax to be colected:</div>&nbsp;
                      <div>${collectedTax.toFixed(2)}</div>
                    </div>
                    <label
                      htmlFor="total"
                      className="text-lg block text-blue-500 font-bold mb-2"
                    >
                      Order total: ${priceOfOrderTotal}
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// export default OrderPage;
export default dynamic(() => Promise.resolve(OrderPage), { ssr: false });
