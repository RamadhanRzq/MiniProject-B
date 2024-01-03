import { toRupiah } from "../utils/formatter";
import { data } from "../data/data";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/reducers/cartSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataCart } = useSelector((state) => state.cart);

  const handleDelete = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  console.log(data);
  console.log(dataCart);

  return (
    <div className="container mt-5">
      <div className="grid grid-cols-1 items-center text-center justify-center">
        <div className="col-span-1">
          <div className="bg-white shadow-md p-6 rounded-md">
            <div className="mb-4 flex justify-between items-center">
              <h4 className="text-lg font-semibold">Products Cart</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Product Image</th>
                    <th className="px-4 py-2">Product Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Remove</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCart.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td className="py-2">{item.title}</td>
                      <td className="py-2">
                        <div className="flex justify-center items-center">
                          <img
                            src={item.img}
                            alt={`Product ${item.id} Image`}
                            className="w-28 h-auto object-center"
                          />
                        </div>
                      </td>
                      <td className="py-2">{toRupiah(item.price)}</td>
                      <td className="py-2">{item.qty}</td>
                      <td className="py-2">
                        <button
                          className="rounded-lg border border-white bg-red-600 p-2 text-white self-center hover:bg-red-700"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td className="py-2">
                        <span className="font-bold">
                          {toRupiah(item.qty * item.price)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
