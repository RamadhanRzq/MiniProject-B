/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { toRupiah } from "../utils/formatter";
import ProductForm from "./ProductForm";
import Update from "./Update";

function ProductList() {
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const { data, isLoading, error, mutate } = useSWR(
    "http://localhost:8080/api/products",
    () => fetchData("http://localhost:8080/api/products")
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

  const fetchData = async (url) => {
    const data = await axios
      .get(url, { headers: { "Cache-Control": "no-cache" } })
      .then((res) => res.data.data);
    return data;
  };

  return (
    <div className="container mt-5">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <BeatLoader color="#38BDF8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 items-center text-center justify-center">
          <div className="col-span-1">
            <div className="bg-white shadow-md p-6 rounded-md">
              <div className="mb-4 flex justify-between items-center">
                <h4 className="text-lg font-semibold">Daftar Produk</h4>
                <div className="m-4">
                  <button
                    className="flex items-center p-2 rounded-lg border-none bg-muda text-white hover:bg-hijau "
                    onClick={() => setIsFormModalVisible(true)}
                  >
                    Tambah Produk
                    <FaPlusCircle className="ml-2" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  {/* ... (Table Header) */}
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Nama</th>
                      <th className="px-4 py-2">Gambar</th>
                      <th className="px-4 py-2">Harga</th>
                      <th className="px-4 py-2">Stok</th>
                      <th className="px-4 py-2">Kategori</th>
                      <th className="px-4 py-2">Aksi</th>
                      {/* <th className="px-4 py-2">Delete</th> */}
                    </tr>
                  </thead>
                  {/* ... (Table Body) */}
                  <tbody>
                    {data &&
                      data.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-200"
                        >
                          {/* ... (Table Data) */}
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
                          <td className="py-2">{product.stock}</td>
                          <td className="py-2">{product.category}</td>
                          <td className="py-14 flex items-center justify-center">
                            <Link
                              to={`/update/${product.id}`}
                              className="rounded-lg border border-white p-2 text-blue-600 mr-3 hover:bg-gray-300"
                            >
                              <LuPencilLine className="h-4 w-4" />
                            </Link>
                            <button
                              className="rounded-lg border border-white p-2 text-red-700 hover:bg-gray-300"
                              onClick={() => handleDelete(product.id)}
                            >
                              <RiDeleteBin6Line />
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
      {/* Modal formulir tambah produk */}
      {isFormModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md shadow-md">
            <ProductForm
              setIsFormModalVisible={setIsFormModalVisible}
              mutate={mutate}
            />
          </div>
        </div>
      )}
      {/* Modal formulir update produk */}
      {isUpdateModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md shadow-md">
            <Update setIsFormModalVisible={setIsUpdateModalVisible} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
