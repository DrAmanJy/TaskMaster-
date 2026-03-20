import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Auth from "./pages/Auth";

const routes = createBrowserRouter([
  { index: true, element: <App /> },
  { path: "/auth", element: <Auth /> },
]);
export default routes;
