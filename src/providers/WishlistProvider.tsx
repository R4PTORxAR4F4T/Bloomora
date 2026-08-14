"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { useAuth } from "@/src/hooks/useAuth";
import { Product } from "@/src/types/product";

import {
  getWishlist,
  addToWishlist as addToWishlistApi,
  removeFromWishlist as removeFromWishlistApi,
  clearWishlist as clearWishlistApi,
} from "@/src/services/wishlist.service";

interface WishlistContextType {
  wishlist: Product[];
  wishlistCount: number;
  loading: boolean;

  isInWishlist: (productId: string) => boolean;

  refreshWishlist: () => Promise<void>;

  addToWishlist: (productId: string) => Promise<void>;

  removeFromWishlist: (productId: string) => Promise<void>;

  toggleWishlist: (productId: string) => Promise<void>;

  clearWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType>(
  {} as WishlistContextType
);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function refreshWishlist() {
    if (!user) {
      setWishlist([]);
      return;
    }

    try {
      const res = await getWishlist();
      setWishlist(res?.products || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function init() {
      setLoading(true);

      try {
        if (user) {
          const res = await getWishlist();
          setWishlist(res?.products || []);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error(error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [user]);

  function isInWishlist(productId: string) {
    return wishlist.some((item) => item._id === productId);
  }

  async function addToWishlist(productId: string) {
    if (!user) return;

    const res = await addToWishlistApi(productId);
    setWishlist(res?.products || []);
  }

  async function removeFromWishlist(productId: string) {
    if (!user) return;

    const res = await removeFromWishlistApi(productId);
    setWishlist(res?.products || []);
  }

  async function toggleWishlist(productId: string) {
    if (!user) return;

    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  }

  async function clearWishlist() {
    if (!user) return;

    const res = await clearWishlistApi();
    setWishlist(res?.products || []);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,

        loading,

        isInWishlist,

        refreshWishlist,

        addToWishlist,

        removeFromWishlist,

        toggleWishlist,

        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  return useContext(WishlistContext);
}
