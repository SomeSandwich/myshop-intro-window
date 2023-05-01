import { useAppSelector } from "@/Hooks/apphooks";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "./AuthSlice";

export default function RequireLogin() {
    const isValid = useAppSelector(isLogin);
    const renderContent = isValid ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
    return renderContent;
}
