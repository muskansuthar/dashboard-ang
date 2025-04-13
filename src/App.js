import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import Homepageimage from "./pages/Homepageimage/homepageimagelist";
import AddHomepageimage from "./pages/Homepageimage/addhomepageimage";
import EditHomepageimage from "./pages/Homepageimage/edithomepageimage";
import Mobileimage from "./pages/Mobileimage/mobileimagelist";
import AddMobileimage from "./pages/Mobileimage/addmobileimage";
import EditMobileimage from "./pages/Mobileimage/editmobileimage";
import ProductUpload from "./pages/Products/addProduct";
import Category from "./pages/Category/categoryList";
import AddCategory from "./pages/Category/addCategory";
import EditCategory from "./pages/Category/editCategory";

import { Snackbar, Alert } from "@mui/material";
import LoadingBar from "react-top-loading-bar";
import EditProduct from "./pages/Products/editProduct";
import { fetchDataFromApi } from "./utils/api";
import TopMaterial from "./pages/TopMaterial/topMaterialList";
import AddTopMaterial from "./pages/TopMaterial/addTopMaterial";
import AddTopFinish from "./pages/TopFinish/addTopFinish";
import TopFinish from "./pages/TopFinish/topFinishList";
import AddLegMaterial from "./pages/LegMaterial/addLegMaterial";
import LegMaterial from "./pages/LegMaterial/legMaterialList";
import LegFinish from "./pages/LegFinish/legFinishList";
import AddLegFinish from "./pages/LegFinish/addLegFinish";

const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [catData, setCatData] = useState([]);
  const [productList, setProductList] = useState([])
  const [isOpenNav, setIsOpenNav] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [baseUrl, setBaseUrl] = useState(process.env.REACT_APP_BASE_URL);

  const [progress, setProgress] = useState(0);

  const [alertBox, setAlertBox] = useState({
    msg: "",
    error: false,
    open: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== "" && token !== undefined) {
      setIsLogin(true);

      const userData = JSON.parse(localStorage.getItem("user"));

      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setProgress(20);

    fetchCategory();
    
    fetchDataFromApi(`/api/products`).then((res) => {
      setProductList(res);
    });
  }, []);

  const fetchCategory = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
      setProgress(100);
    });
  };

  const openNav = () => {
    setIsOpenNav(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertBox({
      open: false,
    });
  };

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    windowWidth,
    openNav,
    isOpenNav,
    setIsOpenNav,
    alertBox,
    setAlertBox,
    progress,
    setProgress,
    baseUrl,
    catData,
    fetchCategory,
    setUser,
    user,
    setProductList,
    productList
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          className="topLoadingBar"
        />

        <Snackbar
          open={alertBox.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertBox.error === false ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>

        {isHideSidebarAndHeader !== true && <Header />}
        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <>
              <div
                className={`sidebarOverlay d-none ${
                  isOpenNav === true && "show"
                }`}
                onClick={() => setIsOpenNav(false)}
              ></div>
              <div
                className={`sidebarWrapper ${
                  isToggleSidebar === true ? "toggle" : ""
                } ${isOpenNav === true ? "open" : ""}`}
              >
                <Sidebar />
              </div>
            </>
          )}

          <div
            className={`content ${isHideSidebarAndHeader === true && "full"} ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/login" exact={true} element={<Login />} />
              <Route path="/signUp" exact={true} element={<SignUp />} />
              <Route path="/homepageimage" exact={true} element={<Homepageimage />} />
              <Route path="/homepageimage/add" exact={true} element={<AddHomepageimage />} />
              <Route path="/homepageimage/edit/:id" exact={true} element={<EditHomepageimage />} />
              <Route path="/mobileimage" exact={true} element={<Mobileimage />} />
              <Route path="/mobileimage/add" exact={true} element={<AddMobileimage />} />
              <Route path="/mobileimage/edit/:id" exact={true} element={<EditMobileimage />} />
              <Route path="/products" exact={true} element={<Products />} />
              <Route
                path="/product/upload"
                exact={true}
                element={<ProductUpload />}
              />
              <Route
                path="/product/edit/:id"
                exact={true}
                element={<EditProduct />}
              />
              <Route path="/category" exact={true} element={<Category />} />
              <Route
                path="/category/add"
                exact={true}
                element={<AddCategory />}
              />
              <Route
                path="/category/edit/:id"
                exact={true}
                element={<EditCategory />}
              />
              <Route path="/legFinish" exact={true} element={<LegFinish />} />
              <Route
                path="/legFinish/add"
                exact={true}
                element={<AddLegFinish />}
              />
              <Route
                path="/legMaterial"
                exact={true}
                element={<LegMaterial />}
              />
              <Route
                path="/legMaterial/add"
                exact={true}
                element={<AddLegMaterial />}
              />
              <Route path="/topFinish" exact={true} element={<TopFinish />} />
              <Route
                path="/topFinish/add"
                exact={true}
                element={<AddTopFinish />}
              />
              <Route
                path="/topMaterial"
                exact={true}
                element={<TopMaterial />}
              />
              <Route
                path="/topMaterial/add"
                exact={true}
                element={<AddTopMaterial />}
              />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
