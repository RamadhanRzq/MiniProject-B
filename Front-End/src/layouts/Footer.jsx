import {
  IconBrandFacebookFilled,
  IconBrandLinkedin,
  IconBrandTwitterFilled,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import React from "react";

function Footer() {
  return (
    <div>
      <div className="bg-gray-100 pt-16 pb-12 border-t border-gray-100">
        <div className="container grid grid-cols-3">
          <div className="col-span-1 space-y-2">
            <img src="/images/logo.png" className="w-32" />
            <p className="text-gray-500 font-semibold hover:text-primary">
              Jakarta
            </p>
            <p className="text-gray-500 font-semibold hover:text-primary">
              0812345678910
            </p>
            <p className="text-gray-500 font-semibold hover:text-primary">
              user-info@gmail.com
            </p>
            <div className="flex space-x-2">
              <a
                href="#"
                className="text-gray-400 font-semibold hover:text-primary"
              >
                <IconBrandFacebookFilled />
              </a>
              <a
                href="#"
                className="text-gray-400 font-semibold hover:text-primary"
              >
                <IconBrandTwitterFilled />
              </a>
              <a
                href="#"
                className="text-gray-400 font-semibold hover:text-primary"
              >
                <IconBrandYoutubeFilled />
              </a>
              <a
                href="#"
                className="text-gray-400 font-semibold hover:text-primary"
              >
                <IconBrandLinkedin />
              </a>
            </div>
          </div>
          <div className="col-span-2 gap-8 items-center ml-20">
            <div className="grid grid-cols-2 gap-60">
              <div>
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Support
                </h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="text-base text-gray-500 font-semibold capitalize hover:text-primary block"
                  >
                    Contact Us
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-500 font-semibold capitalize hover:text-primary block"
                  >
                    About Page
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-500 font-semibold capitalize hover:text-primary block"
                  >
                    Size Guide
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-500 font-semibold capitalize hover:text-primary block"
                  >
                    Shopping & Returns
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-500 font-semibold capitalize hover:text-primary block"
                  >
                    Privacy
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Shop
                </h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="text-base text-gray-500 font-semibold capitalize hover:text-primary block"
                  >
                    Women's Shopping
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-500 font-semibold capitalize hover:text-primary block"
                  >
                    Kid's Shopping
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-500 font-semibold capitalize hover:text-primary block"
                  >
                    Discount
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-500 font-semibold capitalize hover:text-primary block"
                  >
                    Sale
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-500 font-semibold capitalize hover:text-primary block"
                  >
                    BestSellers
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-4">
        <div className="container flex items-center">
          <p className="text-gray-600 font-bold mx-auto">
            Copyright &copy; 2023. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
