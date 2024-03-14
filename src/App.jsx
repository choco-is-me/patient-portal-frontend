import "./App.css";
import "@mantine/core/styles.css";
import classes from "./active.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MantineProvider, createTheme } from "@mantine/core";
import { TokenProvider } from "./pages/TokenContext";
import Axios from "axios";
import Public from "./layouts/public";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./layouts/admin";
import Doctor from "./layouts/doctor";
import Patient from "./layouts/patient";
import AdminDash from "./pages/admin/adminDB";
import DoctorDash from "./pages/doctor/doctorDB";
import PatientDash from "./pages/patient/patientDB";
import manageUser from "./pages/admin/manageUser";
import manageAppointment from "./pages/doctor/manageAppointment";
import managePatient from "./pages/doctor/managePatient";
import managePrescription from "./pages/doctor/managePrescription";
import appointment from "./pages/patient/appointment";
import medicalRecord from "./pages/patient/medicalRecord";

const theme = createTheme({
    activeClassName: classes.active,
    fontFamily: "Verdana, sans-serif",
    autoContrast: true,
    luminanceThreshold: 0.25,
    cursorType: "pointer",
});

export default function App() {
    Axios.defaults.baseURL = "http://localhost:3000/";
    return (
        <MantineProvider theme={theme}>
            {
                <TokenProvider>
                    <ToastContainer
                        style={{ width: "fit-content", minWidth: "250px" }}
                    />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Public />}>
                                <Route index element={<Login />} />
                                <Route path="register" element={<Register />} />
                            </Route>
                            <Route path="/admin" element={<Admin />}>
                                <Route index element={<AdminDash />} />
                                <Route path="user" element={<manageUser />} />
                            </Route>
                            <Route path="/doctor" element={<Doctor />}>
                                <Route index element={<DoctorDash />} />
                                <Route
                                    path="appointment"
                                    element={<manageAppointment />}
                                />
                                <Route
                                    path="patient"
                                    element={<managePatient />}
                                />
                                <Route
                                    path="prescription"
                                    element={<managePrescription />}
                                />
                            </Route>
                            <Route path="/patient" element={<Patient />}>
                                <Route index element={<PatientDash />} />
                                <Route
                                    path="appointment"
                                    element={<appointment />}
                                />
                                <Route
                                    path="medical-record"
                                    element={<medicalRecord />}
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </TokenProvider>
            }
        </MantineProvider>
    );
}
