import classes from "../active.module.css";
import {
    Paper,
    TextInput,
    Text,
    useMantineTheme,
    Grid,
    Title,
    Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useListState } from "@mantine/hooks";
import { UseToken } from "./useToken";
import { apiService } from "../ApiService";

export default function ManageUser() {
    const { token } = UseToken();
    const theme = useMantineTheme();
    const [users, { set, push, updateAt, removeAt }] = useListState([]);
    const [roles, setRoles] = useListState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await apiService.user(token);
                const roles = await apiService.role(token);
                set(users);
                setRoles(roles);
            } catch (err) {
                console.error(err);
                notifications.show({
                    title: "Error",
                    color: "red",
                    message: err.response.data,
                    classNames: classes,
                });
            }
        };
        fetchData();
    });

    // const createUser = async (username, password, role) => {
    //     try {
    //         const user = await apiService.createUser(username, password, role);
    //         push(user);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const updateUser = async (_id, username, password, role) => {
    //     try {
    //         const updatedUser = await apiService.updateUser(
    //             _id,
    //             username,
    //             password,
    //             role
    //         );
    //         const index = users.findIndex((user) => user._id === _id);
    //         updateAt(index, updatedUser);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const deleteUser = async (_id) => {
    //     try {
    //         await apiService.deleteUser(_id);
    //         const index = users.findIndex((user) => user._id === _id);
    //         removeAt(index);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const updateRole = async (userId, role) => {
    //     try {
    //         await apiService.updateRole(userId, role);
    //         const index = users.findIndex((user) => user._id === userId);
    //         const user = users[index];
    //         user.role = role;
    //         updateAt(index, user);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const revokeAccess = async (userId, permission) => {
    //     try {
    //         await apiService.revokeAccess(userId, permission);
    //         const index = users.findIndex((user) => user._id === userId);
    //         const user = users[index];
    //         const permIndex = user.permissions.indexOf(permission);
    //         if (permIndex > -1) {
    //             user.permissions.splice(permIndex, 1);
    //         }
    //         updateAt(index, user);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const restoreAccess = async (userId, permission) => {
    //     try {
    //         await apiService.restoreAccess(userId, permission);
    //         const index = users.findIndex((user) => user._id === userId);
    //         const user = users[index];
    //         user.permissions.push(permission);
    //         updateAt(index, user);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // Render your component here
    return <div>{/* Your HTML goes here */}</div>;
}
