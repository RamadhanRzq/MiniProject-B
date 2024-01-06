/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

function Update() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchData = async (url) => {
    const data = await axios
      .get(url, { headers: { "Cache-Control": "no-cache" } })
      .then((res) => res.data.data);
    return data;
  };

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
    description: yup.string().required("Product Description is Required"),
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
        setValue("name", productData.name);
        setValue("image", productData.image);
        setValue("price", productData.price);
        setValue("description", productData.description);
        setValue("stock", productData.stock);
        setValue("categoryId", productData.categoryId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, setValue]);

  return (
    <section className="px-20 ml-96">
      <h1 className="text-3xl font-semibold">Update Product Form</h1>
      <div className="grid grid-cols-2 gap-20 mt-8">
        <div className="w-[500px]">
          <h2>New Product</h2>
          <hr />
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit(onSubmitForm)}
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
              <label htmlFor="image">Product Image</label>
              <input
                placeholder="Product Image"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("image")}
                id="image"
              />
              <p className="error text-red-600">{errors.image?.message}</p>
            </div>

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
              <label htmlFor="description">Product Description</label>
              <input
                placeholder="Product Description"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("description")}
                id="description"
              />
              <p className="error text-red-600">
                {errors.description?.message}
              </p>
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
              className="border border-white rounded-lg bg-sky-400 p-2 text-white self-center w-full"
              type="submit"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Update;
