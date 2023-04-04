import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Card } from "react-bootstrap";

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
  const [orders, setOrders] = useState(orderData);

  return (
    <Layout title="Order History">
      <div className="bg-[#15202b] ">
        <div className="  py-36 max-w-7xl mx-auto">
          {/* <h1 className="mb-4 text-xl">Order History</h1> */}
          {/* {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : ( */}
          <div>
            <h2 className="text-white">Your Order History</h2>
            {orders?.map((order) => (
              <Card
                key={order.id}
                style={{
                  marginBottom: "20px",
                  backgroundColor: "#192734",
                }}
              >
                <Card.Header>
                  <div className="text-white flex justify-between w-1/3">
                    <h5>Order #{order.id}</h5>
                    <p>{order.date}</p>
                    <p>Total Cost: ${order.totalCost}</p>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="text-[#8899A6]">
                    {order.items.map((item) => (
                      <div
                        className="text-white"
                        key={item.id}
                        style={{ marginBottom: "10px" }}
                      >
                        <img className="w-26 h-12" src={item.image} alt="" />
                        <h6>{item.name}</h6>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    ))}
                    <p>Payment Method: {order.paymentMethod}</p>
                    <p>Shipping Address: {order.shippingAddress}</p>
                    <p>Estimated Delivery Date: {order.deliveryDate}</p>
                    <p>Shipping Status: {order.shippingStatus}</p>
                    <Button variant="primary">Track Order</Button>
                    {/* {order.returnInfo && (
                  <div style={{ marginTop: "10px" }}>
                    <h6>Return/Refund Information</h6>
                    <p>{order.returnInfo}</p>
                  </div>
                )} */}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
          {/* )} */}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
