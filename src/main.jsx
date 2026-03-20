import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <main className=" dark:bg-black dark:text-white min-h-screen">
      <RouterProvider router={routes} />
    </main>
  </StrictMode>,
);
