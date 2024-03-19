import { AppShell, Burger, Group, Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import classes from "../active.module.css";

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
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                </Group>
                <Title>Doctor</Title>
            </AppShell.Header>
            <AppShell.Navbar
                style={{
                    backgroundColor: "#A3BEE7",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "90%",
                    }}
                >
                    <Button.Group
                        orientation="vertical"
                        style={{
                            width: "100%",
                        }}
                    >
                        <Button
                            className={classes.navButton}
                            component={Link}
                            to="/doctor"
                        >
                            Dashboard
                        </Button>
                        <Button
                            className={classes.navButton}
                            component={Link}
                            to="/doctor/manage-appointment"
                        >
                            Manage Appointment
                        </Button>
                        <Button
                            className={classes.navButton}
                            component={Link}
                            to="/doctor/manage-patient"
                        >
                            Manage Patient
                        </Button>
                        <Button
                            className={classes.navButton}
                            component={Link}
                            to="/doctor/manage-prescription"
                        >
                            Manage Prescription
                        </Button>
                    </Button.Group>
                </div>
            </AppShell.Navbar>

            <AppShell.Main></AppShell.Main>
        </AppShell>
    );
}
