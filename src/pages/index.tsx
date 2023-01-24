import Image from "next/future/image";
import { HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "../lib/stripe/stripe";
import Link from "next/link";
import Head from "next/head";
import { FiShoppingCart } from "react-icons/fi";
import { MouseEvent, MouseEventHandler } from "react";
import { useCart } from "../context/useCart";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceStr: string;
  priceId: string;
}
interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const { addItem } = useCart();

  const handleAddItemToCart = (
    event: MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    event.stopPropagation();
    addItem({
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      priceId: product.priceId,
    });
  };

  return (
    <>
      <Head>
        <title>Home | Ignite shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.priceStr}</span>
                </div>

                <button onClick={(e) => handleAddItemToCart(e, product)}>
                  <FiShoppingCart size={25} />
                </button>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  );
}

// Executado na build do projeto e gera uma versão cacheada da
// página atual. Normalmente utilizado quando o conteúdo de uma
// página não muda tão frequentemente
// (exemplo: lista de produtos de e-commerce)
export const getStaticProps: GetStaticProps = async () => {
  // Expand irá fazer com que os produtos venham com as informaçoes
  // do preço que normalmente não vêm junto
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    // Typescript não reconhece que fizemos o expand para buscar
    // os dados dos produtos
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      priceId: price.id,
      priceStr: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
    } as HomeProps["products"][number];
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // Cada duas horas, deve ser recalculado o cache
  };
};
