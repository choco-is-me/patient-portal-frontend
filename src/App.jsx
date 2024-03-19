import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import classes from "./active.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { TokenProvider } from "./pages/TokenContext";
import Public from "./layouts/public";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./layouts/admin";
import Doctor from "./layouts/doctor";
import Patient from "./layouts/patient";
import ManageUser from "./pages/manageUser";
import ManageAppointment from "./pages/manageAppointment";
import ManagePatient from "./pages/managePatient";
import ManagePrescription from "./pages/managePrescription";
import Appointment from "./pages/appointment";
import MedicalRecord from "./pages/medicalRecord";

const theme = createTheme({
    activeClassName: classes.active,
    fontFamily: "Verdana, sans-serif",
    autoContrast: true,
    luminanceThreshold: 0.25,
    cursorType: "pointer",
    components: {},
});

export default function App() {
    return (
        <MantineProvider theme={theme}>
            {
                <TokenProvider>
                    <Notifications position="top-right" zIndex={1000} />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Public />}>
                                <Route index element={<Login />} />
                                <Route path="register" element={<Register />} />
                            </Route>
                            <Route path="/admin" element={<Admin />}>
                                <Route index element={<ManageUser />} />
                                <Route
                                    path="manage-appointment"
                                    element={<ManageAppointment />}
                                />
                                <Route
                                    path="manage-patient"
                                    element={<ManagePatient />}
                                />
                                <Route
                                    path="manage-prescription"
                                    element={<ManagePrescription />}
                                />
                                <Route
                                    path="appointment"
                                    element={<Appointment />}
                                />
                                <Route
                                    path="medical-record"
                                    element={<MedicalRecord />}
                                />
                            </Route>
                            <Route path="/doctor" element={<Doctor />}>
                                <Route index element={<ManageAppointment />} />
                                <Route
                                    path="manage-patient"
                                    element={<ManagePatient />}
                                />
                                <Route
                                    path="manage-prescription"
                                    element={<ManagePrescription />}
                                />
                            </Route>
                            <Route path="/patient" element={<Patient />}>
                                <Route index element={<Appointment />} />
                                <Route
                                    path="medical-record"
                                    element={<MedicalRecord />}
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </TokenProvider>
            }
        </MantineProvider>
    );
}
