import useSWR from "swr";
import { Product } from "../types/Product";
import { ProductCard } from "./ProductCard";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function ProductList({
  category,
}: {
  category: string | undefined;
}) {
  const {
    data,
    error,
    isLoading,
  }: { data: Product[]; error: unknown; isLoading: boolean } = useSWR(
    category
      ? `https://fakestoreapi.com/products/category/${category}`
      : "https://fakestoreapi.com/products",
    fetcher,
  );

  if (error) return "An error has ocurred.";
  if (isLoading) return "Loading products...";

  return (
    <ul className="grid grid-cols-3 gap-4 p-6">
      {data.map((d) => (
        <ProductCard key={d.id} product={d} />
      ))}
    </ul>
  );
}
