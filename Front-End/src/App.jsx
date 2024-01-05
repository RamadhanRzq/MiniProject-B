import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ListProduct from "./pages/ListProduct";
import CategoryForm from "./pages/admin/CategoryForm";
import CategoryList from "./pages/admin/CategoryList";
import ProductForm from "./pages/admin/ProductForm";
import ProductList from "./pages/admin/ProductList";
import Update from "./pages/admin/Update";

function App() {
  return (
    <div className="font-Jost">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/listProduct" element={<ListProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="/new" element={<ProductForm />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/add" element={<CategoryForm />} />
          <Route path="/categories" element={<CategoryList />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
