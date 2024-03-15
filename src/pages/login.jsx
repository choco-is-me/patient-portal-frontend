import {
    Paper,
    TextInput,
    Button,
    Text,
    useMantineTheme,
    Grid,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { useToken } from "./useToken";
import { apiService } from "../ApiService";

export default function Login() {
    const theme = useMantineTheme();
    const { setToken } = useToken();
    const [state, setState] = useSetState({
        username: "",
        password: "",
        error: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await apiService.login(
                state.username,
                state.password
            );
            sessionStorage.setItem("token", token); // Store token in sessionStorage
            setToken(token); // Update the token in the context
        } catch (err) {
            setState({ error: "Failed to login" });
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
                        shadow="sm"
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
                        <Text
                            align="center"
                            size="35px"
                            fw={900}
                            variant="gradient"
                            gradient={{ from: "violet", to: "cyan", deg: 90 }}
                            style={{
                                marginBottom: theme.spacing.sm,
                                lineHeight: 1.3,
                            }}
                        >
                            Login
                        </Text>
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
                                    placeholder="Enter your username"
                                    size="md"
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
                                <TextInput
                                    placeholder="Enter your password"
                                    size="md"
                                    type="password"
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
                                    style={{ width: "55%" }}
                                >
                                    Log in
                                </Button>
                            </div>
                        </form>

                        {state.error && (
                            <Text
                                c="red"
                                size="sm"
                                style={{ marginTop: theme.spacing.sm }}
                            >
                                {state.error}
                            </Text>
                        )}
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    );
}
