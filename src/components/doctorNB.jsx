import { AppShell, Burger, Group, Title, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import classes from "../active.module.css";
import { Outlet } from "react-router-dom";
import {
    IconHome2,
    IconCalendarClock,
    IconEmergencyBed,
    IconPill,
} from "@tabler/icons-react";

export default function DoctorNav() {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
            style={{
                backgroundColor: "#A3BEE7",
            }}
        >
            <AppShell.Header
                style={{
                    backgroundColor: "#A3BEE7",
                }}
            >
                <Group
                    h="100%"
                    px="md"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Title className={classes.layoutTitle}>
                        2B Medical Portal
                    </Title>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar
                style={{
                    backgroundColor: "#A3BEE7",
                }}
            >
                <NavLink
                    component={Link}
                    to="/doctor"
                    label="Doctor Home"
                    leftSection={<IconHome2 size="1rem" stroke={1.5} />}
                    autoContrast
                />
                <NavLink
                    component={Link}
                    to="/doctor"
                    label="Manage Appointment"
                    leftSection={<IconCalendarClock size="1rem" stroke={1.5} />}
                    autoContrast
                />
                <NavLink
                    component={Link}
                    to="/doctor/manage-patient"
                    label="Manage Patient"
                    leftSection={<IconEmergencyBed size="1rem" stroke={1.5} />}
                    autoContrast
                />
                <NavLink
                    component={Link}
                    to="/doctor/manage-prescription"
                    label="Manage Prescription"
                    leftSection={<IconPill size="1rem" stroke={1.5} />}
                    autoContrast
                />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
