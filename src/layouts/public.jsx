import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useToken } from "../pages/useToken";

export default function Public() {
    const { token } = useToken();
    const [, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
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
    }, [navigate, token]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Outlet />
        </HelmetProvider>
    );
}
