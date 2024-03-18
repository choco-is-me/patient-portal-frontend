import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import classes from "./active.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider, createTheme, Title } from "@mantine/core";
import { TokenProvider } from "./pages/TokenContext";
import Public from "./layouts/public";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./layouts/admin";
import Doctor from "./layouts/doctor";
import Patient from "./layouts/patient";
import AdminDash from "./pages/admin/adminDB";
import DoctorDash from "./pages/doctor/doctorDB";
import PatientDash from "./pages/patient/patientDB";
import ManageUser from "./pages/admin/manageUser";
import ManageAppointment from "./pages/doctor/manageAppointment";
import ManagePatient from "./pages/doctor/managePatient";
import ManagePrescription from "./pages/doctor/managePrescription";
import Appointment from "./pages/patient/appointment";
import MedicalRecord from "./pages/patient/medicalRecord";

const theme = createTheme({
    activeClassName: classes.active,
    fontFamily: "Verdana, sans-serif",
    autoContrast: true,
    luminanceThreshold: 0.25,
    cursorType: "pointer",
    components: {
        Title: Title.extend({
            classNames: {
                root: classes.heading,
            },
        }),
    },
});

export default function App() {
    return (
        <MantineProvider theme={theme}>
            {
                <TokenProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Public />}>
                                <Route index element={<Login />} />
                                <Route path="register" element={<Register />} />
                            </Route>
                            <Route path="/admin" element={<Admin />}>
                                <Route index element={<AdminDash />} />
                                <Route path="user" element={<ManageUser />} />
                            </Route>
                            <Route path="/doctor" element={<Doctor />}>
                                <Route index element={<DoctorDash />} />
                                <Route
                                    path="appointment"
                                    element={<ManageAppointment />}
                                />
                                <Route
                                    path="patient"
                                    element={<ManagePatient />}
                                />
                                <Route
                                    path="prescription"
                                    element={<ManagePrescription />}
                                />
                            </Route>
                            <Route path="/patient" element={<Patient />}>
                                <Route index element={<PatientDash />} />
                                <Route
                                    path="appointment"
                                    element={<Appointment />}
                                />
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
