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
  const paymentInformationCookie = Cookies.get("paymentInformation");
  const shippingAddressCookie = Cookies.get("shippingAddress");

  useEffect(() => {
    // Get the value of the shippingAddressCookie
    const shippingAddressCookie = Cookies.get("shippingAddress");
    const paymentInformationCookie = Cookies.get("paymentInformation");

    // Parse the JSON string to a JavaScript object
    const parsedShippingAddress = JSON.parse(shippingAddressCookie);
    const parsedPaymentInformation = JSON.parse(paymentInformationCookie);

    // Set the state with the shipping address object
    setAddressData(parsedShippingAddress);
    setPaymentData(parsedPaymentInformation);
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

  // const placeOrderHandler = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(`/api/orders`, {
  //       orderId: generateOrderId(),
  //       orderItems: cart,
  //       shippingInformation: addressData,
  //       paymentMethod: "stripe",
  //       itemsPrice: total,
  //       shippingPrice: 12.99,
  //       taxPrice: collectedTax,
  //       totalPrice: total + collectedTax + 12.99,
  //     });

  //     setLoading(false);
  //     // setCart([]);
  //     // Cookies.set(
  //     //   "cart",
  //     //   JSON.stringify({
  //     //     ...cart,
  //     //     cart: [],
  //     //   })
  //     // );
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //   }
  // };

  // const createCheckoutSession = async () => {
  //   axios
  //     .post("api/checkout_sessions", { cart })
  //     .then((res) => {
  //       console.log(res);
  //       window.location = res.data.sessionURL;
  //     })
  //     .catch((err) => console.log(err));

  //   placeOrderHandler();
  // };

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
      });

      setLoading(false);
      setCart([]);
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cart: [],
        })
      );
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const createCheckoutSession = async () => {
    try {
      setLoading(true);
      const orderId = generateOrderId(); // Generate the orderId
      const response = await axios.post("api/checkout_sessions", {
        orderId: orderId,
        cart: cart,
      });

      setLoading(false);
      console.log(response);
      window.location = response.data.sessionURL;

      placeOrderHandler(orderId); // Call placeOrderHandler at the end with orderId
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  console.log(addressData);

  return (
    <Layout>
      <div className="pt-42 py-36 bg-[#15202B] min-h-screen">
        <div className="mx-24">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
            <Breadcrumb.Item href="/shipping">Shipping</Breadcrumb.Item>

            {/* <Breadcrumb.Item href="/payment">Payment</Breadcrumb.Item> */}
            <Breadcrumb.Item active>Order</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-[#22303C] shadow-lg rounded-lg overflow-hidden ">
            <div className="px-4 py-5 sm:p-6 ">
              <div className="mb-4">
                <label
                  htmlFor="product"
                  className="block text-white text-3xl font-bold mb-2"
                >
                  Checkout
                </label>
                <div className="mb-4  border-t border-zinc-500">
                  <label
                    htmlFor="shipping"
                    className="block text-white font-bold mb-2"
                  >
                    1 Shipping Address
                  </label>
                  <div className="mt-2 text-white">
                    {userShipping.map((item) => {
                      return (
                        <div key={item.title}>
                          <div className="text-gray-400">{item}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mb-4 border-t border-zinc-500  ">
                <label
                  htmlFor="shipping"
                  className="block text-white font-bold mb-2"
                >
                  2 Payment method
                </label>
                <div className="text-[#8899A6]">Stripe</div>
                {/* <div className="mt-2">
                  <div className="flex text-gray-400">
                    <Image
                      src={"/debit.gif"}
                      width={36}
                      height={8}
                      alt="lolla"
                    ></Image>
                    &nbsp;<div>ending in {lastFour}</div>
                  </div>
                  <div className="flex text-gray-400">
                    <div className="text-blue-500">Billing address:</div>&nbsp;
                    Same as shipping address
                  </div>
                  <Link
                    href={"/payment"}
                    className="  no-underline text-blue-500"
                  >
                    Change
                  </Link>
                </div> */}
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
                  className="border rounded-lg p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
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
                    <h1 className="text-white">Order Summary</h1>
                    <div className="flex text-[#8899A6]">
                      <div>Items:</div>&nbsp; <div>${total}</div>
                    </div>
                    <div className="flex text-[#8899A6] border-b w-fit py-2">
                      <div>Total before tax:</div>&nbsp;
                      <div>${total}</div>
                    </div>
                    <div className="flex text-[#8899A6]  py-1">
                      <div>Shipping and handling:</div>&nbsp;
                      <div>$12.99</div>
                    </div>
                    <div className="flex text-[#8899A6]  py-1">
                      <div>Estimated tax to be colected:</div>&nbsp;
                      <div>${collectedTax}</div>
                    </div>
                    <label
                      htmlFor="total"
                      className="text-lg block text-blue-500 font-bold mb-2"
                    >
                      Order total: ${total + collectedTax + 12.99}
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
