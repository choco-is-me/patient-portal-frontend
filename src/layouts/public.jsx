import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
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

            switch (decodedToken.role) {
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
