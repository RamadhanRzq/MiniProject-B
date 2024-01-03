import React from "react";

function Headline() {
  return (
    <div className="max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6">
      <div className="rounded-xl relative">
        <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
          <p className="font-bold text-2xl px-2 pt-4">Woman Collection</p>
          <p className="px-2">Up To 30%</p>
          <button className="bg-white text-black mx-2 absolute bottom-4 hover:text-white hover:bg-black">
            Order Now
          </button>
        </div>
        <img
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="/images/bg1.jpg"
          alt="/"
        />
      </div>
      <div className="rounded-xl relative">
        <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
          <p className="font-bold text-2xl px-2 pt-4">Daily Styles</p>
          <p className="px-2">Designer's Choice</p>
          <button className="bg-white text-black mx-2 absolute bottom-4 hover:text-white hover:bg-black">
            Order Now
          </button>
        </div>
        <img
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="/images/bg2.jpg"
          alt="/"
        />
      </div>
      <div className="rounded-xl relative">
        <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
          <p className="font-bold text-2xl px-2 pt-4">Mix & Match</p>
          <p className="px-2">Designer Clothes</p>
          <button className="bg-white text-black mx-2 absolute bottom-4 hover:text-white hover:bg-black">
            Order Now
          </button>
        </div>
        <img
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="/images/bg3.jpg"
          alt="/"
        />
      </div>
    </div>
  );
}

export default Headline;
