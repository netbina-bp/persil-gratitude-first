import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import App from "./App.tsx";
import AdminUsersPage from "./pages/AdminUsersPage.tsx";
import { GoogleAnalytics } from "./components/analytics/GoogleAnalytics.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GoogleAnalytics />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<AdminUsersPage />} />
    </Routes>
  </BrowserRouter>
);
