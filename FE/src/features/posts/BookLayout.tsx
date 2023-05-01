import React from "react";
import { Outlet } from "react-router-dom";

export default function BookLayout() {
    return (
        <div className="col d-flex flex-column justify-content-center">
            <Outlet />
        </div>
    );
}
