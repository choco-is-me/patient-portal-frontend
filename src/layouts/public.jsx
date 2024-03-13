import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Public() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode(token);
            setUser(decodedToken);

            axios
                .get("roles")
                .then((response) => {
                    const roles = response.data;
                    const userRole = roles.find(
                        (role) => role._id === decodedToken.role
                    );
                    if (userRole) {
                        switch (userRole.name) {
                            case "Administrator":
                                navigate("/admin");
                                break;
                            case "Doctor":
                                navigate("/doctor");
                                break;
                            case "Patient":
                                navigate("/patient");
                                break;
                            default:
                                break;
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching roles", error);
                });
        }
    }, [navigate]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Outlet />
        </HelmetProvider>
    );
}
