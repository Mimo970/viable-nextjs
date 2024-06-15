// import {
//   Timestamp,
//   doc,
//   setDoc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
// } from "firebase/firestore";
// import { db } from "../../../../firebase";
// import { AuthContext } from "../../../../contexts/AuthContext";
// import { useContext } from "react";

// const ordersHandler = async (req, res) => {
//   //   try {
//   //     const {
//   //       orderItems,
//   //       shippingInformation,
//   //       paymentMethod,
//   //       itemsPrice,
//   //       shippingPrice,
//   //       taxPrice,
//   //       totalPrice,
//   //     } = req.body;

//   //     // Generate a unique order ID
//   //     const orderId = generateOrderId();

//   //     // Create a new document in the "orders" collection with the generated order ID
//   //     await firebase.firestore().collection("orders").doc(orderId).set({
//   //       orderItems,
//   //       shippingInformation,
//   //       paymentMethod,
//   //       itemsPrice,
//   //       shippingPrice,
//   //       taxPrice,
//   //       totalPrice,
//   //     });

//   //     res.status(201).json({ message: "Order placed successfully", orderId });
//   //   } catch (err) {
//   //     res.status(500).json({ error: "Failed to place order" });
//   //   }
//   const { currentUser } = useContext(AuthContext);
//   const {
//     orderId,
//     orderItems,
//     shippingInformation,
//     paymentMethod,
//     itemsPrice,
//     shippingPrice,
//     taxPrice,
//     totalPrice,
//   } = req.body;
//   try {
//     console.log(
//       orderId,
//       orderItems,
//       shippingInformation,
//       paymentMethod,
//       itemsPrice,
//       shippingPrice,
//       taxPrice,
//       totalPrice
//     );

//     await setDoc(doc(db, "orders", orderId), {
//       orderId: orderId,
//       orderItems: orderItems,
//       shippingInformation: shippingInformation,
//       paymentMethod: paymentMethod,
//       itemsPrice: itemsPrice,
//       shippingPrice: shippingPrice,
//       taxPrice: taxPrice,
//       totalPrice: totalPrice,
//       orderDate: Timestamp.now().toDate().toDateString(),
//     });

//     // await updateDoc(doc(db, "users", currentUser.uid), {
//     //   orders: arrayUnion({
//     //     orderId: orderId,
//     //     orderItems: orderItems,
//     //     shippingInformation: shippingInformation,
//     //     paymentMethod: paymentMethod,
//     //     itemsPrice: itemsPrice,
//     //     shippingPrice: shippingPrice,
//     //     taxPrice: taxPrice,
//     //     totalPrice: totalPrice,
//     //     orderDate: Timestamp.now().toDate().toDateString(),
//     //   }),
//     // });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default ordersHandler;

import {
  Timestamp,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";
const generateOrderId = () => {
  // Generate a unique order ID using a combination of a timestamp and a random string
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2);
  return `${timestamp}-${randomString}`;
};

const ordersHandler = async (req, res) => {
  const {
    orderId,
    orderItems,
    shippingInformation,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    userID,
  } = req.body;
  try {
    console.log(
      orderId,
      orderItems,
      shippingInformation,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      userID
    );

    await setDoc(doc(db, "orders", orderId), {
      orderId: orderId,
      orderItems: orderItems,
      shippingInformation: shippingInformation,
      paymentMethod: paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
      orderDate: Timestamp.now().toDate().toDateString(),
    });

    await updateDoc(doc(db, "users", userID), {
      orders: arrayUnion({
        orderId: orderId,
        orderItems: orderItems,
        shippingInformation: shippingInformation,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        orderDate: Timestamp.now().toDate().toDateString(),
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export default ordersHandler;
