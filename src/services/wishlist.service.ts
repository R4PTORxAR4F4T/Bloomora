import axios from "@/src/lib/axios";

export async function getWishlist() {
  const { data } = await axios.get("/wishlist");
  return data.data;
}

export async function addToWishlist(productId: string) {
  const { data } = await axios.post(`/wishlist/${productId}`);
  return data.data;
}

export async function removeFromWishlist(productId: string) {
  const { data } = await axios.delete(`/wishlist/${productId}`);
  return data.data;
}

export async function clearWishlist() {
  const { data } = await axios.delete("/wishlist");
  return data.data;
}
