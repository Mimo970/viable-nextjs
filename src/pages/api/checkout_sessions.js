// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   const orderId = req.body.orderId;
//   if (req.method === "POST") {
//     const items = req.body.cart;

//     console.log(items);
//     const transformedItems = items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.title || "",
//           images: [item.images[0]],
//         },
//         // unit_amount: item.price * 100,
//         unit_amount: Math.round(item.price * 100), // Ensure unit_amount is an integer
//       },
//       quantity: item.amount,
//     }));

//     console.log(transformedItems);

//     try {
//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create({
//         line_items: transformedItems,
//         // line_items[0],[price_data],[product_data],[name]
//         mode: "payment",
//         success_url: `${req.headers.origin}/orderDetails/${orderId}`,
//         cancel_url: `${req.headers.origin}/`,
//       });
//       res.json({ sessionURL: session.url });
//     } catch (err) {
//       console.log(err);
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { orderId, cart } = req.body;

    if (!cart) {
      console.error("Cart is undefined");
      return res.status(400).json({ error: "Cart is undefined" });
    }

    if (!Array.isArray(cart)) {
      console.error("Cart is not an array:", cart);
      return res.status(400).json({ error: "Invalid cart format" });
    }

    console.log("Received cart:", cart);

    try {
      const transformedItems = cart.map((item) => {
        if (!item || typeof item !== "object") {
          throw new Error("Invalid item in cart");
        }

        if (!item.price || !item.amount) {
          throw new Error(
            `Missing price or amount in item: ${JSON.stringify(item)}`
          );
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title || "No title",
              images:
                item.images && item.images.length > 0 ? [item.images[0]] : [],
            },
            unit_amount: Math.round(item.price * 100), // Ensure unit_amount is an integer
          },
          quantity: item.amount,
        };
      });

      console.log("Transformed items:", transformedItems);

      const session = await stripe.checkout.sessions.create({
        line_items: transformedItems,
        mode: "payment",
        success_url: `${req.headers.origin}/orderDetails/${orderId}`,
        cancel_url: `${req.headers.origin}/`,
      });

      res.json({ sessionURL: session.url });
    } catch (err) {
      console.error("Error creating Stripe session:", err);
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
