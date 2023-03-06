import { AppProps } from "next/app";
import "../styles/index.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/blog/layout";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
