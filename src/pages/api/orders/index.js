// import { useContext } from "react";
// import { AuthContext } from "../../../../contexts/AuthContext";

// const { currentUser } = useContext(AuthContext);

// // const handler = async (req, res) => {
// //   if (!currentUser) {
// //     return res.status(401).send("signin required");
// //   }
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //     //   const response = await createUserWithEmailAndPassword(
// //     //     auth,
// //     //     email,
// //     //     password
// //     //   );

// //       const storageRef = ref(storage, displayName);

// //       const uploadTask = uploadBytesResumable(storageRef, file);

// //       uploadTask.on(
// //         "state_changed",
// //         (snapshot) => {
// //           const progress =
// //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// //           console.log("Upload is " + progress + "% done");
// //           switch (snapshot.state) {
// //             case "paused":
// //               console.log("Upload is paused");
// //               break;
// //             case "running":
// //               console.log("Upload is running");
// //               break;
// //           }
// //         },
// //         (error) => {
// //           setError(true);
// //           console.log(error);
// //         },
// //         () => {
// //           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
// //             console.log("File available at", downloadURL);
// //             // await updateProfile(response.user, {
// //             //   displayName,
// //             //   photoURL: downloadURL,
// //             // });
// //             await setDoc(doc(db, "orders", response.user.uid), {
// //               uid: response.user.uid,
// //               displayName,
// //               email,
// //               photoURL: downloadURL,
// //               aboutMe: "",
// //               aboutMeColor: "#99AAB5",
// //             });
// //             await setDoc(doc(db, "userChats", response.user.uid), {});
// //           });
// //           router.push("/");
// //         }
// //       );
// //     } catch (error) {
// //       console.log(error);
// //       setError(true);
// //     }
// //   };

// //   //   const order = await newOrder.save();
// //   res.status(201).send(order);
// // };
// // export default handler;

// const handler = async (req, res) => {
//   console.log(req.body);

//   if (!currentUser) {
//     return res.status(401).send("signin required");
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const storageRef = ref(storage, displayName);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//           }
//         },
//         (error) => {
//           setError(true);
//           console.log(error);
//         },
//         async () => {
//           try {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             console.log("File available at", downloadURL);

//             // Generate a new order ID
//             const orderId = db.collection("orders").doc().id;

//             await setDoc(doc(db, "orders", orderId), {
//               orderId,
//               uid: currentUser.uid,
//               displayName,
//               email,
//               photoURL: downloadURL,
//               aboutMe: "",
//               aboutMeColor: "#99AAB5",
//             });

//             await setDoc(doc(db, "userChats", response.user.uid), {});
//             router.push("/");
//           } catch (error) {
//             console.log(error);
//             setError(true);
//           }
//         }
//       );
//     } catch (error) {
//       console.log(error);
//       setError(true);
//     }
//   };

//   res.status(201).send(order);
// };

// export default handler;

import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

const generateOrderId = () => {
  // Generate a unique order ID using a combination of a timestamp and a random string
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2);
  return `${timestamp}-${randomString}`;
};

const ordersHandler = async (req, res) => {
  //   try {
  //     const {
  //       orderItems,
  //       shippingInformation,
  //       paymentMethod,
  //       itemsPrice,
  //       shippingPrice,
  //       taxPrice,
  //       totalPrice,
  //     } = req.body;

  //     // Generate a unique order ID
  //     const orderId = generateOrderId();

  //     // Create a new document in the "orders" collection with the generated order ID
  //     await firebase.firestore().collection("orders").doc(orderId).set({
  //       orderItems,
  //       shippingInformation,
  //       paymentMethod,
  //       itemsPrice,
  //       shippingPrice,
  //       taxPrice,
  //       totalPrice,
  //     });

  //     res.status(201).json({ message: "Order placed successfully", orderId });
  //   } catch (err) {
  //     res.status(500).json({ error: "Failed to place order" });
  //   }
  const {
    orderId,
    orderItems,
    shippingInformation,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
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
      totalPrice
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
  } catch (error) {
    console.log(error);
  }
};

export default ordersHandler;

let example = {
  orderId: "1680928504435-61vp6cqw4u",
  orderItems: [
    {
      id: 8,
      title: "Microsoft Surface Laptop 4",
      description:
        "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
      price: 1499,
      discountPercentage: 10.23,
      rating: 4.43,
      stock: 68,
      brand: "Microsoft Surface",
      category: "laptops",
      thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
      images: [Array],
      amount: 1,
    },
  ],
  shippingInformation: {
    name: "Alexander Daniel Rodriguez",
    address: "1715 North Ann Street",
    city: "Texarkana",
    state: "TX",
    zip: "75501",
    country: "Albania",
  },
  paymentMethod: "stripe",
  itemsPrice: 1499,
  shippingPrice: 12.99,
  taxPrice: 119.92,
  totalPrice: 1631.91,
};
