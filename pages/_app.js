import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import { useEffect } from "react";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Ensure that the Bootstrap JavaScript is only loaded on the client side
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
