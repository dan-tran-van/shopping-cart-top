import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/Root";
import Index from "./routes/Index";
import ErrorPage from "./routes/ErrorPage";
import Shop from "./routes/Shop";
import Cart from "./routes/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "shop",
            element: <Shop />,
            children: [
              {
                path: ":category",
                element: <Shop />,
              },
            ],
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "product/:productId",
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
