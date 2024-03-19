import { AppShell, Burger, Group, Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import classes from "../active.module.css";

export default function AdminNav() {
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
                    <Title className={classes.layoutTitle}>Admin</Title>
                </Group>
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
                            to="/admin"
                        >
                            Dashboard
                        </Button>
                        <Button
                            className={classes.navButton}
                            component={Link}
                            to="/admin/manage-user"
                        >
                            Manage User
                        </Button>
                        <Button
                            className={classes.navButton}
                            component={Link}
                            to="/admin/manage-appointment"
                        >
                            Manage Appointment
                        </Button>
                        <Button
                            className={classes.navButton}
                            component={Link}
                            to="/admin/manage-patient"
                        >
                            Manage Patient
                        </Button>
                        <Button
                            className={classes.navButton}
                            component={Link}
                            to="/admin/manage-prescription"
                        >
                            Manage Prescription
                        </Button>
                        <Button
                            className={classes.navButton}
                            component={Link}
                            to="/admin/appointment"
                        >
                            Appointment
                        </Button>
                        <Button
                            className={classes.navButton}
                            component={Link}
                            to="/admin/medical-record"
                        >
                            Medical Record
                        </Button>
                    </Button.Group>
                </div>
            </AppShell.Navbar>

            <AppShell.Main></AppShell.Main>
        </AppShell>
    );
}
