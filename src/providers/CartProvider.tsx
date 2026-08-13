"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { useAuth } from "@/src/hooks/useAuth";

import {
  getCart,
  addToDatabaseCart,
  updateCartItem,
  removeCartItem,
  clearCart as clearDatabaseCart,
  mergeGuestCart,
} from "@/src/services/cart.service";

import {
  getLocalCart,
  addToLocalCart,
  updateLocalCartQuantity,
  removeFromLocalCart,
  clearLocalCart,
  getLocalCartQuantity,
} from "@/src/lib/cart";

interface CartContextType {
  cart: any[];
  cartCount: number;
  loading: boolean;

  refreshCart: () => Promise<void>;

  addToCart: (
    productId: string,
    quantity?: number,
    color?: string,
    size?: string
  ) => Promise<void>;

  updateQuantity: (
    productId: string,
    quantity: number,
    color?: string,
    size?: string
  ) => Promise<void>;

  removeItem: (
    productId: string,
    color?: string,
    size?: string
  ) => Promise<void>;

  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function refreshCart() {
    if (user) {
      const res = await getCart();
      setCart(res.items || []);
    } else {
      setCart(getLocalCart());
    }
  }

  useEffect(() => {
    async function init() {
      setLoading(true);

      try {
        if (user) {
          const guestCart = getLocalCart();

          if (guestCart.length > 0) {
            await mergeGuestCart(guestCart);
            clearLocalCart();
          }

          const res = await getCart();
          setCart(res.items || []);
        } else {
          setCart(getLocalCart());
        }
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [user]);

  useEffect(() => {
    if (user) return;

    function syncGuestCart() {
      setCart(getLocalCart());
    }

    window.addEventListener("cartUpdated", syncGuestCart);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        syncGuestCart
      );
    };
  }, [user]);

  async function addToCart(
    productId: string,
    quantity = 1,
    color = "",
    size = ""
  ) {
    if (user) {
      await addToDatabaseCart(
        productId,
        quantity,
        color,
        size
      );

      await refreshCart();
      return;
    }

    addToLocalCart(
      productId,
      quantity,
      color,
      size
    );

    setCart(getLocalCart());
  }

  async function updateQuantity(
    productId: string,
    quantity: number,
    color = "",
    size = ""
  ) {
    if (user) {
      const item = cart.find(
        (i: any) =>
          i.product?._id === productId &&
          (i.color || "") === color &&
          (i.size || "") === size
      );

      if (!item) return;

      await updateCartItem(
        item._id,
        quantity,
        color,
        size
      );

      await refreshCart();
      return;
    }

    updateLocalCartQuantity(
      productId,
      quantity,
      color,
      size
    );

    setCart(getLocalCart());
  }

  async function removeItem(
    productId: string,
    color = "",
    size = ""
  ) {
    if (user) {
      const item = cart.find(
        (i: any) =>
          i.product?._id === productId &&
          (i.color || "") === color &&
          (i.size || "") === size
      );

      if (!item) return;

      await removeCartItem(item._id);

      await refreshCart();
      return;
    }

    removeFromLocalCart(
      productId,
      color,
      size
    );

    setCart(getLocalCart());
  }

  async function clearCart() {
    if (user) {
      await clearDatabaseCart();

      await refreshCart();
      return;
    }

    clearLocalCart();

    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: user
          ? cart.reduce(
              (total, item) =>
                total + item.quantity,
              0
            )
          : getLocalCartQuantity(),

        loading,

        refreshCart,

        addToCart,

        updateQuantity,

        removeItem,

        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}