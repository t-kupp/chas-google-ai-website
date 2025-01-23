import "@/styles/globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className={`${inter.className} w-full`}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
