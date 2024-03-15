import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DoctorNav from "../components/doctorNB";
import { useToken } from "../pages/useToken";
import { jwtDecode } from "jwt-decode";

export default function Doctor() {
    const { token } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.role !== "Doctor") {
                    navigate("/");
                }
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
                <title>Doctor</title>
            </Helmet>
            <DoctorNav />
            <Outlet />
        </HelmetProvider>
    );
}
