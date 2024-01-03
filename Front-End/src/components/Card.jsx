import {
  IconShoppingCart,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import { toRupiah } from "../utils/formatter";

function Card(props) {
  return (
    <div className="grid gap-6 pt-4 ml-14 mr-14">
      {props.products.map((product) => (
        <Link
          key={product.id}
          to={`/detail/${product.id}`} // Tautan ke halaman detail produk
          className="border shadow-lg rounded-lg hover:scale-105"
        >
          <div
            key={product.id}
            className="border shadow-lg rounded-lg hover:scale-105"
          >
            <div className="relative">
              <h5 className="absolute top-3 left-3 text-white text-xs font-semibold uppercase bg-green-600 px-2 py-1 rounded">
                {product.description}
              </h5>
            </div>
            <img
              src={product.image}
              alt={product.name}
              className="w-3/2 h-3/4 object-cover rounded-t-lg"
            />
            <div className="flex justify-between items-center text-center px-2 py-4 mr-5 ml-5">
              <div className="flex">
                <IconStarFilled className="text-yellow-500" />
                <IconStarFilled className="text-yellow-500" />
                <IconStarFilled className="text-yellow-500" />
                <IconStarFilled className="text-yellow-500" />
                <IconStarHalfFilled className="text-yellow-500" />
              </div>
              <IconShoppingCart />
            </div>
            <div className="justify-center items-center text-center px-2 py-4">
              <p className="font-bold">{product.name}</p>
              <p className="bg-primary text-white p-1 rounded-full m-3">
                {toRupiah(product.price)}
              </p>
              <p>Release Date : {product.releaseDate}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Card;
