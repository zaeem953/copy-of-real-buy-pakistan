import React from "react";

export default function SearchBar({ searchData, productData2 }) {
  const uniqueProducts = [
    ...new Set(productData2.map((item) => item.productname)),
  ];
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex space-x-1 lg:w-[60%] md:w-[80%] sm:w-[90%] w-[90%]">
        <input
          type="text"
          className="block w-full px-4 py-2 text-[#214D12] bg-white border rounded-full focus:border-green-700 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
          onChange={searchData}
          list="suggestions"
        />
        <datalist id="suggestions">
          {uniqueProducts.map((product) => (
            <option key={product} value={product} />
          ))}
        </datalist>
        {/* <button
          onClick={() =>
            inpValue != ""
              ? searchData(inpValue)
              : alert("Enter Brand Name Properly")
          }
          className="px-4 text-white bg-[#214D12] rounded-full "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button> */}
      </div>
    </div>
  );
}
