import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductList = () => {
  const options = [
    "Food",
    "Grocery",
    "Auto-Mobiles",
    "Electronics",
    "Fashion",
    "Others",
  ];

  const [products, setProducts] = useState([]);
  const [productname, setProductname] = useState("");
  const [category, setCategory] = useState(options[0]);
  const [img, setImg] = useState(null);
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [previmage, setPrevImage] = useState("");
  const params = useParams();
  const [updateId, setUpdateId] = useState(null);
  const [error, setError] = useState(false);

  //-----------------------------------------------------GET ALL PRODUCTS-----------------------------
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:3000/", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };
  //----------------------------------------DELETE PRODUCTS-----------------------------------------------
  const deleteProduct = async () => {
    let result = await fetch(`http://localhost:3000/${updateId}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  //------------------------------SEARCH---------------------------------------------------------------------

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  //------------------------------Get by ID---------------------------------------------------------------------

  const getProductDetail = async (id) => {
    try {
      let result = await fetch(`http://localhost:3000/product/${id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (result.ok) {
        result = await result.json();
        setBrand(result.brand);
        setProductname(result.productname);
        setCategory(result.category);
        setPrevImage(result.img);
      } else {
        console.error("Failed to fetch product details.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  // ---------------------Update Product-------------------------------------------------------------------------------------------------
  const updateProduct = async () => {
    if (!productname || !category || !brand) {
      console.log("fail");
      setError(true);
      return false;
    }

    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("category", category);
    formData.append("brand", brand);
    if (img) {
      formData.append("img", img);
    } else {
      formData.append("img", previmage);
    }
    console.log("Param.id", params.id);
    try {
      let result = await fetch(`http://localhost:3000/update/${updateId}`, {
        method: "PUT",
        body: formData,
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (result.ok) {
        result = await result.json();
        console.log(result);
        // navigate("/ProductList");
        getProducts();
        document.getElementById("update_modal").close();
      } else {
        console.error("Failed to update product.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  // --------------Add Product-----------------------------------------------------------------------------------------------------
  const addProduct = async () => {
    if (!productname || !category || !image || !brand) {
      console.log("fail");
      setError(true);
      return false;
    }
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("brand", brand);
    console.log("Pass", category);
    console.log("AllData -> ", category, image, brand, productname);
    let result = await fetch("http://localhost:3000/", {
      method: "post",
      body: formData,
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    getProducts();
    document.getElementById("add_modal").close();
  };

  function clearData() {
    setImage(null);
    setBrand("");
    setCategory(options[0]);
    setProductname("");
    console.log("Clear Data");
  }

  const handleFileChangeForAdd = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };
  return (
    <>
      <div className="flex justify-center items-center w-full mt-5">
        <div className="flex space-x-1 w-[60%]">
          <input
            type="text"
            className="block w-full px-4 py-2 text-[#214D12] bg-white border rounded-full focus:border-green-700 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
            onChange={searchHandle}
          />
        </div>
      </div>
      <div className="flex justify-end my-0">
        <button
          onClick={() => {
            document.getElementById("add_modal").showModal();
            clearData();
          }}
          className=" mr-12 bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className=" flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className=" bg-[#214D12] text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-bold "
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-bold "
                      >
                        Brand Image
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-center text-sm font-bold "
                      >
                        Brand Name
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-center text-sm font-bold"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-bold "
                      >
                        Product Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-bold"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-center divide-gray-200 bg-white">
                    {products.length > 0 ? (
                      products.map((product, index) => (
                        <tr className="hover:bg-gray-200" key={product.id}>
                          <td className="px-4 py-4 font-bold">{index + 1}</td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={`http://localhost:3000/${product.img}`}
                                  alt=""
                                />
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-8 py-4">
                            <div className="text-sm text-gray-900 font-bold">
                              {product.brand}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 font-bold">
                              {product.category}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 font-bold">
                              {product.productname}
                            </div>
                          </td>
                          <td className=" flex flex-wrap whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                document
                                  .getElementById("view_modal")
                                  .showModal();
                                getProductDetail(product.id);
                                setUpdateId(product.id);
                              }}
                              className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                document
                                  .getElementById("delete_modal")
                                  .showModal();
                                getProductDetail(product.id);
                                setUpdateId(product.id);
                              }}
                              className="bg-red-500 m-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                document
                                  .getElementById("update_modal")
                                  .showModal();
                                getProductDetail(product.id);
                                setUpdateId(product.id);
                              }}
                              className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <h1 className="text-red-600 font-bold p-6 ">
                            No Match Found...
                          </h1>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* View */}
        <dialog
          id="view_modal"
          className="modal p-4 rounded-lg border w-[50%] border-slate-400"
        >
          <div className="modal-box">
            <form method="dialog" className="items-center">
              <div className="product" style={{ marginLeft: "0px" }}>
                <p className="font-bold text-xl text-center">Product Details</p>
                <p>Image :</p>
                {previmage && (
                  <img
                    src={`http://localhost:3000/${previmage}`}
                    alt="Previous Image"
                    style={{ width: "200px" }}
                    className="inputBox"
                  />
                )}
                <p>Product Name:</p>
                <input
                  type="text"
                  className="inputBox"
                  value={productname}
                  readOnly
                />
                <p>Category :</p>
                <input
                  type="text"
                  className="inputBox"
                  value={category}
                  readOnly
                />
                <p>Brand :</p>
                <input
                  type="text"
                  className="inputBox"
                  value={brand}
                  readOnly
                />
              </div>
              <div>
                <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
        {/* Update */}
        <dialog
          id="update_modal"
          className="modal p-4 rounded-lg border w-[50%] border-slate-400"
        >
          <div className="modal-box">
            <div className="items-center">
              <div className="product" style={{ marginLeft: "0px" }}>
                <p className="font-bold text-xl text-center">
                  Update Product Details
                </p>
                <p>Image :</p>
                {previmage && (
                  <img
                    src={`http://localhost:3000/${previmage}`}
                    alt="Previous Image"
                    style={{ width: "100px" }}
                    className="inputBox"
                  />
                )}
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  name="img"
                  className="inputBox"
                  onChange={handleFileChange}
                />
                <p>Product Name :</p>
                <input
                  type="text"
                  className="inputBox"
                  value={productname}
                  onChange={(e) => setProductname(e.target.value)}
                />
                {error && !productname && (
                  <span className="text-sm font-semibold text-red-500 px-3">
                    Enter a Name
                  </span>
                )}
                <p>Category :</p>
                <select
                  className="inputBox bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  {options.map((option, idx) => (
                    <option key={idx}>{option}</option>
                  ))}
                </select>
                <p>Brand :</p>
                <input
                  type="text"
                  placeholder="Enter Product Brand"
                  className="inputBox"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                {error && !brand && (
                  <span className="text-sm font-semibold text-red-500 px-3">
                    Enter Brand Name
                  </span>
                )}
              </div>
              <div>
                <button
                  className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={updateProduct}
                >
                  Update Product
                </button>
                <button
                  className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    document.getElementById("update_modal").close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </dialog>
        {/* Delete */}
        <dialog
          id="delete_modal"
          className="modal p-4 rounded-lg border w-[50%] border-slate-400"
        >
          <div className="modal-box">
            <form method="dialog" className="items-center">
              <div className="product" style={{ marginLeft: "0px" }}>
                <p className="font-bold text-xl text-center">Delete Product</p>
                <p>Image :</p>
                {previmage && (
                  <img
                    src={`http://localhost:3000/${previmage}`}
                    alt="Previous Image"
                    style={{ width: "100px" }}
                    className="inputBox"
                  />
                )}
                <p>Product Name :</p>
                <input
                  type="text"
                  className="inputBox"
                  value={productname}
                  readOnly
                />
                <p>Category :</p>
                <input
                  type="text"
                  className="inputBox"
                  value={category}
                  readOnly
                />
                <p>Brand :</p>
                <input
                  type="text"
                  placeholder="Enter Product Brand"
                  className="inputBox"
                  value={brand}
                  readOnly
                />
              </div>
              <div>
                <button
                  className="bg-red-500 m-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={deleteProduct}
                >
                  Delete Product
                </button>
                <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
        {/* Add */}
        <dialog
          id="add_modal"
          className="modal p-4 rounded-lg border w-[50%] border-slate-400"
        >
          <div className="modal-box">
            <div className="items-center">
              <div className="product" style={{ marginLeft: "0px" }}>
                <p className="font-bold text-xl text-center">
                  Add Product Details
                </p>
                <p>Image :</p>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  name="image"
                  className="inputBox"
                  onChange={handleFileChangeForAdd}
                />
                {error && !image && (
                  <span className="text-sm font-semibold text-red-500 px-3">
                    Please Add Image
                  </span>
                )}
                <p>Product Name :</p>
                <input
                  type="text"
                  className="inputBox"
                  value={productname}
                  onChange={(e) => setProductname(e.target.value)}
                />
                {error && !productname && (
                  <span className="text-sm font-semibold text-red-500 px-3">
                    Enter a Name
                  </span>
                )}
                <p>Category :</p>
                <select
                  className="inputBox bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue={category}
                >
                  {options.map((option, idx) => (
                    <option key={idx}>{option}</option>
                  ))}
                </select>
                <p>Brand :</p>
                <input
                  type="text"
                  className="inputBox"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                {error && !brand && (
                  <span className="text-sm font-semibold text-red-500 px-3">
                    Enter Brand Name
                  </span>
                )}
              </div>
              <div>
                <button
                  className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={addProduct}
                >
                  Add Product
                </button>
                <button
                  // data-modal-hide="add_modal"
                  className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    document.getElementById("add_modal").close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default ProductList;
