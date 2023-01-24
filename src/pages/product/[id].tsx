import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const [isCheckouting, setIsCheckouting] = useState(false);

  // Está buscando os dados do produto (ver fallback em getStaticPaths)
  if (isFallback) {
    return <p>Loading...</p>;
  }

  async function handleBuyProduct() {
    try {
      const toastId = toast.loading("Redirecionando para checkout...");
      setIsCheckouting(true);

      const response = await axios.post("/api/checkout", {
        products: [{ priceId: product.defaultPriceId }],
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
      toast.dismiss(toastId);
    } catch (err) {
      toast.error("Falha ao redirecionar ao checkout!");
      console.error(err);
      setIsCheckouting(false);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button disabled={isCheckouting} onClick={handleBuyProduct}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

/**
 * Para quais parâmetros (definidos no nome do arquivo) o next deve gerar
 * a versão estática dentro da build
 * https://app.rocketseat.com.br/node/projeto-04/group/produto-and-checkout/lesson/fallback-do-ssg
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    /**
     * Fazer o load de apenas os produtos mais acessados (ideia)
     *
     * Carregar todos os 5000 produtos na build??? (resposta: não, usar o fallback)
     */
    paths: [{ params: { id: "prod_MPjwKsjPsFrEzR" } }],
    /**
     * false = 404 caso o produto não existir
     * true = Vai renderizar a tela e vai executar o getStaticProps
     * de forma assíncrona simultâneamente para buscar os dados
     * do produto
     * 'blocking' = Irá carregar antes de renderizar a página (loading ruim, evitar fazer)
     * OBS: Se for usado true, as props irão ser undefined em um primeiro
     * momento, provavelmente acontecendo erros na interface se não tratado
     * (ver useRouter().isFallback)
     */
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
