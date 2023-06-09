import nodeLogo from "./assets/node.svg";
import { useState, useEffect } from "react";
import {
    Routes,
    Route,
    useMatches,
    useMatch,
    useLocation,
    Router,
    Navigate,
} from "react-router-dom";
import Update from "@/components/update";
import "./App.scss";
import HomeLayout from "./features/HomeLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import RequireLogin from "./components/Auth/RequireLogin";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import ManageCate from "./features/Categories/ManageCate";
import CateLayout from "./features/Categories/CateLayout";
import DetailBook from "./components/Book/DetailBook";
import CardBook from "./components/Book/CardBook";
import BookLayout from "./features/posts/BookLayout";
import EditCate from "./features/Categories/EditCate";
import AddCate from "./features/Categories/AddCate";
import OrderForm from "./components/Order/OrderForm";
import AddBook from "./components/Book/AddBook";
import useLocalStore from "./Hooks/useLocalStore";
import { RefreshPrice } from "./features/posts/BookSlice";
import { useAppDispatch } from "./Hooks/apphooks";
import OrderLayout from "./components/Order/OrderLayout";
import OrderDashBoard from "./components/Order/OrderDashBoard";
import AddOrder from "./components/Order/AddOrder";
import UpdateDetailBook from "./components/Book/UpdateDetailBook";
import OrderDetail from "./components/Order/OrderDetail";
import AboutUs from "./pages/AboutUs";

console.log(
    "[App.tsx]",
    `Hello world from Electron ${process.versions.electron}!`
);

function App() {
    const [count, setCount] = useState(0);
    const [storeSelected, setStoreSelected] = useLocalStore({
        key: "genreSelect",
        initialValue: "[]",
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        
        dispatch(RefreshPrice(""));
        setStoreSelected("");
    }, []);

    return (
        <div className="containerWeb">
            <Routes>
                <Route element={<RequireLogin />}>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<DashBoard />} />
                        <Route path="/help" element={<div>Help</div>} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about-us" element={<AboutUs/>} />
                        <Route path="categories" element={<CateLayout />}>
                            <Route path="view" element={<ManageCate />} />
                            <Route path="add" element={<AddCate />} />
                            <Route path="edit/:id" element={<EditCate />} />
                        </Route>
                        <Route path="books" element={<BookLayout />}>
                            <Route
                                path="viewDetail/:id"
                                element={<DetailBook />}
                            />
                            <Route
                                path="update/:id"
                                element={<UpdateDetailBook />}
                            />
                            <Route path="edit/:id" element={<ManageCate />} />
                        </Route>
                        {/* <Route path="/dashboard" element={<DashBoard />} /> */}
                        <Route path="order" element={<OrderLayout />}>
                            <Route index element={<OrderDashBoard />} />
                            <Route path="view/:id" element={<OrderDetail />} />
                            <Route path="add" element={<AddOrder />} />
                            <Route path="edit/:id" element={<EditCate />} />
                        </Route>
                        <Route path="/add-product" element={<AddBook />} />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default App;
