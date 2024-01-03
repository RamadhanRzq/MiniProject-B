import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function ProductForm() {
  const schema = yup.object().shape({
    name: yup.string().required("Product Name is Required"),
    image: yup.string().required("Product Image is Required"),
    price: yup.string().required("Product Price is Required"),
    releaseDate: yup
      .string()
      .required("Product Release Date is required")
      .matches(
        /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "Invalid Date Format (YYYY-MM-DD)"
      ),
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
      releaseDate: data.releaseDate,
    };

    axios
      .post("http://localhost:3000/addproduct", payload)
      .then(() => {
        alert("Successfully made a new product!");
        reset();
        axios.get("http://localhost:3000/addproduct").then((res) => {
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
      <h1 className="text-3xl font-semibold">Add Product Form</h1>
      <div className="grid grid-cols-2 gap-20 mt-8">
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
              <label htmlFor="image">Product Image</label>
              <input
                placeholder="Product Image"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("image")}
                id="image"
              />

              <p className="error text-red-600">{errors.image?.message}</p>
            </div>

            {/* <div>
              <label htmlFor="image">Product Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setValue("image", file);
                }}
                onBlur={handleBlur}
                id="image"
              />
              <p className="error">{errors.image?.message}</p>
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
              <label htmlFor="releaseDate">Product Release Date</label>
              <input
                placeholder="Product Release Date"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("releaseDate")}
                id="releaseDate"
              />
              <p className="error text-red-600">
                {errors.releaseDate?.message}
              </p>
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
    </section>
  );
}

export default ProductForm;
