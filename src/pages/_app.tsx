import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoSvg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";

import { Toaster } from "react-hot-toast";

import Image from "next/future/image";
import { ShoppingCart } from "../components/ShoppingCart";
import { ContextProvider } from "../context";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Container>
        <Header>
          <Image src={logoSvg} alt="" />

          <ShoppingCart />
        </Header>

        <Toaster />
        <Component {...pageProps} />
      </Container>
    </ContextProvider>
  );
}
