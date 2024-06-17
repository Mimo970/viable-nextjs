import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}

// pages / checkout.js;
// import { useEffect } from "react";
// import { initiateCheckout } from "../services/checkout";

// const CheckoutPage = () => {
//   useEffect(() => {
//     // Replace with your actual line items for Stripe Checkout
//     const lineItems = [
//       // Example line items, replace with your actual logic
//       { price: "price_1A2BCD", quantity: 1 },
//     ];

//     initiateCheckout({ lineItems });
//   }, []);

//   return <div>Redirecting to Stripe Checkout...</div>;
// };

// export default CheckoutPage;
