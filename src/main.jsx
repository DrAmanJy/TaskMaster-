import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./routes.jsx";
import { ThemeProvider } from "./components/theme-provider";
import TaskProvider from "./context/TaskContext";
import DashboardPage from "./pages/DashboardPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <ThemeProvider defaultTheme="system" storageKey="shadcn-ui-theme">
        <main className="min-h-screen bg-background text-foreground">
          <RouterProvider router={routes} />
        </main>
      </ThemeProvider>
    </TaskProvider>
  </StrictMode>,
);
