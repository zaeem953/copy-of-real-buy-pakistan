import React from "react";
import { useState, useEffect } from "react";
function AdminRequestPage(props) {
  const options = [
    "Food",
    "Grocery",
    "Auto-Mobiles",
    "Electronics",
    "Fashion",
    "Others",
  ];

  const [requestData, setRequestData] = useState([]);
  const [productname, setProductname] = useState("");
  const [category, setCategory] = useState(options[0]);
  const [description, setDescription] = useState([]);
  //const [img, setImg] = useState(null);

  const [brand, setBrand] = useState("");
  const [previmage, setPrevImage] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [image, setImage] = useState(previmage);
  const [error, setError] = useState("");

  // ------------------------------------------------------------------
  const getRequest = async () => {
    let result = await fetch("http://localhost:3000/get-notification");
    result = await result.json();
    setRequestData(result);
  };
  //--------------------------------
  useEffect(() => {
    getRequest();
  }, []);
  //------------------------------Get by ID---------------------------------------------------------------------

  const getRequestDetail = async (id) => {
    try {
      let result = await fetch(`http://localhost:3000/get-notification/${id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (result.ok) {
        console.log("ok");
        result = await result.json();
        setBrand(result.brand);
        setProductname(result.productname);
        setCategory(result.category);
        setPrevImage(result.img);
        setUpdateId(result.id);
        setDescription(result.description);
      } else {
        console.error("Failed to fetch product details.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  //----------------------------------------DELETE PRODUCTS-----------------------------------------------
  const deleteProduct = async () => {
    let result = await fetch(
      `http://localhost:3000/delete-notification/${updateId}`,
      {
        method: "Delete",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    props.setRequest(props.request - 1);
    if (result) {
      getRequest();
    }
  };
  // --------------Add Product-----------------------------------------------------------------------------------------------------
  const addProduct = async () => {
    if (!productname || !category || !previmage || !brand) {
      console.log("fail");
      setError(true);
      return false;
    }
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("category", category);

    formData.append("brand", brand);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("img", previmage);
    }
    console.log("AllData -> ", category, image, brand, productname);
    let result = await fetch("http://localhost:3000/", {
      method: "post",
      body: formData,
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    deleteProduct();
    getRequest();
    document.getElementById("accept_modal").close();
  };
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className=" flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="text-center bg-[#214D12] text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold "
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold "
                      >
                        Brand Image
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold "
                      >
                        Brand Name
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold "
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold "
                      >
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-bold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-center divide-gray-200 bg-white">
                    {requestData.length > 0 ? (
                      requestData.map((request, index) => (
                        <tr className="hover:bg-gray-200" key={request.id}>
                          <td className="px-4 py-4 font-bold">{index + 1}</td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={`http://localhost:3000/${request.img}`}
                                  alt=""
                                />
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-8 py-4">
                            <div className="text-sm text-gray-900 font-bold">
                              {request.brand}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 font-bold">
                              {request.category}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 font-bold">
                              {request.productname}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 font-bold">
                              {request.description[0]}
                              {request.description[1]}
                              {request.description[2]}
                              ....
                            </div>
                          </td>
                          <td className=" flex flex-wrap whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                document
                                  .getElementById("view_modal")
                                  .showModal();
                                getRequestDetail(request.id);
                              }}
                              className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                document
                                  .getElementById("reject_modal")
                                  .showModal();
                                getRequestDetail(request.id);
                              }}
                              className="bg-red-500 m-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => {
                                document
                                  .getElementById("accept_modal")
                                  .showModal();
                                getRequestDetail(request.id);
                              }}
                              className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Accept
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
                    style={{ width: "100px" }}
                    className="inputBox"
                  />
                )}
                <p>Product Name :</p>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  className="inputBox"
                  value={productname}
                  readOnly
                />
                <p>Category :</p>
                <input
                  type="text"
                  placeholder="Enter Product Category"
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
                <p>Description :</p>
                <textarea
                  rows="6"
                  cols="35"
                  className="px-3 py-3 inputBox bg-whitetext-black text-sm shadow focus:outline-none w-full"
                  placeholder=""
                  value={description}
                  readOnly
                ></textarea>
              </div>
              <div>
                <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
        {/* Reject */}
        <dialog
          id="reject_modal"
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
                  className="inputBox"
                  value={brand}
                  readOnly
                />
              </div>
              <p>Description :</p>
              <textarea
                rows="6"
                cols="35"
                className="px-3 py-3 inputBox bg-whitetext-black text-sm shadow focus:outline-none w-full"
                placeholder=""
                value={description}
                readOnly
              ></textarea>
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
        {/* Accept */}
        <dialog
          id="accept_modal"
          className="modal p-4 rounded-lg border w-[50%] border-slate-400"
        >
          <div className="modal-box">
            <div className="items-center">
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
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  name="image"
                  className="inputBox"
                  defaultValue={previmage}
                  onChange={(e) => setImage(e.target.files[0])}
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
              <p>Description :</p>
              <textarea
                rows="6"
                cols="35"
                className="px-3 py-3 inputBox bg-whitetext-black text-sm shadow focus:outline-none w-full"
                placeholder=""
                value={description}
                readOnly
              ></textarea>
              <div>
                <button
                  className="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={addProduct}
                >
                  Accept Product
                </button>
                <button
                  className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    document.getElementById("accept_modal").close();
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
}

export default AdminRequestPage;
