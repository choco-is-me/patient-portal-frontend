import { useState, useEffect } from "react";
import classes from "../active.module.css";
import { Paper, useMantineTheme, Title, Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { UseToken } from "./useToken";
import { apiService } from "../ApiService";

export default function ManageUser() {
    const { token } = UseToken();
    const theme = useMantineTheme();

    const [tableData, setTableData] = useState({
        head: ["Username", "Role", "Permission", "UserID"],
        body: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await apiService.user(token);
                const rolesData = await apiService.role(token);
                if (usersData && rolesData) {
                    const tableBody = usersData.map((user) => {
                        const userRole = rolesData.find(
                            (role) => role._id === user.role._id
                        );
                        return [
                            user.username,
                            userRole.name,
                            userRole.permissions.join(", "),
                            user._id,
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
                <Table horizontalSpacing="xl" data={tableData} />
            </Paper>
        </div>
    );
}
