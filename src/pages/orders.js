import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button, Card } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import Cookies from "js-cookie";

const Orders = () => {
  const orderData = [
    {
      id: 12345,

      date: "March 1, 2023",
      totalCost: 85.99,
      items: [
        {
          id: 1,
          image: "https://i.dummyjson.com/data/products/1/1.jpg",
          name: "Blue T-Shirt",
          price: 24.99,
          quantity: 2,
        },
        {
          id: 2,
          image: "https://i.dummyjson.com/data/products/2/1.jpg",
          name: "Black Jeans",
          price: 35.99,
          quantity: 1,
        },
        {
          id: 3,
          image: "https://i.dummyjson.com/data/products/3/1.jpg",
          name: "Red Sneakers",
          price: 25.01,
          quantity: 1,
        },
      ],
      paymentMethod: "Visa ending in 1234",
      shippingAddress: "123 Main St, Anytown USA 12345",
      deliveryDate: "March 10, 2023",
      shippingStatus: "Out for Delivery",
      returnInfo: null,
    },
    {
      id: 12346,

      date: "February 15, 2023",
      totalCost: 49.98,
      items: [
        {
          id: 4,
          image: "https://i.dummyjson.com/data/products/9/1.jpg",
          name: "Pink Scarf",
          price: 19.99,
          quantity: 2,
        },
      ],
      paymentMethod: "Mastercard ending in 5678",
      shippingAddress: "456 Elm St, Anytown USA 12345",
      deliveryDate: "February 23, 2023",
      shippingStatus: "Delivered",
      returnInfo: "Item returned on March 1, 2023",
    },
  ];

  const { currentUser } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const getOrderHistory = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().orders);
      setOrders(docSnap.data().orders);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    const address = Cookies.get("shippingAddress");
    if (address) {
      setShippingAddress(JSON.parse(address));
    }
  }, []);

  useEffect(() => {
    if (currentUser?.uid) {
      // Add a conditional check for currentUser to avoid undefined error
      getOrderHistory(currentUser.uid);
    }
  }, [currentUser?.uid]); // Add currentUser as a dependency

  function addWeekToDate(orderDate) {
    const daysInWeek = 7;
    const millisecondsInDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    const oneWeekMilliseconds = daysInWeek * millisecondsInDay; // Number of milliseconds in one week

    // Convert the orderDate string to a JavaScript Date object
    const date = new Date(orderDate);

    // Add one week to the date
    date.setTime(date.getTime() + oneWeekMilliseconds);

    // Return the updated date as a string in the original format
    return date.toDateString();
  }

  console.log(currentUser);

  return (
    <Layout title="Order History">
      <div className="bg-[#fafafa] ">
        <div className="py-36 max-w-7xl mx-auto">
          <div>
            <h2 className="text-black"> Order History</h2>
            {orders?.map((order) => (
              <Card
                key={order.id}
                style={{
                  marginBottom: "20px",
                  backgroundColor: "#fafafa",
                }}
              >
                <Card.Header>
                  <div className="text-black flex justify-between w-full ">
                    <h5 className="px-2">Order #{order.orderId}</h5>
                    <p className="px-2">{order.orderDate}</p>
                    <p className="px-2">Total Cost: ${order.totalPrice}</p>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="text-[#8899A6]">
                    {order.orderItems.map((item) => (
                      <div
                        className="text-black"
                        key={item.id}
                        style={{ marginBottom: "10px" }}
                      >
                        <img
                          className="w-26 h-12"
                          src={item.images[0]}
                          alt=""
                        />
                        <h6>{item.name}</h6>
                        <p>
                          <strong>Price:</strong> ${item.price}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {item.amount}
                        </p>
                      </div>
                    ))}
                    <p className="text-black  ">
                      <p className="font-bold mr-1 my-0 py-0">
                        Payment Method:
                      </p>
                      <p className="text-black">{order.paymentMethod}</p>
                    </p>
                    <p className="text-black my-0 py-0">
                      <strong>Shipping Address:</strong>

                      {shippingAddress && (
                        <div className="my-2">
                          <p>
                            <strong>Name:</strong> {shippingAddress.name}
                          </p>
                          <p>
                            <strong>Address:</strong> {shippingAddress.address}
                          </p>
                          <p>
                            <strong>City:</strong> {shippingAddress.city}
                          </p>
                          <p>
                            <strong>State:</strong> {shippingAddress.state}
                          </p>
                          <p>
                            <strong>Zip:</strong> {shippingAddress.zip}
                          </p>
                        </div>
                      )}
                    </p>
                    <p className="text-black flex mr-2">
                      <p className="font-bold mr-1">Estimated Delivery Date:</p>

                      <p>{addWeekToDate(order.orderDate)}</p>
                    </p>
                    <p className="text-black flex ">
                      <p className="font-bold mr-1">Order Status:</p>
                      Payment Complete
                    </p>
                    <Button variant="primary">Track Order</Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
