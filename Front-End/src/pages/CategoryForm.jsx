import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import PopUp from "./PopUp";

function CategoryForm({ setIsFormModalVisible, mutate }) {
  const [categories, setCategories] = useState([]);
  const [isPopUpSuccessOpen, setPopUpSuccessOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const openPopUp = () => {
    setPopUpSuccessOpen(true);
  };

  const closePopUp = () => {
    setPopUpSuccessOpen(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/category");
      if (response.status === 200) {
        setCategories(response.data.data);
      } else {
        console.error("Failed to fetch categories:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const schema = yup.object().shape({
    name: yup.string().required("Category Name is Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = async (data) => {
    try {
      await axios.post("http://localhost:8080/api/category", {
        name: data.name,
      });
      openPopUp();
      reset();
      fetchCategories();
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An error occurred while processing your request.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center overflow-auto">
      <div className="bg-white px-8 py-4 rounded-md max-w-full">
        <div className="w-[500px]">
          <h2>Kategori Baru</h2>
          <hr />
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <div>
              <label htmlFor="name">Nama Kategori</label>
              <input
                placeholder="Nama Kategori"
                className="w-full rounded-lg border-2 border-gray-200 py-2 pl-2 text-base"
                {...register("name")}
                id="name"
              />
              <p className="error text-red-600">{errors.name?.message}</p>
            </div>

            <button
              className="rounded-lg bg-muda p-2 text-white self-center w-full border-none hover:bg-hijau"
              type="submit"
            >
              Tambah Kategori
            </button>
          </form>

          <div className="mt-4">
            <Link
              onClick={() => setIsFormModalVisible(false)}
              to="/categories"
              className="text-sky-600 hover:underline cursor-pointer"
            >
              Kembali ke Daftar Kategori
            </Link>
          </div>
        </div>
      </div>
      {isPopUpSuccessOpen && (
        <PopUp onCancel={closePopUp} title="Kategori Berhasil Ditambahkan." />
      )}
    </div>
  );
}

export default CategoryForm;
