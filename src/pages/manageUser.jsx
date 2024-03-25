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
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { UseToken } from "./useToken";
import { apiService } from "../ApiService";

export default function ManageUser() {
    const { token } = UseToken();
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const [tableData, setTableData] = useState({
        head: ["Select", "Username", "Role", "Permission", "UserID"],
        body: [],
    });

    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await apiService.user(token);
                const rolesData = await apiService.role(token);
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
                                            return selectedRows.filter(
                                                (id) => id !== user._id
                                            );
                                        } else {
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
                                View Permissions
                            </Button>,
                            <span
                                key={`userid-${index}`}
                                className={classes.blurTextOnHover}
                            >
                                {user._id}
                            </span>,
                        ];
                    });
                    setTableData((prevState) => ({
                        ...prevState,
                        body: tableBody,
                    }));
                }
            } catch (err) {
                if (
                    err.response.data === "Token is expired" ||
                    err.response.data === "Invalid fingerprint"
                ) {
                    sessionStorage.clear("token", token);
                    window.location.reload();
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
    }, [open, selectedRows, token]);

    return (
        <div>
            <Paper shadow="xl" radius="md" withBorder p="xl">
                <Title
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: theme.spacing.xl,
                    }}
                    order={2}
                >
                    Manage Users
                </Title>
                <Table horizontalSpacing="sm" data={tableData} />
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
