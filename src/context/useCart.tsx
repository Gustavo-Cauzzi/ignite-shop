import { createContext, PropsWithChildren, useContext, useState } from "react";

interface CartContext {
  items: CartItem[];
  addItem: (item: CartItem) => any;
  removeItem: (priceId: string) => any;
}

export interface CartItem {
  priceId: string;
  name: string;
  imageUrl: string;
  price: number;
}

const CartContext = createContext<CartContext>({} as CartContext);

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (itemToEdit: Omit<CartItem, "quantity">) => {
    if (items.some((item) => item.priceId === itemToEdit.priceId)) return;
    setItems((state) => [...state, { ...itemToEdit, quantity: 1 }]);
  };

  const removeItem = (priceId: string) => {
    setItems((state) => state.filter((item) => item.priceId !== priceId));
  };

  return (
    <CartContext.Provider value={{ items, removeItem, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
