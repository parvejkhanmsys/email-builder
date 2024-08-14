import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
// import '../styles/index.scss';
import styles from "../styles/Home.module.css";
import EmailTemplatesGrid from "../components/email-templates-grid";
import Header from "../components/header";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={inter.className}>
      <Header />
      <EmailTemplatesGrid />
      <Footer/>
    </div>
  );
}
