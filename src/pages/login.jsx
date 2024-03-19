import classes from "../active.module.css";
import {
    Paper,
    TextInput,
    Text,
    useMantineTheme,
    Grid,
    Title,
    PasswordInput,
    Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useSetState } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { UseToken } from "./useToken";
import { apiService } from "../ApiService";

export default function Login() {
    const theme = useMantineTheme();
    const { setToken } = UseToken();
    const [state, setState] = useSetState({
        username: "",
        password: "",
        error: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state.username || !state.password) {
            notifications.show({
                title: "Error",
                color: "red",
                message: "Please fill in the required fields.",
                classNames: classes,
            });
            return;
        }
        try {
            const token = await apiService.login(
                state.username,
                state.password
            );
            sessionStorage.setItem("token", token); // Store token in sessionStorage
            setToken(token); // Update the token in the context
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

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#A3BEE7",
            }}
        >
            <Grid>
                <Grid.Col span={12} sm={8} md={6} lg={4} xl={3}>
                    <Paper
                        padding="xl"
                        shadow="xl"
                        style={{
                            maxWidth: "480px",
                            width: "480px",
                            minHeight: "450px",
                            height: "450px",
                            padding: "20px",
                            borderRadius: "50px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            backgroundColor: "#F6FBF9",
                        }}
                    >
                        <Title
                            className={classes.heading}
                            align="center"
                            style={{
                                marginBottom: theme.spacing.sm,
                            }}
                        >
                            Login
                        </Title>
                        <Text
                            align="center"
                            size="sm"
                            lineClamp={2}
                            style={{
                                marginBottom: theme.spacing.lg,
                            }}
                        >
                            Log in to help you utilize most out of this
                            <br />
                            medical portal
                        </Text>
                        <form onSubmit={handleSubmit}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextInput
                                    label="Username"
                                    placeholder="Enter your username"
                                    size="md"
                                    withAsterisk
                                    value={state.username}
                                    onChange={(event) =>
                                        setState({
                                            username: event.currentTarget.value,
                                        })
                                    }
                                    style={{
                                        marginBottom: theme.spacing.sm,
                                        width: "80%",
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <PasswordInput
                                    label="Password"
                                    placeholder="Enter your password"
                                    size="md"
                                    withAsterisk
                                    value={state.password}
                                    onChange={(event) =>
                                        setState({
                                            password: event.currentTarget.value,
                                        })
                                    }
                                    style={{
                                        marginBottom: theme.spacing.lg,
                                        width: "80%",
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    variant="filled"
                                    color="#3165BF"
                                    type="submit"
                                    size="lg"
                                    radius="lg"
                                    className={classes.authButton}
                                >
                                    Log in
                                </Button>
                            </div>
                        </form>
                        <Text
                            align="center"
                            size="sm"
                            style={{ marginTop: theme.spacing.sm }}
                        >
                            You are a new patient?{" "}
                            <Link
                                to="/register"
                                size="sm"
                                variant="link"
                                color="blue"
                            >
                                Register here!
                            </Link>
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    );
}
