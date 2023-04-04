import "@/styles/globals.css";
// import { ThemeProvider } from "next-themes";
import "bootstrap/dist/css/bootstrap.min.css";
import CartProvider from "../../contexts/CartContext";
import { AuthContextProvider } from "../../contexts/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthContextProvider>
  );
}
