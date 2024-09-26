import { NavLink } from "react-router-dom";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function CategoryList({
  category,
}: {
  category: string | undefined;
}) {
  const {
    data,
    error,
    isLoading,
  }: { data: string[]; error: unknown; isLoading: boolean } = useSWR(
    "https://fakestoreapi.com/products/categories",
    fetcher,
  );
  if (error) return "An error has ocurred.";
  if (isLoading) return "Loading categories..";
  return (
    <ul className="flex flex-col">
      {category ? (
        <NavLink to={``} className="rounded-sm p-2 hover:bg-violet-300">
          All
        </NavLink>
      ) : (
        <NavLink
          to={``}
          className="rounded-sm p-2 text-violet-600 hover:bg-violet-300"
        >
          All
        </NavLink>
      )}
      {data.map((d) => (
        <NavLink
          key={d}
          to={`${d}`}
          className={({ isActive, isPending }) =>
            isActive
              ? "rounded-sm p-2 text-violet-600 hover:bg-violet-300"
              : isPending
                ? "rounded-sm p-2 text-gray-500"
                : "rounded-sm p-2 hover:bg-violet-300"
          }
        >
          {capitalizeFirstLetter(d)}
        </NavLink>
      ))}
    </ul>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
