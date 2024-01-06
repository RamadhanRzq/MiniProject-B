import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

function CategoryForm() {
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

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
      alert("Successfully added a new category!");
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
    <section className="px-20 ml-96">
      <h1 className="text-3xl font-semibold">Add Category Form</h1>
      <div className="grid grid-cols-2 gap-20 mt-8">
        <div className="w-[500px]">
          <h2>New Category</h2>
          <hr />
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <div>
              <label htmlFor="name">Category Name</label>
              <input
                placeholder="Category Name"
                className="w-full rounded-lg border-[1px] border-gray-200 p-4 pe-12 text-sm focus:outline-sky-200"
                {...register("name")}
                id="name"
              />
              <p className="error text-red-600">{errors.name?.message}</p>
            </div>

            <button
              className="rounded-lg bg-sky-400 p-2 text-white self-center w-full border border-white"
              type="submit"
            >
              Add New Category
            </button>
          </form>

          <div className="mt-4">
            <Link
              to="/categories"
              className="text-sky-600 hover:underline cursor-pointer"
            >
              Back to Categories List
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryForm;