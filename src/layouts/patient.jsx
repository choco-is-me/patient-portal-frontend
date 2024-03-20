import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PatientNav from "../components/patientNB";
import { UseToken } from "../pages/useToken";
import { jwtDecode } from "jwt-decode";

export default function Patient() {
    const { token } = UseToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.role !== "Patient") {
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
                <title>Patient</title>
            </Helmet>
            <PatientNav />
        </HelmetProvider>
    );
}
