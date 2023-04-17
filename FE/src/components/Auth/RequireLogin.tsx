import { useAppSelector } from "@/Hooks/apphooks";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "./AuthSlice";

export default function RequireLogin() {
    console.log("isValid")
    const isValid = useAppSelector(isLogin);
    console.log(isValid)

    const renderContent = isValid ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
    return renderContent;
}
