import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DoctorNav from "../components/doctorNB";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Doctor() {
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
                    if (!userRole || userRole.name !== "Doctor") {
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
                <title>Doctor</title>
            </Helmet>
            <DoctorNav />
            <Outlet />
        </HelmetProvider>
    );
}
