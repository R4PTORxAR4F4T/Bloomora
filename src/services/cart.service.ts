import axios from "@/src/lib/axios";

export async function getCart() {
  const { data } = await axios.get("/cart");
  return data.data;
}

export async function addToDatabaseCart(
  productId: string,
  quantity: number,
  color?: string,
  size?: string
) {
  const { data } = await axios.post("/cart", {
    productId,
    quantity,
    color,
    size
  });

  return data.data;
}

export async function updateCartItem(
  itemId: string,
  quantity: number,
  color?: string,
  size?: string
) {
  const { data } = await axios.patch(`/cart/${itemId}`, {
    quantity,
    color,
    size,
  });

  return data.data;
}

export async function removeCartItem(itemId: string) {
  const { data } = await axios.delete(`/cart/${itemId}`);
  return data.data;
}

export async function clearCart() {
  const { data } = await axios.delete("/cart");
  return data.data;
}

export async function mergeGuestCart(items: any[]) {
  const { data } = await axios.post("/cart/sync", items);

  return data.data;
}