import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import RevenuePage from "../pages/RevenuePage";
import CustomersPage from "../pages/CustomersPage";
import ProductsPage from "../pages/ProductsPage";
import CategoriesPage from "../pages/CategoriesPage";
function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/revenue"
          element={<RevenuePage />}
        />
        <Route
          path="/customers"
          element={<CustomersPage />}
        />
        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/categories"
          element={<CategoriesPage />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default AppRoutes;