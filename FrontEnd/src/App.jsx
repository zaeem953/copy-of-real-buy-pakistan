import { useState, useEffect } from "react";
import Home from "./components/Home/Home.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Header from "./components/Header/header.jsx";
import Login from "./components/Admin/Login.jsx";
import ProductList from "./components/Admin/ProductList.jsx";
import PrivateComponenet from "./components/Private/PrivateComponent.jsx";
import AdminHeader from "./components/Header/adminHeader.jsx";
import Feedback from "./components/Feedback/Feedback.jsx";
import RequestProduct from "./components/RequestProduct/RequestProduct.jsx";
import AdminFeedbackpage from "./components/Admin/AdminFeedbackpage.jsx";
import AdminRequestPage from "./components/Admin/AdminRequestPage.jsx";
function App() {
  const [productData, setproductData] = useState([]);
  const [productData2, setproductData2] = useState([]);

  const getProducts = async () => {
    let result = await fetch("http://localhost:3000/");
    result = await result.json();
    setproductData(result);
    setproductData2(result);
    console.log(result);
  };
  //--------------------------------
  useEffect(() => {
    getProducts();
    getFeedback();
    getRequest();
  }, []);
  // ----------------------------
  const filterData = (selectedSubCategory) => {
    const newProductData = productData2.filter(
      (newData) => newData.productname === selectedSubCategory
    );
    setproductData(newProductData);
  };
  //-------------------------------
  const searchData = async (e) => {
    let Key = e.target.value;
    let searchResult = await fetch(`http://localhost:3000/search/${Key}`);
    searchResult = await searchResult.json();
    if (searchResult) {
      setproductData(searchResult);
    } else {
      getProducts();
    }
  };
  //----------------Feedback && Request----------------------------------------------------
  const [request, setRequest] = useState();
  const [feedback, setFeedback] = useState();
  const getFeedback = async () => {
    let result = await fetch("http://localhost:3000/get-feedback");
    result = await result.json();
    setFeedback(result.length);
  };
  const getRequest = async () => {
    let result = await fetch("http://localhost:3000/get-notification");
    result = await result.json();
    setRequest(result.length);
  };
  //-------ROUTER------------------------

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path=""
              element={
                <>
                  <Header
                    productData={productData2}
                    filterData={filterData}
                    setproductData={setproductData}
                  />
                  <Home
                    searchData={searchData}
                    productData={productData}
                    productData2={productData2}
                  />
                </>
              }
            />
            <Route path="admin" element={<Login />} />
            <Route element={<PrivateComponenet />}>
              <Route
                path="ProductList"
                element={
                  <>
                    <AdminHeader
                      productData={productData2}
                      setproductData={setproductData}
                      request={request}
                      feedback={feedback}
                    />
                    <ProductList />
                  </>
                }
              />
              <Route
                path="adminFeedbackPage"
                element={
                  <>
                    <AdminHeader
                      productData={productData2}
                      setproductData={setproductData}
                      request={request}
                      feedback={feedback}
                    />
                    <AdminFeedbackpage
                      feedback={feedback}
                      setFeedback={setFeedback}
                    />
                  </>
                }
              />
              <Route
                path="adminRequestPage"
                element={
                  <>
                    <AdminHeader
                      productData={productData2}
                      setproductData={setproductData}
                      request={request}
                      feedback={feedback}
                    />
                    <AdminRequestPage
                      request={request}
                      setRequest={setRequest}
                    />
                  </>
                }
              />
            </Route>
            <Route path="feedback" element={<Feedback />} />
            <Route path="requestProduct" element={<RequestProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
{
  /* <Header
        productData={productData2}
        filterData={filterData}
        setproductData={setproductData}
      />
      <Home searchData={searchData} productData={productData} />
      <Footer /> */
}
