import "@/styles/globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className={`${inter.className} flex w-full flex-grow flex-col`}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
