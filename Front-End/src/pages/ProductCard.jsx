/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import useSWR, { mutate } from "swr";
import Card from "../components/Card";
import { addToCart } from "../store/reducers/cartSlice";
import { IoSearch } from "react-icons/io5";

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
      let sortedProducts = [...originalProducts];

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
    <section className="flex flex-col justify-center">
      <div className="mt-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Daftar Produk</h1>
        <div className="flex justify-end">
          <div>
            <select
              placeholder="Urutkan berdasarkan:"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
              id="sorting"
              onChange={(e) => {
                if (e.target.value === "Sort By Highest Price") {
                  handleSortByHighestPrice();
                } else if (e.target.value === "Sort By Lowest Price") {
                  handleSortByLowestPrice();
                } else if (e.target.value === "Sort By Name A-Z") {
                  handleSortByNameAscending();
                } else if (e.target.value === "Sort By Name Z-A") {
                  handleSortByNameDescending();
                }
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
          <div className="p-2 ml-4 flex items-center border-[1px] border-gray-300 rounded-md">
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
        </div>
      </div>
      <div className="flex justify-center">
        {isLoading ? (
          <BeatLoader color="#38BDF8" />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {data &&
              data.map(({ id, name, description, image, price }) => (
                <Card
                  key={id}
                  name={name}
                  description={description}
                  price={price}
                  image={image}
                  onClick={() => {
                    onClickAddToCart({ id, name, image, price });
                  }}
                />
              ))}
          </div>
        )}
      </div>
      <div className="relative flex justify-center">
        <div className="flex justify-center fixed mt-10 ml-4 bottom-0 border-t-2 border-black pl-4 bg-white">
          <div
            className={`hover:text-lime-700 hover:font-bold py-2 px-4 mt-2 m-4 cursor-pointer`}
            onClick={() => {
              // Clear selected category
              fetchAllProducts(); // Fetch all products
            }}
          >
            All Product
          </div>
          {categories.map((category, index) => (
            <div
              key={category.id}
              value={category.id}
              className={`py-2 px-4 ${
                index < categories.length
                  ? "hover:text-lime-700 hover:font-bold py-2 px-4 border-l-2 border-black mt-2 m-4 cursor-pointer"
                  : ""
              } cursor-pointer`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
