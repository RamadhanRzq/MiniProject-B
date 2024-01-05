import { useEffect, useState } from "react";
import { listProducts } from "../service/ProductService";

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    listProducts()
      .then((products) => {
        // Handle data produk di sini
        console.log(products);
        setProducts(products); // Menyimpan data produk ke dalam state
      })
      .catch((error) => {
        // Handle kesalahan di sini
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="container">
      <h2>List Product</h2>
      <table>
        <thead>
          <tr>
            <th>image</th>
            <th>Name</th>
            <th>Description</th>
            <th>category</th>
            <th>price</th>
            <th>stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.image}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
