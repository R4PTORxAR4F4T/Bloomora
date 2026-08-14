"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { getProduct } from "@/src/services/product.service";
import { useCart } from "@/src/hooks/useCart";
import { useAuth } from "@/src/hooks/useAuth";
import { useWishlist } from "@/src/hooks/useWishlist";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [selectedColor, setSelectedColor] = useState("");

  const [savingWishlist, setSavingWishlist] = useState(false);

  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  async function handleAddToCart() {
    if (addingToCart) return;

    setAddingToCart(true);

    try {
      await addToCart(product._id, quantity, selectedColor);
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't add this to your cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  }

  async function handleBuyNow() {
    if (buyingNow) return;

    setBuyingNow(true);

    try {
      await addToCart(product._id, quantity, selectedColor);
      router.push("/checkout");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't start checkout. Please try again.");
      setBuyingNow(false);
    }
  }

  async function handleWishlistToggle() {
    if (!user) {
      toast.error("Please log in to save items to your wishlist");
      return;
    }

    if (savingWishlist) return;

    setSavingWishlist(true);

    try {
      const alreadySaved = isInWishlist(product._id);

      await toggleWishlist(product._id);

      toast.success(
        alreadySaved ? "Removed from wishlist" : "Added to wishlist"
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSavingWishlist(false);
    }
  }

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await getProduct(slug as string);

        setProduct(res.data);

        if (res.data.colors?.length > 0) {
          setSelectedColor(res.data.colors[0]);
        }
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />

          <div className="space-y-5">
            <div className="h-10 rounded bg-gray-200" />
            <div className="h-8 w-40 rounded bg-gray-200" />
            <div className="h-40 rounded bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <Link
          href="/shop"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to Shop
        </Link>
      </div>

      <div className="grid gap-14 lg:grid-cols-2">
        {/* Product Image */}

        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={product.images?.[0]?.url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="eager"
            className="object-cover"
          />
        </div>

        {/* Product Info */}

        <div>
          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            {product.discountPrice > 0 ? (
              <>
                <span className="text-3xl font-bold text-[#B78A61]">
                  ৳{product.discountPrice}
                </span>

                <span className="text-xl text-gray-400 line-through">
                  ৳{product.price}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-[#B78A61]">
                ৳{product.price}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-6">
            <span>
              ⭐ {product.rating.toFixed(1)}
            </span>

            <span>
              {product.totalReviews} Reviews
            </span>

            <span
              className={
                product.stock > 0
                  ? "text-green-600"
                  : "text-red-500"
              }
            >
              {product.stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </div>

          <p className="mt-8 leading-8 text-gray-600">
            {product.description}
          </p>

          {/* Colors */}

          {product.colors?.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 font-semibold">
                Color
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.colors.map((color: string, index: number) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-black scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}

          <div className="mt-8">
            <h3 className="mb-3 font-semibold">
              Quantity
            </h3>

            <div className="flex w-fit items-center rounded-lg border">
              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.max(1, q - 1)
                  )
                }
                className="p-3"
              >
                <Minus size={18} />
              </button>

              <span className="w-16 text-center font-semibold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.min(product.stock, q + 1)
                  )
                }
                className="p-3"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-10 flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addingToCart}
              className="flex flex-1 items-center justify-center gap-3 rounded-lg bg-[#B78A61] px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <ShoppingBag size={20} />
              {product.stock > 0
                ? addingToCart
                  ? "Adding..."
                  : "Add to Cart"
                : "Out of Stock"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0 || buyingNow}
              className="rounded-lg border border-[#3D2A22] px-8 py-4 font-semibold transition hover:bg-[#3D2A22] hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent"
            >
              {buyingNow ? "Please wait..." : "Buy Now"}
            </button>

            <button
              type="button"
              onClick={handleWishlistToggle}
              disabled={savingWishlist}
              aria-label={
                isInWishlist(product._id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              className="flex items-center justify-center rounded-lg border px-5 transition hover:bg-[#F7F1EA] disabled:cursor-not-allowed"
            >
              <Heart
                size={22}
                className={
                  isInWishlist(product._id)
                    ? "fill-[#B78A61] text-[#B78A61]"
                    : "text-[#3D2A22]"
                }
              />
            </button>
          </div>

          {/* Extra */}

          <div className="mt-12 space-y-2 text-sm text-gray-600">
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {product.category?.name}
            </p>

            <p>
              <strong>Sub Category:</strong>{" "}
              {product.subCategory?.name}
            </p>

            <p>
              <strong>Materials:</strong>{" "}
              {product.materials?.join(", ")}
            </p>

            <p>
              <strong>Size:</strong>{" "}
              {product.dimensions.width} ×{" "}
              {product.dimensions.height}{" "}
              {product.dimensions.unit}
            </p>

            <p>
              <strong>Care:</strong>{" "}
              {product.careInstructions}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}