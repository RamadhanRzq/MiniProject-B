/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import PopUp from "./PopUp";

function ProductForm({ setIsFormModalVisible, mutate }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [isPopUpSuccessOpen, setPopUpSuccessOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/category")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setCategories(data.data);
        } else {
          console.error("Gagal mengambil kategori:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error mengambil kategori:", error);
      });
  }, []);

  const openPopUp = () => {
    setPopUpSuccessOpen(true);
  };

  const closePopUp = () => {
    setPopUpSuccessOpen(false);
    setIsFormModalVisible(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Nama Produk Wajib Diisi"),
    price: yup.string().required("Harga Produk Wajib Diisi"),
    stock: yup.string().required("Stok Produk Wajib Diisi"),
    categoryId: yup.string().required("ID Kategori Produk Wajib Diisi"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data) => {
    const payload = {
      name: data.name,
      image: imgUrl,
      price: data.price,
      description: data.description,
      stock: data.stock,
      categoryId: data.categoryId,
    };

    axios
      .post("http://localhost:8080/api/products", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        openPopUp();
        reset();
        mutate();
      })
      .catch((error) => {
        if (error.response) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert("Error saat mengambil data.");
        }

        reset();
      });
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:8080/api/products/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload berhasil:", response.data);
      setImgUrl(response.data);
    } catch (error) {
      console.error("Error mengunggah file:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center overflow-auto">
      <div className="bg-white px-8 py-4 rounded-lg w-[400px] max-w-full h-auto">
        <h2 className="font-bold text-2xl">Produk Baru</h2>
        <hr />
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          {/* Nama Produk */}
          <div className="sm:col-span-4">
            <label htmlFor="name" className="text-base">
              Nama Produk
            </label>
            <div className="">
              <div className="flex ">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="flex-1 border-2 bg-transparent py-2 pl-2 placeholder:text-gray-400 rounded-lg border-gray-300"
                  placeholder="Nama Produk"
                  {...register("name")}
                />
              </div>
              <p className="error text-red-600">{errors.name?.message}</p>
            </div>
          </div>

          {/* Gambar Produk */}
          <div>
            <label htmlFor="image">Gambar Produk</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="rounded-lg border-2 border-gray-300 p-4 text-sm focus:outline-sky-200"
            />
          </div>
          <div className="flex justify-center">
            {imgUrl && <img src={imgUrl} alt="" className="w-1/2" />}
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="price" className="text-base">
              Harga Produk
            </label>
            <div className="mt-1">
              <div className="flex ">
                <input
                  type="text"
                  name="price"
                  id="price"
                  autoComplete="price"
                  className="flex-1 border-2 bg-transparent py-2 pl-2 placeholder:text-gray-400 rounded-lg border-gray-300"
                  placeholder="Harga Produk"
                  {...register("price")}
                />
              </div>
              <p className="error text-red-600">{errors.price?.message}</p>
            </div>
          </div>

          {/* Stok Produk */}
          <div className="sm:col-span-4">
            <label htmlFor="stock" className="text-base">
              Stok Produk
            </label>
            <div className="mt-1">
              <div className="flex">
                <input
                  type="text"
                  name="stock"
                  id="stock"
                  autoComplete="stock"
                  className="flex-1 border-2 bg-transparent py-2 pl-2 placeholder:text-gray-400 rounded-lg  border-gray-300"
                  placeholder="Stok Produk"
                  {...register("stock")}
                />
              </div>
              <p className="error text-red-600">{errors.stock?.message}</p>
            </div>
          </div>

          {/* Kategori Produk */}
          <div className="sm:col-span-3">
            <label htmlFor="categoryId" className="text-base">
              Kategori Produk
            </label>
            <div className="mt-1">
              <select
                id="categoryId"
                value={selectedCategory}
                name="categoryId"
                autoComplete="categoryId"
                className="w-full rounded-lg border-2 py-2 border-gray-300"
                {...register("categoryId")}
                onChange={handleCategoryChange}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tombol Simpan dan Batal */}
          <div className="mt-1 flex items-center justify-between gap-x-6">
            <button
              type="button"
              className="rounded-lg bg-gray-300 text-muda px-3 py-2 text-base border-none hover:text-white hover:bg-muda"
              onClick={() => setIsFormModalVisible(false)}
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg bg-muda px-3 py-2 text-base border-none text-white hover:bg-hijau "
            >
              Simpan
            </button>
          </div>

          {/* Kembali ke Daftar Produk */}
          <div className="mt-1">
            <Link
              onClick={() => setIsFormModalVisible(false)}
              to="/list"
              className="text-sky-600 hover:underline cursor-pointer"
            >
              Kembali ke Daftar Produk
            </Link>
          </div>
        </form>
      </div>
      {isPopUpSuccessOpen && (
        <PopUp
          onCancel={closePopUp}
          title="Produk Baru Berhasil Ditambahkan."
        />
      )}
    </div>
  );
}

export default ProductForm;
