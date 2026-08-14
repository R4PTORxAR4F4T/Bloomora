import axios from "@/src/lib/axios";

export async function getProducts(params?: any) {
  const { data } = await axios.get("/products", {
    params,
  });

  return data;
}

export async function getProduct(slug: string) {
  const { data } = await axios.get(
    `/products/slug/${slug}`
  );

  return data;
}

export async function getFeaturedProducts() {
  const { data } = await axios.get("/products/featured");
  return data;
}

export async function getBestSellerProducts() {
  const { data } = await axios.get("/products/best-sellers");
  return data;
}

export async function getNewArrivalProducts() {
  const { data } = await axios.get("/products/new-arrivals");
  return data;
}