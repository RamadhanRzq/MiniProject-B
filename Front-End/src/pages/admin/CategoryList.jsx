/* eslint-disable no-unused-vars */
import axios from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";

function CategoryList() {
  const fetchCategories = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const { data, error, mutate } = useSWR(
    "http://localhost:8080/api/category",
    fetchCategories
  );

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/category/${id}`)
      .then((res) => {
        mutate();
      })
      .catch((error) => {
        console.log("Error deleting product:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="grid grid-cols-1 items-center text-center justify-center">
        <div className="col-span-1">
          <div className="bg-white shadow-md p-6 rounded-md">
            <div className="mb-4 flex justify-between items-center">
              <h4 className="text-lg font-semibold">Categories List</h4>
              <div className="m-4">
                <Link
                  to="/add"
                  className="rounded-lg bg-sky-600 p-2 text-white self-center hover:bg-sky-700"
                  onClick={() => {}}
                >
                  Add Category
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Category Name</th>
                    <th className="px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((category) => (
                      <tr
                        key={category.id}
                        className="border-b border-gray-200"
                      >
                        <td className="py-2">{category.name}</td>
                        <td className="py-2">
                          <button
                            className="rounded-lg border border-white bg-red-600 p-2 text-white self-center hover:bg-red-700"
                            onClick={() => handleDelete(category.id)}
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
    </div>
  );
}

export default CategoryList;