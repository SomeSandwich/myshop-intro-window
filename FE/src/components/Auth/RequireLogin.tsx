import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireLogin() {
    const isValid = false;

    const renderContent = isValid ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
    return renderContent;
}
