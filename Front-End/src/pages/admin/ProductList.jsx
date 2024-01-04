import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { toRupiah } from "../../utils/formatter";

function ProductList() {
  const fetchData = async (url) => {
    const data = await axios
      .get(url, { headers: { "Cache-Control": "no-cache" } })
      .then((res) => res.data.data);
    return data;
  };

  const { data, isLoading, error, mutate } = useSWR(
    "http://localhost:8080/api/products",
    () => fetchData(`http://localhost:8080/api/products`)
  );

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        mutate();
      })
      .catch((error) => {
        console.log("Error deleting product:", error);
      });
  };

  return (
    <div className="container mt-5">
      {isLoading ? (
        <BeatLoader color="#38BDF8" />
      ) : (
        <div className="grid grid-cols-1 items-center text-center justify-center">
          <div className="col-span-1">
            <div className="bg-white shadow-md p-6 rounded-md">
              <div className="mb-4 flex justify-between items-center">
                <h4 className="text-lg font-semibold">Products List</h4>
                <div className="m-4">
                  <Link
                    to="/new"
                    className="rounded-lg bg-sky-600 p-2 text-white self-center hover:bg-sky-700"
                  >
                    Add Product
                  </Link>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Product Name</th>
                      <th className="px-4 py-2">Product Image</th>
                      <th className="px-4 py-2">Product Price</th>
                      <th className="px-4 py-2">Product Description</th>
                      <th className="px-4 py-2">Product Stock</th>
                      <th className="px-4 py-2">Product Category</th>
                      <th className="px-4 py-2">Update</th>
                      <th className="px-4 py-2">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-200"
                        >
                          <td className="py-2">{product.name}</td>
                          <td className="py-2">
                            <div className="flex justify-center items-center">
                              <img
                                src={product.image}
                                alt={`Product ${product.id} Image`}
                                className="w-28 h-auto object-center"
                              />
                            </div>
                          </td>
                          <td className="py-2">{toRupiah(product.price)}</td>
                          <td className="py-2">{product.description}</td>
                          <td className="py-2">{product.stock}</td>
                          <td className="py-2">{product.category}</td>
                          <td className="py-2">
                            <Link
                              className="rounded-lg bg-lime-600 p-2 text-white self-center hover:bg-lime-700"
                              to={`/update/${product.id}`}
                            >
                              Update
                            </Link>
                          </td>
                          <td className="py-2">
                            <button
                              className="rounded-lg border border-white bg-red-600 p-2 text-white self-center hover:bg-red-700"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
