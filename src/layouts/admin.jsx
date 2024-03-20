import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AdminNav from "../components/adminNB";
import { UseToken } from "../pages/useToken";
import { jwtDecode } from "jwt-decode";

export default function Admin() {
    const { token } = UseToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.role !== "Administrator") {
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
                <title>Admin</title>
            </Helmet>
            <AdminNav />
        </HelmetProvider>
    );
}
