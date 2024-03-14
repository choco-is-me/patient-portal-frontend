import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AdminNav from "../components/adminNB";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useToken } from "../pages/useToken";

export default function Admin() {
    const { token } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);

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
            } catch (error) {
                console.error("Error decoding token", error);
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [navigate, token]);

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
