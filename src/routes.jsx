import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SigninPage from "./pages/SigninPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardPage from "@/pages/DashboardPage.jsx";

const routes = createBrowserRouter([
  { path: "/signin", element: <SigninPage /> },
  { path: "/signup", element: <SignupPage /> },
  { index: true, element: <DashboardPage /> },
]);
export default routes;
