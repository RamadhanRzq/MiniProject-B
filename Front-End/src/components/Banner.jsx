import { IconArrowNarrowDown, IconArrowNarrowRight } from "@tabler/icons-react";

function Home() {
  return (
    <div>
      <div className="flex h-screen bg-cover bg-right relative bg-home w-full">
        <div className="text-left mt-72 ml-24 text-black absolute">
          <h5 className="text-primary font-semibold uppercase text-xl">
            Fashion Collection
          </h5>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-4">
            New <br /> Fashion <br /> Collection 2023
          </h1>
          <p className="italic text-gray-500 font-semibold text-xl mb-8">
            Best Modern Fashion Trend
          </p>
          <a
            href="#trending"
            className="bg-transparent border-2 border-black text-black py-3 px-6 text-lg font-semibold hover:bg-black hover:text-white transition duration-300 inline-flex items-center"
          >
            Shop Now
            <IconArrowNarrowRight className="ml-2" />
          </a>
        </div>
        <div className="absolute mr-20 mb-40 bottom-10 right-10 border-2 border-black p-4 rounded-full bg-transparent text-black hover:bg-black hover:text-white">
          <a href="#trending">
            <IconArrowNarrowDown size={30} />
          </a>
        </div>
      </div>
      <div className="bg-gray-100 py-16">
        <div className="text-center mb-10 mt-10">
          <h2 className="text-3xl font-semibold">
            Our Trending <span className="text-red-500">Products</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
