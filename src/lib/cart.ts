// src/lib/cart.ts

export interface LocalCartItem {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}

const STORAGE_KEY = "cart";

function notifyCartUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
}

export function getLocalCart(): LocalCartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLocalCart(items: LocalCartItem[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  );

  notifyCartUpdate();
}

export function addToLocalCart(
  productId: string,
  quantity = 1,
  color = "",
  size = ""
  
) {
  const cart = getLocalCart();

  const existing = cart.find(
    (item) =>
      item.productId === productId &&
      (item.color || "") === color &&
      (item.size || "") === size
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      color,
      size,
    });
  }

  saveLocalCart(cart);
}

export function updateLocalCartQuantity(
  productId: string,
  quantity: number,
  color = "",
  size = ""
) {
  const cart = getLocalCart();

  const item = cart.find(
    (i) =>
      i.productId === productId &&
      (i.color || "") === color &&
      (i.size || "") === size
  );

  if (!item) return;

  if (quantity <= 0) {
    removeFromLocalCart(productId, color, size);
    return;
  }

  item.quantity = quantity;

  saveLocalCart(cart);
}

export function removeFromLocalCart(
  productId: string,
  color = "",
  size = ""
) {
  const cart = getLocalCart().filter(
    (item) =>
      !(
        item.productId === productId &&
        (item.color || "") === color &&
        (item.size || "") === size
      )
  );

  saveLocalCart(cart);
}

export function clearLocalCart() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);

  notifyCartUpdate();
}

export function getLocalCartCount() {
  return getLocalCart().length;
}

export function getLocalCartQuantity() {
  return getLocalCart().reduce(
    (total, item) => total + item.quantity,
    0
  );
}

export function isProductInLocalCart(
  productId: string,
  color = "",
  size = ""
) {
  return getLocalCart().some(
    (item) =>
      item.productId === productId &&
      (item.color || "") === color &&
      (item.size || "") === size
  );
}