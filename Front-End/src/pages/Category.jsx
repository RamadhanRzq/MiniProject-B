import { useEffect, useState } from "react";

function Category() {
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

  return (
    <div className="px-20 ml-96 flex">
      <div className="flex border-black mt-2">
        {categories.map((category, index) => (
          <div
            key={category.id}
            value={category.id}
            className={`py-2 px-4 ${
              index < categories.length ? "border-2 border-black mt-2 m-4" : ""
            }`}
            onClick={handleCategoryChange}
          >
            {category.name}
          </div>
        ))}
        {selectedCategory && (
          <p className="flex">
            {
              categories.find(
                (category) => category.id === parseInt(selectedCategory, 10)
              ).name
            }
          </p>
        )}
      </div>
    </div>
  );
}

export default Category;
