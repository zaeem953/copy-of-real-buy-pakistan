// import { useState, useEffect } from "react";

// const NavCategories = (props) => {
//   const categories = [
//     ...new Set(props.productData.map((item) => item.category)),
//   ];
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [uniqueSubcategories, setUniqueSubcategories] = useState([]);

//   const handleMouseEnter = (category) => {
//     setSelectedCategory(category);

//     // Filter unique subcategories for the selected category
//     const subcategories = props.productData
//       .filter((product) => product.category === category)
//       .map((product) => product.productname);

//     setUniqueSubcategories([...new Set(subcategories)]);
//   };

//   const handleMouseLeave = () => {
//     setSelectedCategory(null);
//     setUniqueSubcategories([]);
//   };

//   return (
//     <ul className="categories flex space-x-4 text-white gap-11">
//       {categories.map((category) => (
//         <li
//           key={category}
//           onMouseEnter={() => handleMouseEnter(category)}
//           onMouseLeave={handleMouseLeave}
//           className={`cursor-pointer ${
//             selectedCategory === category ? "text-green-400" : ""
//           } font-bold`}
//         >
//           {category}
//           {uniqueSubcategories.length > 0 && selectedCategory === category && (
//             <ul className="subcategories space-y-2 absolute pt-6 pb-2 bg-[#214D12] w-50 text-white">
//               {uniqueSubcategories.map((subcategory) => (
//                 <li
//                   key={subcategory}
//                   onClick={() => props.filterData(subcategory)}
//                   className="cursor-pointer px-4 hover:text-green-300 hover:bg-[#04300a]"
//                 >
//                   {subcategory}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// };
// export default NavCategories;

import { useState } from "react";
import Logo from "./logo";

const NavCategories = (props) => {
  const categories = [
    ...new Set(props.productData.map((item) => item.category)),
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uniqueSubcategories, setUniqueSubcategories] = useState([]);

  const handleMouseEnter = (category) => {
    setSelectedCategory(category);

    // Filter unique subcategories for the selected category
    const subcategories = props.productData
      .filter((product) => product.category === category)
      .map((product) => product.productname);

    setUniqueSubcategories([...new Set(subcategories)]);
  };

  const handleMouseLeave = () => {
    setSelectedCategory(null);
    setUniqueSubcategories([]);
  };
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = (subcategory) => {
    setIsNavOpen(!isNavOpen);
    if (subcategory.length) {
      props.filterData(subcategory);
    }
  };

  // function filterAndToggle(props, subcategory) {
  //   toggleNav();
  //   props.filterData(subcategory);
  // }

  return (
    <nav className="bg-[#214D12] border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo
          setproductData={props.setproductData}
          productData={props.productData}
        />
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center lg:hidden text-sm text-[#214D12] bg-white rounded-lg border-2 border-[#214D12]  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded={isNavOpen}
          onClick={toggleNav}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full lg:block
           lg:w-auto xl:mr-14 lg:mr-14  ${
            isNavOpen ? "block" : "hidden"
          }`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border-2 border-green-500 rounded-lg bg-[#214D12] lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-[#214D12] dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            {categories.map((category) => (
              <li
                key={category}
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={handleMouseLeave}
                className={`cursor-pointer ${
                  selectedCategory === category
                    ? "hover:text-green-300 hover:bg-[#04300a] lg:hover:bg-[#214D12]  rounded-lg"
                    : ""
                }`}
              >
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-green-400 lg:p-0 md:w-auto dark:text-white md:dark:hover:text-green-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  {category}{" "}
                </button>
                {/* <!-- Dropdown menu --> */}
                {uniqueSubcategories.length > 0 &&
                  selectedCategory === category && (
                    <div
                      id="dropdownNavbar"
                      className="absolute z-10 font-normal ml-32 mt-0 lg:ml-0 bg-[#214D12] divide-y divide-gray-100 rounded-lg shadow w-auto text-white dark:bg-gray-700 dark:divide-gray-600 "
                    >
                      <ul
                        className="border-2 border-green-500 md:bg-[#214D12] md:bg-[#214D12] md:-ml-4 lg:border-[#214D12]  border-solid rounded py-3 text-sm text-white dark:text-gray-400"
                        aria-labelledby="dropdownLargeButton"
                      >
                        {uniqueSubcategories.map((subcategory) => (
                          <li
                            key={subcategory}
                            onClick={() => toggleNav(subcategory)}
                            className="cursor-pointer block px-4 py-1 hover:text-green-300 hover:bg-[#04300a] dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            {subcategory}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavCategories;
