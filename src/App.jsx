import "./App.css";
import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MantineProvider, createTheme } from "@mantine/core";
import Public from "./layouts/public";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./layouts/admin";
import Doctor from "./layouts/doctor";
import Patient from "./layouts/patient";
import AdminDash from "./components/adminDB";
import DoctorDash from "./components/doctorDB";
import PatientDash from "./components/patientDB";

export default function App() {
    Axios.defaults.baseURL = "http://localhost:3000/";
    const theme = createTheme({
        fontFamily: "Open Sans, sans-serif",
        primaryColor: "cyan",
    });
    return (
        <MantineProvider theme={theme}>
            {
                <>
                    <ToastContainer
                        style={{ width: "fit-content", minWidth: "250px" }}
                    />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Public />}>
                                <Route index element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                            </Route>
                            <Route path="/admin" element={<Admin />}>
                                <Route index element={<AdminDash />} />
                            </Route>
                            <Route path="/doctor" element={<Doctor />}>
                                <Route index element={<DoctorDash />} />
                            </Route>
                            <Route path="/patient" element={<Patient />}>
                                <Route index element={<PatientDash />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </>
            }
        </MantineProvider>
    );
}
