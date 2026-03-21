import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SigninPage from "./pages/SigninPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardPage from "@/pages/DashboardPage.jsx";

const routes = createBrowserRouter([
  { index: true, element: <App /> },
  { path: "/signin", element: <SigninPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
]);
export default routes;
