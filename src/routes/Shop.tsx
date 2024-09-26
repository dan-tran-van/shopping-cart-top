import CategoryList from "./CategoryList";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";

export default function Shop() {
  const { category } = useParams();
  return (
    <>
      <div
        id="shop"
        className="grid min-h-screen w-full grid-cols-12 bg-blue-50"
      >
        <div
          id="category-list"
          className="col-span-3 flex flex-col items-center"
        >
          <CategoryList category={category} />
        </div>
        <div id="products-display" className="col-span-9">
          <ProductList category={category} />
        </div>
      </div>
    </>
  );
}
