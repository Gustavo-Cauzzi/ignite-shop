import { PropsWithChildren } from "react";
import { CartProvider } from "./useCart";

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};
