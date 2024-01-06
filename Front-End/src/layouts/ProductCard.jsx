import axios from "axios";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import Card from "../components/Card";
import { addToCart } from "../store/reducers/cartSlice";

function ProductCard() {
  const dispatch = useDispatch();

  const fetchData = async (url) => {
    const data = await axios
      .get(url, { headers: { "Cache-Control": "no-cache" } })
      .then((res) => res.data.data);
    return data;
  };

  const { data, isLoading, error } = useSWR(
    "http://localhost:8080/api/products",
    () => fetchData(`http://localhost:8080/api/products`)
  );

  const onClickAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <section className="flex flex-col justify-center">
      <h1 className="text-2xl font-semibold mb-4">Daftar Produk</h1>
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
    </section>
  );
}

export default ProductCard;
