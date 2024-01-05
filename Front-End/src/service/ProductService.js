import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/products";

export const listProducts = () =>
  axios
    .get(REST_API_BASE_URL)
    .then((response) => {
      // Handle respons sukses di sini
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      // Handle kesalahan di sini
      console.error("Error fetching products:", error);
      throw error; // (opsional) Terus lemparkan kesalahan untuk penanganan lebih lanjut
    });
