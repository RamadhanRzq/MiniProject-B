import { MdAddPhotoAlternate } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

function ProductForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const [products, setProducts] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    handleBlur,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data) => {
    console.log(data);

    const payload = {
      name: data.name,
      image: data.image,
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
        alert("Successfully made a new product!");
        reset();
        axios.get("http://localhost:8080/api/products").then((res) => {
          setProducts(res.data.addproduct);
        });
      })
      .catch((error) => {
        if (error.response) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert("An error occurred while processing your request.");
        }

        reset();
      });
  };

  return (
    <section className="px-20 ml-96">
      <div className="grid grid-cols-2 gap-20 mt-4">
        <div className="w-[500px]">
          <h2 className="font-bold text-2xl">Produk Baru</h2>
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit(onSubmitForm)}
            encType="multipart/form-data"
          >
            {/* Product Name */}
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nama Produk
              </label>
              <div className="mt-2">
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

            {/* Product Image */}
            <div className="col-span-full">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gambar Produk
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <MdAddPhotoAlternate
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        {...register("image")}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <p className="error text-red-600">{errors.image?.message}</p>
            </div>

            {/* Product Price */}
            <div className="sm:col-span-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Harga Produk
              </label>
              <div className="mt-2">
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

            {/* Product Stock */}
            <div className="sm:col-span-4">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stok Produk
              </label>
              <div className="mt-2">
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

            {/* Product Category */}
            <div className="sm:col-span-3">
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pilih Kategori
              </label>
              <div className="mt-2">
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
                    Selected Category:{" "}
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

            {/* Save and Cancel Buttons */}
            <div className="mt-6 flex items-center justify-start gap-x-6">
              <button
                type="button"
                className="rounded-md bg-white text-indigo-600 px-3 py-2 text-sm font-semibold shadow-sm hover:text-white hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Simpan
              </button>
            </div>

            {/* Back to Product List Link */}
            <div className="mt-4">
              <Link
                to="/categories"
                className="text-sky-600 hover:underline cursor-pointer"
              >
                Kembali ke Daftar Produk
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ProductForm;
