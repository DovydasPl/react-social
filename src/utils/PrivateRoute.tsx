import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { APIService } from "../API";
import useAuth from "../hooks/useAuth";

export const PrivateRoute = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth ?
            <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    );
};