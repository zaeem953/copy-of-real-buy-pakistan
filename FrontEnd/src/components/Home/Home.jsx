import { useState, useEffect } from "react";
import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
function Home({ productData, searchData, productData2 }) {
  return (
    <>
      <div className="z-50 fixed lg:top-[70%] lg:left-[83%] md:top-[70%] md:left-[78%] xl:top-[75%] xl:left-[82%] 2xl:top-[80%] 2xl:left-[83%] top-[50%] left-[85%]">
        <div className="  group inline-block">
          <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible w-auto bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-2 ">
            <p className="px-4 py-2">Suggest any product you like</p>
          </div>
          <Link
            to={"/requestProduct"}
            className="fa-2x fa-solid fa-pen-to-square rounded-full h-auto w-auto bg-orange-500 hover:bg-orange-700 text-white font-bold lg:py-3 lg:px-3 md:px-2 md:py-2  px-2 py-2 xl:py-4 xl:px-4 2xl:py-4 2xl:px-4 transition duration-300 ease-in-out transform hover:scale-105"
          ></Link>
        </div>
      </div>
      <div className="z-50 fixed lg:top-[73%] lg:left-[90%] md:top-[73%] md:left-[85%] xl:top-[74%] xl:left-[88%] 2xl:top-[79%] 2xl:left-[88%]  top-[72%] left-[85%]">
        <div className="group inline-block">
          <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible w-auto mt-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-2">
            <p className="px-4 py-2">FeedBack</p>
          </div>
          <Link
            to={"/feedback"}
            className="fa-2x fa-solid fa-comment-dots rounded-full w-auto h-auto bg-blue-500 hover:bg-blue-700 text-white font-bold lg:py-3 lg:px-3 md:px-2 md:py-2 px-2 py-2 xl:py-4 xl:px-4 2xl:py-4 2xl:px-4 transition duration-300 ease-in-out transform hover:scale-105"
          ></Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center min-h-[500px]">
        <div className="w-full p-6">
          <SearchBar productData2={productData2} searchData={searchData} />
        </div>
        {productData.length > 0 ? (
          productData.map((product) => (
            <div
              key={product.id}
              className="text-center m-2 max-h-[300px] w-[300px] rounded-md border cursor-pointer hover:bg-slate-100 "
            >
              <div className="p-2">
                <img
                  src={`http://localhost:3000/${product.img}`}
                  alt={product.productname}
                  className="m-auto h-[130px] w-[130px] rounded-full object-cover"
                />
              </div>
              <div className="p-2">
                <h1 className="text-lg font-semibold">{product.productname}</h1>
                <h1 className="text-lg font-semibold">{product.brand}</h1>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-red-600 font-bold p-6 ">No Match Found...</h1>
        )}
      </div>
    </>
  );
}

export default Home;
