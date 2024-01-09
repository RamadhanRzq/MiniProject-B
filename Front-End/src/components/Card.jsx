/* eslint-disable react/prop-types */

import { toRupiah } from "../utils/formatter";

function Card(props) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-2 mt-4 max-w-[400px] cursor-pointer transition transform hover:scale-105"
      onClick={props.onClick}
    >
      <img
        src={props.image}
        alt={props.name}
        className="rounded-lg w-full h-1/2 object-cover"
      />
      <div className="py-2 text-center">
        <h2 className="text-base font-medium">{props.name}</h2>
        <p className="text-sm text-gray-700 mt-1">{toRupiah(props.price)}</p>
      </div>
    </div>
  );
}

export default Card;
