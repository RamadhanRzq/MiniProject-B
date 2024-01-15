import axios from "axios";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import useSWR from "swr";
import CategoryForm from "./CategoryForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import PromptDelete from "../components/PromptDelete";

function CategoryList() {
  const [isDeletePromptVisible, setIsDeletePromptVisible] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const handleDeleteModal = (id) => {
    setDeleteCategoryId(id);
    setIsDeletePromptVisible(true);
  };

  const handleConfirmDelete = () => {
    if (deleteCategoryId) {
      handleDelete(deleteCategoryId);
      setIsDeletePromptVisible(false);
    }
  };

  const closePrompt = () => {
    setIsDeletePromptVisible(false);
  };

  const fetchCategories = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const { data, mutate } = useSWR(
    "http://localhost:8080/api/category",
    fetchCategories
  );

  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/category/${id}`)
      .then(() => {
        mutate();
      })
      .catch((error) => {
        console.log("Error deleting category:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="grid grid-cols-1 items-center text-center justify-center">
        <div className="col-span-1">
          <div className="bg-white shadow-md p-6 rounded-md">
            <div className="mb-4 flex justify-between items-center">
              <h4 className="text-lg font-semibold">Daftar Kategori</h4>
              <div className="m-4 flex items-center">
                <button
                  className="flex items-center p-2 rounded-lg bg-muda text-white border-none hover:bg-hijau "
                  onClick={() => setShowForm(true)}
                >
                  Tambah Kategori
                  <FaPlusCircle className="ml-2" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Nama Kategori</th>
                    <th className="px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((category) => (
                      <tr
                        key={category.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-2">{category.name}</td>
                        <td className="py-2">
                          <button
                            className="rounded-lg border border-white p-2 text-red-700 hover:bg-gray-300"
                            onClick={() => handleDeleteModal(category.id)}
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

      {showForm && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md w-[400px] max-w-full">
            <CategoryForm setShowForm={setShowForm} mutateCategories={mutate} />
          </div>
        </div>
      )}
      {isDeletePromptVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md shadow-md">
            <PromptDelete
              title="Apakah anda yakin akan menghapus kategori ini?"
              onCancel={closePrompt}
              onConfirm={handleConfirmDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryList;
