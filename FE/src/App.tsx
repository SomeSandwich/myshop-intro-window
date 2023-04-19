import nodeLogo from "./assets/node.svg";
import { useState } from "react";
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
import ManageCate from "./features/Categories/manageCate";
import CateLayout from "./features/Categories/CateLayout";
import DetailBook from "./components/Book/DetailBook";
import CardBook from "./components/Book/CardBook";
import BookLayout from "./features/posts/BookLayout";
import Help from "./pages/Help";
import EditCate from "./features/Categories/EditCate";
import AddCate from "./features/Categories/AddCate";

console.log(
    "[App.tsx]",
    `Hello world from Electron ${process.versions.electron}!`
);

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="containerWeb">
            <Routes>
                <Route element={<RequireLogin />}>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<DashBoard />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about-us" element={<div>About-Us</div>} />
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
                                element={<div>Update</div>}
                            />
                            <Route path="edit/:id" element={<ManageCate />} />
                        </Route>
                        {/* <Route path="/dashboard" element={<DashBoard />} /> */}
                        <Route path="/order" element={<div>Order</div>} />
                        <Route
                            path="/add-product"
                            element={<div>Add product</div>}
                        />
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
