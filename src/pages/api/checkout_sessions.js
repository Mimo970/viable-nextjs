const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const orderId = req.body.orderId;
  if (req.method === "POST") {
    const items = req.body.cart;

    console.log(items);
    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title || "",
          images: [item.images[0]],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.amount,
    }));

    console.log(transformedItems);

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: transformedItems,
        // line_items[0],[price_data],[product_data],[name]
        mode: "payment",
        success_url: `${req.headers.origin}/orderDetails/${orderId}`,
        cancel_url: `${req.headers.origin}/`,
      });
      res.json({ sessionURL: session.url });
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// import { loadStripe } from "@stripe/stripe-js";

// export async function checkout({ lineItems }) {
//   let stripePromise = null;

//   const getStripe = () => {
//     if (!stripePromise) {
//       stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
//     }
//     return stripePromise;
//   };

//   if (req.method === "POST") {
//     // const items = req.body.cart;

//     console.log(items);
//     const transformedItems = lineItems.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//           images: [req.headers.origin + item.image],
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));

//     const stripe = await getStripe();

//     await stripe.redirectToCheckout({
//       mode: "payment",
//       lineItems: transformedItems,
//       success_url: `${req.headers.origin}/success`,
//       cancel_url: `${req.headers.origin}/`,
//     });
//   }
// }
