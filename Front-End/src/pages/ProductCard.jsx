/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import Card from "../components/Card";
import { addToCart } from "../store/reducers/cartSlice";

function ProductCard() {
  const dispatch = useDispatch();
  const [sortPrice, setSortPrice] = useState("");
  const [sortName, setSortName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);
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

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/filter?category=${categoryId}`,
          {
            headers: { "Cache-Control": "no-cache" },
            params: {
              sortByPrice: sortPrice,
              sortByName: sortName,
              search: filterName,
            },
          }
        );
        const data = response.data;

        if (data) {
          const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
          setOriginalProducts(sortedData);
          mutate(sortedData, false);
        } else {
          console.error("Data is undefined or null.");
        }
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    fetchProductsByCategory();
  };

  const fetchAllProducts = async () => {
    try {
      const allProductsData = await fetchData(
        "http://localhost:8080/api/products"
      );

      if (allProductsData) {
        setOriginalProducts(allProductsData);
        mutate(allProductsData, false);
      } else {
        console.error("Data is undefined or null.");
      }
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  const handleFilterNameChange = (event) => {
    const value = event.target.value;
    if (!value) {
      fetchAllProducts();
    }
    setFilterName(value);
  };

  const handleSortByHighestPrice = () => {
    setSortPrice("highest");
    setSortName("");
  };

  const handleSortByLowestPrice = () => {
    setSortPrice("lowest");
    setSortName("");
  };

  const handleSortByNameAscending = () => {
    setSortName("ascending");
    setSortPrice("");
  };

  const handleSortByNameDescending = () => {
    setSortName("descending");
    setSortPrice("");
  };

  const fetchData = async (url) => {
    const data = await axios
      .get(url, {
        headers: { "Cache-Control": "no-cache" },
        params: {
          sortByPrice: sortPrice,
          sortByName: sortName,
          search: filterName,
        },
      })
      .then((res) => res.data.data);
    return data;
  };

  const { data, isLoading, error, mutate } = useSWR(
    "http://localhost:8080/api/products",
    () => fetchData("http://localhost:8080/api/products"),
    {
      onSuccess: (data) => {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setOriginalProducts(sortedData);
        return sortedData;
      },
    }
  );

  useEffect(() => {
    if (data) {
      let sortedProducts = [...data];

      if (sortName === "ascending") {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortName === "descending") {
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (filterName) {
        sortedProducts = sortedProducts.filter((product) =>
          product.name.toLowerCase().includes(filterName.toLowerCase())
        );
      }

      if (sortPrice === "highest") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sortPrice === "lowest") {
        sortedProducts.sort((a, b) => a.price - b.price);
      }
      mutate(sortedProducts, false);
    }
  }, [filterName, sortPrice, sortName, mutate, data, originalProducts]);

  const onClickAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <section className="flex flex-col lg:flex-row">
      <div className="h-full p-4 left-0 w-1/5 bg-white flex flex-col items-center">
        <h1 className="text-xl font-semibold">Daftar Produk</h1>
        <div
          className="hover:text-lime-700 hover:font-bold py-2 px-4 mt-10 cursor-pointer"
          onClick={() => {
            fetchAllProducts();
            setSelectedCategory(null);
          }}
        >
          All Product
        </div>
        {categories.map((category, index) => (
          <div
            key={category.id}
            value={category.id}
            className={`hover:text-lime-700 rounded-lg hover:font-bold py-2 px-4 cursor-pointer mt-4${
              index < categories.length
                ? ` ${
                    selectedCategory === category.id
                      ? "bg-lime-200 text-black font-bold"
                      : ""
                  }`
                : ""
            }`}
            onClick={() => {
              handleCategoryChange(category.id);
              setSelectedCategory(category.id);
            }}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="lg:w-3/4">
        <div className="mt-4 flex justify-between items-center">
          <form>
            <div className="flex">
              <select
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                onChange={(e) => {
                  if (e.target.value === "Sort By Highest Price")
                    handleSortByHighestPrice();
                  else if (e.target.value === "Sort By Lowest Price")
                    handleSortByLowestPrice();
                  else if (e.target.value === "Sort By Name A-Z")
                    handleSortByNameAscending();
                  else if (e.target.value === "Sort By Name Z-A")
                    handleSortByNameDescending();
                }}
              >
                <option
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  value=""
                >
                  Urutkan
                </option>
                <option
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  value="Sort By Highest Price"
                >
                  Urutkan Berdasarkan Harga Tertinggi
                </option>
                <option
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  value="Sort By Lowest Price"
                >
                  Urutkan Berdasarkan Harga Terendah
                </option>
                <option
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  value="Sort By Name A-Z"
                >
                  Urutkan Berdasarkan Nama A-Z
                </option>
                <option
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  value="Sort By Name Z-A"
                >
                  Urutkan Berdasarkan Nama Z-A
                </option>
              </select>

              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos, Design Templates..."
                  value={filterName}
                  onChange={handleFilterNameChange}
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <IoSearch size={25} />
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>

          {/* <div className="flex justify-end">
            <div>
              <select
                placeholder="Urutkan berdasarkan:"
                className="p-2 pe-4 w-full rounded-lg border border-gray-300 text-gray-700 sm:text-sm"
                id="sorting"
                onChange={(e) => {
                  if (e.target.value === "Sort By Highest Price")
                    handleSortByHighestPrice();
                  else if (e.target.value === "Sort By Lowest Price")
                    handleSortByLowestPrice();
                  else if (e.target.value === "Sort By Name A-Z")
                    handleSortByNameAscending();
                  else if (e.target.value === "Sort By Name Z-A")
                    handleSortByNameDescending();
                }}
              >
                <option value="">-Urutkan-</option>
                <option value="Sort By Highest Price">
                  Urutkan Berdasarkan Harga Tertinggi
                </option>
                <option value="Sort By Lowest Price">
                  Urutkan Berdasarkan Harga Terendah
                </option>
                <option value="Sort By Name A-Z">
                  Urutkan Berdasarkan Nama A-Z
                </option>
                <option value="Sort By Name Z-A">
                  Urutkan Berdasarkan Nama Z-A
                </option>
              </select>
            </div>
            <div className="ml-4 flex items-center border border-gray-300 rounded-md">
              <input
                type="text"
                placeholder="Cari Produk..."
                value={filterName}
                onChange={handleFilterNameChange}
                className="flex-1 p-2 border-none focus:outline-none"
              />
              <div className="ml-2 text-gray-400">
                <IoSearch size={25} />
              </div>
            </div>
          </div> */}
        </div>
        <div className="flex justify-center">
          {isLoading ? (
            <BeatLoader color="#38BDF8" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data &&
                data.map(
                  ({ id, name, description, image, price, category }) => (
                    <Card
                      key={id}
                      name={name}
                      description={description}
                      price={price}
                      image={image}
                      onClick={() =>
                        onClickAddToCart({ id, name, image, price })
                      }
                    />
                  )
                )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
