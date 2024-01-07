import PropTypes from "prop-types";
import { toRupiah } from "../utils/formatter";

function Card(props) {
  return (
    <div
      className="bg-[#f3f6f4] rounded-lg shadow-lg p-1 mt-4 max-w-[200px] cursor-pointer"
      onClick={props.onClick}
    >
      <img
        src={props.image}
        alt={props.name}
        className="rounded-lg w-full h-32 object-cover"
      />
      <div className="py-1 pl-1 text-center">
        <h2 className="text-lg font-semibold">{props.name}</h2>
        <p className="text-[14px] text-gray-700 pt-1">
          {toRupiah(props.price)}
        </p>
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
