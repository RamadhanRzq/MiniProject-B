/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

function Update({ setIsFormModalVisible }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/category")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setCategories(data.data);
        } else {
          console.error("Failed to fetch categories:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Product Name is Required"),
    image: yup.string().required("Product Image is Required"),
    price: yup.string().required("Product Price is Required"),
    stock: yup.string().required("Product Stock is Required"),
    categoryId: yup.string().required("Product Category ID is Required"),
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = async (data) => {
    try {
      await axios.patch(`http://localhost:8080/api/products/${id}`, data, {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      });
      alert("Berhasil Update Produk");
      navigate("/list");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${id}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const productData = response.data.data;
        console.log(productData);
        setValue("name", productData.name);
        setValue("image", productData.image);
        setValue("price", productData.price);
        setValue("stock", productData.stock);
        setValue("categoryId", productData.categoryId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, setValue]);

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
    <>
      <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center overflow-auto">
        <div className="bg-white px-8 py-4 rounded-md w-[400px] max-w-full h-auto">
          <h2 className="font-bold text-2xl">Update Produk Baru</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmitForm)}
            encType="multipart/form-data"
          >
            {/* Nama Produk */}
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nama Produk
              </label>
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Nama Produk"
                    {...register("name")}
                  />
                </div>
                <p className="error text-red-600">{errors.name?.message}</p>
              </div>
            </div>

            {/* Gambar Produk */}
            {/* <label htmlFor="image">Gambar Produk</label> */}
            <input
              type="hidden"
              onChange={handleFileChange}
              className=" rounded-lg border-[1px] border-gray-200 p-4 text-sm focus:outline-sky-200"
            />
            {/* {imgUrl && <img src={imgUrl} alt="" className="w-full" />} */}

            <div className="sm:col-span-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-900"
              >
                Harga Produk
              </label>
              <div className="mt-1">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    autoComplete="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Harga Produk"
                    {...register("price")}
                  />
                </div>
                <p className="error text-red-600">{errors.price?.message}</p>
              </div>
            </div>

            {/* Stok Produk */}
            <div className="sm:col-span-4">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stok Produk
              </label>
              <div className="mt-1">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="stock"
                    id="stock"
                    autoComplete="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Stok Produk"
                    {...register("stock")}
                  />
                </div>
                <p className="error text-red-600">{errors.stock?.message}</p>
              </div>
            </div>

            {/* Kategori Produk */}
            <div className="sm:col-span-3">
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pilih Kategori
              </label>
              <div className="mt-1">
                <select
                  id="categoryId"
                  value={selectedCategory}
                  name="categoryId"
                  autoComplete="categoryId"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                {selectedCategory && (
                  <p>
                    Kategori yang Dipilih:{" "}
                    {
                      categories.find(
                        (category) =>
                          category.id === parseInt(selectedCategory, 10)
                      ).name
                    }
                  </p>
                )}
              </div>
            </div>

            {/* Tombol Simpan dan Batal */}
            <div className="mt-1 flex items-center justify-between gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Simpan
              </button>
            </div>

            {/* Kembali ke Daftar Produk Link */}
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
      </div>
    </>
  );
}

export default Update;
