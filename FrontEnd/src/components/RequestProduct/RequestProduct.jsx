import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
function RequestProduct() {
  // ---------------------Add product details-------------------------------------------------------------------------------------------------

  const options = [
    "Food",
    "Grocery",
    "Auto-Mobiles",
    "Electronics",
    "Fashion",
    "Others",
  ];

  const [productname, setProductname] = useState("");
  const [category, setCategory] = useState(options[0]);
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const addProductDetails = async () => {
    if (!productname || !category || !image || !brand || !description) {
      setError(true);
      return false;
    }
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("image", image);
    let result = await fetch("http://localhost:3000/post-notification", {
      method: "post",
      body: formData,
    });
    result = await result.json();
    console.log(result);
    clearData();
    alert("Your Request has been sent..");
  };
  function clearData() {
    setImage(null);
    setBrand("");
    setCategory(options[0]);
    setProductname("");
    setDescription("");
    console.log("Clear Data");
  }
  return (
    <>
      <section className="bg-gray-900  dark:bg-gray-900 2xl:h-screen">
        <div>
          <Link
            to={"/"}
            className="fa-solid m-8 text-white fa-2x fa-arrow-left"
          ></Link>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="space-y-4 md:space-y-6" action="#">
                <div className="product" style={{ marginLeft: "0px" }}>
                  <p className="font-bold text-xl text-center">
                    Add Your Product Details
                  </p>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Image :
                  </label>
                  <input
                    required
                    id="image"
                    type="file"
                    accept="image/*"
                    name="image"
                    className="inputBox"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  {error && !image && (
                    <span className="text-sm font-semibold text-red-500 ">
                      *Enter Your Product Image*
                    </span>
                  )}
                  <label
                    htmlFor="ProductName"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Product Name :
                  </label>
                  <input
                    required
                    type="text"
                    id="ProductName"
                    className="inputBox"
                    value={productname}
                    onChange={(e) => setProductname(e.target.value)}
                  />
                  {error && !productname && (
                    <span className="text-sm font-semibold text-red-500 ">
                      *Enter Product Name*
                    </span>
                  )}
                  <label
                    htmlFor="Brand"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Brand :
                  </label>
                  <input
                    required
                    type="text"
                    id="Brand"
                    className="inputBox"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  {error && !brand && (
                    <span className="text-sm font-semibold text-red-500">
                      *Enter Brand Name*
                    </span>
                  )}
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Select an Category :
                  </label>

                  <select
                    required
                    className="inputBox bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue={category}
                  >
                    {options.map((option, idx) => (
                      <option value={option} key={idx}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-sm font-medium dark:text-white"
                      htmlFor="description"
                    >
                      Description :
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength="499"
                      name="feedback"
                      id="description"
                      rows="4"
                      cols="80"
                      className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                      placeholder=""
                      required
                      value={description}
                    ></textarea>
                    {error && !description && (
                      <span className="text-sm font-semibold text-red-500">
                        *Enter Description*
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <button
                    onClick={addProductDetails}
                    className="bg-orange-500 m-2 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Send Request
                  </button>
                  <Link
                    to={"/"}
                    className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RequestProduct;
