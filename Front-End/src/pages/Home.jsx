import ProductCard from "../layouts/ProductCard";
import Cart from "./Cart";
import Category from "./Category";

function Home() {
  return (
    <div className="grid grid-cols-8 px-5 py-4 gap-x-4">
      <div className="col-span-5">
        <ProductCard />
      </div>
      <div className="col-span-3 ml-10 border-l-2 border-black pl-4">
        <Cart />
      </div>
      {/* <div className="mt-10 col-span-5 ml-4 border-t-2 border-black pl-4">
        <Category />
      </div> */}
    </div>
  );
}

export default Home;
