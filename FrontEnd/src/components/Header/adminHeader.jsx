import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "./logo";
function AdminHeader(props) {
  const auth = localStorage.getItem("user");
  // const [request, setRequest] = useState();
  // const [feedback, setFeedback] = useState();
  // const getFeedback = async () => {
  //   let result = await fetch("http://localhost:3000/get-feedback");
  //   result = await result.json();
  //   setFeedback(result.length);
  // };
  // const getRequest = async () => {
  //   let result = await fetch("http://localhost:3000/get-notification");
  //   result = await result.json();
  //   setRequest(result.length);
  // };
  //--------------------------------
  // useEffect(() => {
  //   getRequest();
  //   getFeedback();
  // }, []);
  return (
    <header className="bg-[#214D12] px-20 sticky top-0 z-20 flex w-full items-center justify-between p-8 h-8 font-[sans-serif]">
      <Logo
        setproductData={props.setproductData}
        productData={props.productData}
      />
      <Link to={"/ProductList"} className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={`http://localhost:3000/${JSON.parse(auth).image}`}
            alt=""
          />
        </div>
        <p className="ml-3 font-bold text-white text-lg">
          {JSON.parse(auth).username}
        </p>
      </Link>
      <div className="flex ">
        <span className="relative inline-block">
          <Link
            to={"/adminRequestPage"}
            className="fa-2x fa-solid fa-pen-to-square m-4 text-white  hover:cursor-pointer"
          ></Link>
          <span className="absolute top-4 right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {props.request}
          </span>
        </span>
        <span className="relative inline-block">
          <Link
            to={"/adminFeedbackPage"}
            className="fa-2x fa-solid fa-comment-dots m-4 text-white  hover:cursor-pointer"
          ></Link>
          <span className="absolute top-4 right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {props.feedback}
          </span>
        </span>
        <div className="m-auto">
          <Link
            to={"/"}
            onClick={() => {
              localStorage.clear();
            }}
            className="bg-[#214D12] py-3 px-4  hover:bg-yellow-500 text-white font-bold  rounded"
          >
            Log Out
          </Link>
        </div>
      </div>
    </header>
  );
}
export default AdminHeader;
