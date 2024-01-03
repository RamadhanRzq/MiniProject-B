import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Update() {
  const schema = yup.object().shape({
    name: yup.string().required("Product Name is Required"),
    image: yup.string().required("Product Image is Required"),
    price: yup.string().required("Product Price is Required"),
    releaseDate: yup
      .string()
      .required("Product Release Date is Required")
      .matches(
        /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "Invalid Date Format (YYYY-MM-DD)"
      ),
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
      await axios.put(`http://localhost:3000/addproduct/${id}`, data);
      navigate("/list");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/addproduct/${id}`
        );
        const productData = response.data;
        setValue("name", productData.name);
        setValue("image", productData.image);
        setValue("price", productData.price);
        setValue("releaseDate", productData.releaseDate);
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
