import "@/styles/globals.css";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div class="w-full">
        <Component {...pageProps} />
      </div>
    </>
  );
}
