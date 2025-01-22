import "@/styles/globals.css";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
