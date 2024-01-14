import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../store/reducers/cartSlice";
import { toRupiah } from "../utils/formatter";
import PopUp from "./PopUp";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.dataCart);
  const [isPopUpCheckoutOpen, setPopUpCheckoutOpen] = useState(false);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    dispatch(updateQuantity({ itemId, newQuantity }));
  };

  const handleIncrementQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + 1;
      handleUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleDecrementQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      handleUpdateQuantity(itemId, newQuantity);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const openPopUp = () => {
    setPopUpCheckoutOpen(true);
  };

  const closePopUp = () => {
    dispatch(clearCart());
    setPopUpCheckoutOpen(false);
  };

  const handleCheckout = () => {
    openPopUp();
    dispatch(clearCart());
  };

  return (
    <>
      <div className="cart">
        <h1 className="text-2xl font-semibold mb-4">Daftar Pesanan</h1>
        {cartItems.length === 0 ? (
          <p className="text-center">Belum ada Pesanan</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-gray-300 py-4 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <button
                      className="text-red-600"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <MdDeleteOutline size={20} />
                    </button>
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold">{item.name}</div>
                      <div className="text-gray-600">
                        {toRupiah(item.price)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Input Field with Increment and Decrement Buttons */}
                  <div className="flex items-center">
                    <button onClick={() => handleDecrementQuantity(item.id)}>
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      className="text-right w-12 border border-gray-300 rounded-md px-1 py-1 mx-1"
                      disabled
                    />
                    <button onClick={() => handleIncrementQuantity(item.id)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-lg font-semibold">Total:</div>
              <div className="text-xl font-bold">{toRupiah(totalPrice)}</div>
            </div>
            <button
              className="mt-4 bg-muda text-white py-2 px-4 rounded-md border-none hover:bg-hijau"
              onClick={handleCheckout}
            >
              Bayar Sekarang
            </button>
          </>
        )}
      </div>
      {isPopUpCheckoutOpen && <PopUp onCancel={closePopUp} />}
    </>
  );
};

export default Cart;
