import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiShoppingCart, FiX } from "react-icons/fi";
import { useCart } from "../context/useCart";
import {
  ShoppingCartContainer,
  CartOverlay,
  CartProduct,
} from "../styles/pages/app";

export const ShoppingCart: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { items, removeItem } = useCart();

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };
  const handleCloseCart = () => {
    setIsCartOpen(false);
  };
  const handleRemoveItem = (priceId: string) => {
    removeItem(priceId);
  };

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const totalValue = items.reduce((acc, curr) => acc + curr.price, 0);

  const handleFinish = async () => {
    const toastId = toast.loading("Redirecionando para checkout...");
    setIsLoading(false);

    const response = await axios
      .post("/api/checkout", {
        products: items.map(({ priceId }) => ({ priceId })),
      })
      .finally(() => toast.dismiss(toastId));

    const { checkoutUrl } = response.data;

    window.location.href = checkoutUrl;
    setIsLoading(true);
  };

  return (
    <>
      <ShoppingCartContainer onClick={handleOpenCart}>
        {items.length > 0 && (
          <div>
            <p>{items.length}</p>
          </div>
        )}
        <FiShoppingCart size={30} color="#8D8D99" />
      </ShoppingCartContainer>

      {isCartOpen && (
        <CartOverlay onClick={handleCloseCart}>
          <div onClick={(e) => e.stopPropagation()}>
            <button>
              <FiX onClick={handleCloseCart} size={30} color="#fff" />
            </button>

            <h1>Sacola de compras</h1>

            {items.map((item) => (
              <CartProduct key={item.priceId}>
                <figure>
                  <Image src={item.imageUrl} width={95} height={95} alt="" />
                </figure>

                <div>
                  <span>{item.name}</span>
                  <strong>{currencyFormatter.format(item.price / 100)}</strong>

                  <button onClick={() => handleRemoveItem(item.priceId)}>
                    Remover
                  </button>
                </div>
              </CartProduct>
            ))}

            <footer>
              <div>
                <span>Quantidade</span>
                <span>{items.length}</span>
              </div>

              <div>
                <strong>Valor total</strong>
                <strong>{currencyFormatter.format(totalValue / 100)}</strong>
              </div>

              <button onClick={handleFinish} disabled={isLoading}>
                {isLoading ? "Carregando..." : "Finalizar compra"}
              </button>
            </footer>
          </div>
        </CartOverlay>
      )}
    </>
  );
};
