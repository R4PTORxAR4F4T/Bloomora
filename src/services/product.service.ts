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