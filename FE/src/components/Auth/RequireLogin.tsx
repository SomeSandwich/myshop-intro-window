import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireLogin() {
    const isValid = true;

    const renderContent = isValid ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
    return renderContent;
}
