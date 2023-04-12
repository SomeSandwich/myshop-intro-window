import nodeLogo from "./assets/node.svg";
import { useState } from "react";
import {
    Routes,
    Route,
    useMatches,
    useMatch,
    useLocation,
    Router,
} from "react-router-dom";
import Update from "@/components/update";
import "./App.scss";
import HomeLayout from "./features/HomeLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import RequireLogin from "./components/Auth/RequireLogin";

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
                        <Route path="/help" element={<div>Help</div>} />
                        <Route path="/home" element={<div>Home</div>} />
                        <Route path="/about-us" element={<div>About-Us</div>} />
                        <Route
                            path="/dashboard"
                            element={<div>DashBoard</div>}
                        />
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
