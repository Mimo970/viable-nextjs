import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { CartContext } from "../../../contexts/CartContext";
import ReviewItems from "../../../components/ReviewItems";
import dynamic from "next/dynamic";
import OrderedItems from "../../../components/orderedItems";

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

  const {
    shippingAddress,
    setShippingAddress,
    paymentInformation,
    setPaymentInformation,
    setCart,
    cart,
    total,
  } = useContext(CartContext);

  const [orderDetails, setOrderDetails] = useState({});
  const [queryId, setQueryId] = useState(id);
  const [addressData, setAddressData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  // const getOrderDetails = async (id) => {
  //   const docRef = doc(db, "orders", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     setOrderDetails(docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };

  const getOrderDetails = async (orderId) => {
    try {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setOrderDetails(docSnap.data());
        setAddressData(docSnap.data().shippingInformation);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting order details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      setQueryId(id);
      getOrderDetails(id);
    }
  }, [id]);

  let userShipping = null;
  if (orderDetails && addressData) {
    userShipping = Object.values(addressData);
  }
  // userShipping = Object.values(addressData);

  // console.log(userShippingInfo);
  let collectedTax = total * (0.0825).toFixed(2);

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  console.log(orderDetails, toTimestamp(orderDetails));

  // let orderTotal = orderDetails.total + collectedTax + 12.99;
  // let priceOfOrderTotal = orderTotal.toFixed(2);

  function formatToTwoDecimalPlaces(num) {
    return parseFloat(num.toFixed(2));
  }

  // let collectedTax = formatToTwoDecimalPlaces(total * 0.0825);

  let orderTotal = total + collectedTax + 12.99;
  let priceOfOrderTotal = formatToTwoDecimalPlaces(orderTotal);

  console.log(addressData);

  return (
    <Layout>
      <div className="pt-42 py-36 bg-[#fafafa] min-h-screen">
        <div className="mx-24">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
            <Breadcrumb.Item href="/shipping">Shipping</Breadcrumb.Item>

            <Breadcrumb.Item href="/payment">Payment</Breadcrumb.Item>
            <Breadcrumb.Item href="/order">Order</Breadcrumb.Item>
            <Breadcrumb.Item active>Order Details</Breadcrumb.Item>
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
                  <div className="mt-2 text-black">
                    {userShipping.map((item) => {
                      console.log(item);
                      return (
                        <div key={item.title}>
                          <div className="text-zinc-500">{item}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mb-4 border-t border-zinc-500  ">
                <label
                  htmlFor="shipping"
                  className="block text-black font-bold mb-2"
                >
                  2 Payment method
                </label>
                <div className="text-zinc-500">Stripe</div>
              </div>
              <div className="mb-4 border-t border-zinc-500">
                <h1 className="block text-black font-bold mb-2">
                  ({cart?.reduce((total, item) => total + item.amount, 0)})
                  Order Placed:
                </h1>
                <label
                  htmlFor="items"
                  className="block text-black font-bold mb-2"
                >
                  Items Shipped from Viable
                </label>
                <div
                  id="quantity"
                  name="quantity"
                  className="border rounded-lg p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {orderDetails.orderItems?.map((item) => (
                    <OrderedItems
                      product={item}
                      className="text-red-400"
                      key={item.id}
                    >
                      {item?.title}
                    </OrderedItems>
                  ))}
                </div>
              </div>

              <div className="flex items-center border border-zinc-200 rounded-lg p-3  mb-4">
                <div className="flex flex-col items-start  ">
                  {/* <button
                    // onClick={createCheckoutSession}
                    // onClick={handlePlaceOrder}
                    type="submit"
                    className="my-2 mr-4 no-underline rounded px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-boldrounded"
                  >
                    Place your order
                  </button> */}
                  {/* <div className="text-[#8899A6] border-b w-full py-2">
                    By placing your order, you agree to Viable's privacy notice
                    and conditions of use.
                  </div> */}
                  <div className="flex flex-col  ">
                    <h1 className="text-black">Order Summary</h1>
                    <div className="flex text-zinc-700">
                      <div>Items:</div>&nbsp;{" "}
                      <div>${orderDetails.itemsPrice}</div>
                    </div>
                    <div className="flex text-zinc-700 border-b w-fit py-2">
                      <div>Total before tax:</div>&nbsp;
                      <div>${orderDetails.itemsPrice + 12.99}</div>
                    </div>
                    <div className="flex text-zinc-700  py-1">
                      <div>Shipping and handling:</div>&nbsp;
                      <div>$12.99</div>
                    </div>
                    <div className="flex text-zinc-700  py-1">
                      <div>Estimated tax to be colected:</div>&nbsp;
                      <div>${orderDetails.taxPrice}</div>
                    </div>
                    <label
                      htmlFor="total"
                      className="text-lg block text-blue-500 font-bold mb-2"
                    >
                      Order total: $
                      {/* {formatToTwoDecimalPlaces(orderDetails.totalPrice)} */}
                      {orderDetails.totalPrice}
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

// export default OrderDetails;
export default dynamic(() => Promise.resolve(OrderDetails), { ssr: false });
