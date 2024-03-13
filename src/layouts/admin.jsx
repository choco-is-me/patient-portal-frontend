import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AdminNav from "../components/adminNB";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode(token);

            axios
                .get("api/roles")
                .then((response) => {
                    const roles = response.data;
                    const userRole = roles.find(
                        (role) => role._id === decodedToken.role
                    );
                    if (!userRole || userRole.name !== "Administrator") {
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching roles", error);
                    navigate("/");
                });
        } else {
            navigate("/");
        }
    }, [navigate]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Admin</title>
            </Helmet>
            <AdminNav />
            <Outlet />
        </HelmetProvider>
    );
}
