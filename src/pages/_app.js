import "@/styles/globals.css";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex w-full flex-grow flex-col">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
