/* eslint-disable no-unused-vars */
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
          <h2>New Product</h2>
          <hr />
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit(onSubmitForm)}
            encType="multipart/form-data"
          >
            <div>
              <label htmlFor="name">Product Name</label>
              <input
                placeholder="Product Name"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("name")}
                id="name"
              />

              <p className="error text-red-600">{errors.name?.message}</p>
            </div>

            <div>
              <label htmlFor="name">Product Image</label>
              <input
                placeholder="Product Image"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("image")}
                id="name"
              />

              <p className="error text-red-600">{errors.image?.message}</p>
            </div>

            {/* <div>
              <label htmlFor="image">Product Image</label>
              <input
                name="image"
                type="file"
                placeholder="Product Image"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("image")}
                id="image"
              />

              <p className="error text-red-600">{errors.image?.message}</p>
            </div> */}

            <div>
              <label htmlFor="price">Product Price</label>
              <input
                placeholder="Product Price"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("price")}
                id="price"
              />
              <p className="error text-red-600">{errors.price?.message}</p>
            </div>

            <div>
              <label htmlFor="stock">Product Stock</label>
              <input
                placeholder="Product Stock"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("stock")}
                id="stock"
              />
              <p className="error text-red-600">{errors.stock?.message}</p>
            </div>

            <div>
              <label htmlFor="categoryId">Select Category:</label>
              <select
                id="categoryId"
                value={selectedCategory}
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("categoryId")}
                onChange={handleCategoryChange}
              >
                <option value="">Select Categories Here</option>
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

            <button
              className="rounded-lg bg-sky-400 p-2 text-white self-center w-full border border-white"
              type="submit"
            >
              Add New Product
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4">
        <Link
          to="/categories"
          className="text-sky-600 hover:underline cursor-pointer"
        >
          Back to Product List
        </Link>
      </div>
    </section>
  );
}

export default ProductForm;
