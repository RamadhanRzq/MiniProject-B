/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { toRupiah } from "../utils/formatter";
import ProductForm from "./ProductForm";
import Update from "./Update";
import PromptDelete from "../components/PromptDelete";

function ProductList() {
  const [filterName, setFilterName] = useState("");
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeletePromptVisible, setIsDeletePromptVisible] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const handleDelete = async (id) => {
    axios
      .delete(`http://localhost:8080/api/products/${id}`)
      .then(() => {
        mutate();
      })
      .catch((error) => {
        console.log("Gagal menghapus produk:", error);
      });
  };

  const handleDeleteModal = (id) => {
    setDeleteProductId(id);
    setIsDeletePromptVisible(true);
  };

  const handleConfirmDelete = () => {
    if (deleteProductId) {
      handleDelete(deleteProductId);
      setIsDeletePromptVisible(false);
    }
  };

  const closePrompt = () => {
    setIsDeletePromptVisible(false);
  };

  const fetchAllProducts = async () => {
    try {
      const allProductsData = await fetchData(
        "http://localhost:8080/api/products"
      );

      if (allProductsData) {
        mutate(allProductsData, false);
      } else {
        console.error("Data tidak ditemukan.");
      }
    } catch (error) {
      console.error("Pengambilan data produk error:", error);
    }
  };

  const handleFilterNameChange = (event) => {
    const value = event.target.value;
    if (!value) {
      fetchAllProducts();
    }
    setFilterName(value);
  };

  const fetchData = async (url) => {
    const data = await axios
      .get(url, {
        headers: { "Cache-Control": "no-cache" },
      })
      .then((res) => res.data.data);
    return data;
  };

  const { data, isLoading, mutate } = useSWR(
    "http://localhost:8080/api/products",
    () => fetchData("http://localhost:8080/api/products"),
    {
      onSuccess: (data) => {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        return sortedData;
      },
    }
  );

  useEffect(() => {
    if (data) {
      let sortedProducts = [...data];

      if (filterName) {
        sortedProducts = sortedProducts.filter((product) =>
          product.name.toLowerCase().includes(filterName.toLowerCase())
        );
      }
      mutate(sortedProducts, false);
    }
  }, [filterName, mutate, data]);

  return (
    <div className="px-24 mt-10">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <BeatLoader color="#38BDF8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 items-center text-center justify-center">
          <div className="col-span-1">
            <div className="bg-white shadow-md p-6 rounded-md">
              <div className="mb-4 flex justify-between items-center">
                <div className="ml-4 flex items-center border border-gray-300 rounded-md bg-gray-100">
                  <input
                    type="text"
                    placeholder="Cari Produk..."
                    value={filterName}
                    onChange={handleFilterNameChange}
                    className="flex-1 p-2 border-none focus:outline-none"
                  />
                  <div className="ml-2 text-gray-400 mr-2">
                    <IoSearch size={25} />
                  </div>
                </div>
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
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Nama</th>
                      <th className="px-4 py-2">Gambar</th>
                      <th className="px-4 py-2">Harga</th>
                      <th className="px-4 py-2">Stok</th>
                      <th className="px-4 py-2">Kategori</th>
                      <th className="px-4 py-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-2">{product.name}</td>
                          <td className="py-2">
                            <div className="flex justify-center items-center">
                              <img
                                src={product.image}
                                alt={`Product ${product.id} Image`}
                                className="w-28 h-26 object-cover"
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
                              onClick={() => handleDeleteModal(product.id)}
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
      {isUpdateModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md shadow-md">
            <Update setIsFormModalVisible={setIsUpdateModalVisible} />
          </div>
        </div>
      )}
      {isDeletePromptVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md shadow-md">
            <PromptDelete
              title="Apakah anda yakin akan menghapus data produk ini?"
              onCancel={closePrompt}
              onConfirm={handleConfirmDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
