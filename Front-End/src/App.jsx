import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import ProductCard from "./pages/ProductCard";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import CategoryForm from "./pages/CategoryForm";
import CategoryList from "./pages/CategoryList";
import ProductForm from "./pages/ProductForm";
import ProductList from "./pages/ProductList";
import Update from "./pages/Update";

function App() {
  return (
    <div className="font-Jost">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<ProductCard />} />
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
