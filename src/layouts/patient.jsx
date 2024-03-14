import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PatientNav from "../components/patientNB";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useToken } from "../pages/useToken";

export default function Patient() {
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
                        if (!userRole || userRole.name !== "Patient") {
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
                <title>Patient</title>
            </Helmet>
            <PatientNav />
            <Outlet />
        </HelmetProvider>
    );
}
