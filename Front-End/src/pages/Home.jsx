import Cart from "./Cart";
import ProductCard from "./ProductCard";

function Home() {
  return (
    <div className="grid grid-cols-9 px-5 py-4 gap-x-4">
      <div className="col-span-6">
        <ProductCard />
      </div>
      <div className="col-span-3 ml-10 border-l-2 border-black pl-4">
        <Cart />
      </div>
    </div>
  );
}

export default Home;
