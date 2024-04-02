import { useState, useEffect } from "react";
import classes from "../active.module.css";
import {
    Paper,
    useMantineTheme,
    Title,
    Table,
    Modal,
    Button,
    Checkbox,
} from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { IconEdit, IconTrash, IconCirclePlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { UseToken } from "./useToken";
import { apiService } from "../ApiService";

export default function ManageUser() {
    const { token } = UseToken();
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedRows, setSelectedRows] = useState([]);

    // Add these new state variables
    const [usersData, setUsersData] = useState(null);
    const [rolesData, setRolesData] = useState(null);

    const [tableData, setTableData] = useState({
        head: ["Select", "Username", "Role", "Permission", "Action"],
        body: [],
    });

    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await apiService.user(token);
                const rolesData = await apiService.role(token);
                if (usersData && rolesData) {
                    setUsersData(usersData);
                    setRolesData(rolesData);
                }
            } catch (err) {
                if (
                    err.response.data === "Token is expired" ||
                    err.response.data === "Invalid fingerprint"
                ) {
                    sessionStorage.clear("token", token);
                    // window.location.reload();
                }
                notifications.show({
                    title: "Error",
                    color: "red",
                    message: err.response.data,
                    classNames: classes,
                });
            }
        };
        fetchData();
    }, [token]);

    useEffect(() => {
        if (usersData && rolesData) {
            const tableBody = usersData.map((user, index) => {
                const userRole = rolesData.find(
                    (role) => role._id === user.role._id
                );
                return [
                    <Checkbox
                        key={user._id}
                        checked={selectedRows.includes(user._id)}
                        onChange={() => {
                            setSelectedRows((selectedRows) => {
                                if (selectedRows.includes(user._id)) {
                                    console.log(
                                        `Deselected user: ${user.username}`
                                    );
                                    return selectedRows.filter(
                                        (id) => id !== user._id
                                    );
                                } else {
                                    console.log(
                                        `Selected user: ${user.username}`
                                    );
                                    return [...selectedRows, user._id];
                                }
                            });
                        }}
                    />,

                    user.username,
                    userRole.name,
                    <Button
                        key={index}
                        onClick={() => {
                            setPermissions(userRole.permissions);
                            open();
                        }}
                    >
                        Manage Permissions
                    </Button>,
                    selectedRows.includes(user._id) && (
                        <ActionIcon.Group key={`userid-${index}`}>
                            <ActionIcon
                                variant="filled"
                                color="orange"
                                size="lg"
                                aria-label="Edit"
                            >
                                <IconEdit style={{ width: 20 }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon
                                variant="filled"
                                color="red"
                                size="lg"
                                aria-label="Delete"
                            >
                                <IconTrash style={{ width: 20 }} stroke={1.5} />
                            </ActionIcon>
                        </ActionIcon.Group>
                    ),
                ];
            });
            setTableData((prevState) => ({
                ...prevState,
                body: tableBody,
            }));
        }
    }, [open, selectedRows, usersData, rolesData]);

    return (
        <div>
            <Paper shadow="xl" radius="md" withBorder p="xl">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: theme.spacing.lg,
                    }}
                >
                    <Title order={2}>Manage Users</Title>
                    <ActionIcon
                        variant="filled"
                        color="green"
                        size="lg"
                        aria-label="Add"
                        style={{ marginLeft: theme.spacing.sm }}
                    >
                        <IconCirclePlus style={{ width: 20 }} stroke={1.5} />
                    </ActionIcon>
                </div>
                <Table
                    stickyHeader
                    stickyHeaderOffset={60}
                    striped
                    highlightOnHover
                    data={tableData}
                />
                <Modal
                    opened={opened}
                    onClose={close}
                    title="Permissions"
                    centered
                >
                    {permissions.join(", ")}
                </Modal>
            </Paper>
        </div>
    );
}
