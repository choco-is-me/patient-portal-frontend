import {
    Paper,
    TextInput,
    Button,
    Text,
    useMantineTheme,
    Grid,
    PasswordInput,
    Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useSetState } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { apiService } from "../ApiService";

export default function Register() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const [state, setState] = useSetState({
        username: "",
        password: "",
        dateOfBirth: null,
        homeAddress: "",
        phoneNumber: "",
        error: "",
    });
    const [dateState, setDateState] = useSetState({
        dateOfBirth: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword(state.password)) {
            setState({
                error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
            });
            return;
        }
        try {
            const response = await apiService.register(
                state.username,
                state.password,
                state.dateOfBirth,
                state.homeAddress,
                state.phoneNumber
            );
            if (response.status === 200) {
                navigate("/");
            }
        } catch (err) {
            setState({ error: err.response.data });
        }
    };

    const validatePassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return regex.test(password);
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
                            minHeight: "660px",
                            height: "660px",
                            padding: "20px",
                            borderRadius: "50px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            backgroundColor: "#F6FBF9",
                        }}
                    >
                        <Title
                            align="center"
                            style={{
                                marginBottom: theme.spacing.sm,
                            }}
                        >
                            Register
                        </Title>
                        <Text
                            align="center"
                            size="sm"
                            lineClamp={2}
                            style={{
                                marginBottom: theme.spacing.lg,
                            }}
                        >
                            Create an account to help you utilize most out of
                            this
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
                                        marginBottom: theme.spacing.sm,
                                        width: "80%",
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "relative", // add relative positioning to the parent div
                                }}
                            >
                                <DatePickerInput
                                    label="Date of birth"
                                    placeholder="mm/dd/yyyy"
                                    style={{
                                        marginBottom: theme.spacing.sm,
                                        width: "80%",
                                        zIndex: 1, // ensure the TextInput appears above the invisible button
                                    }}
                                    value={dateState.dateOfBirth}
                                    onChange={(date) => {
                                        setDateState({ dateOfBirth: date });
                                        setState({ dateOfBirth: date });
                                    }}
                                    format="MM/DD/YYYY"
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextInput
                                    label="Home Address"
                                    placeholder="Enter your home address"
                                    size="md"
                                    value={state.homeAddress}
                                    onChange={(event) =>
                                        setState({
                                            homeAddress:
                                                event.currentTarget.value,
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
                                    label="Phone Number"
                                    placeholder="Enter your phone number"
                                    size="md"
                                    value={state.phoneNumber}
                                    onChange={(event) =>
                                        setState({
                                            phoneNumber:
                                                event.currentTarget.value,
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
                                    Register
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

                        <Text
                            align="center"
                            size="sm"
                            style={{ marginTop: theme.spacing.sm }}
                        >
                            Already got an account?{" "}
                            <Link to="/" size="sm" variant="link" color="blue">
                                Login here!
                            </Link>
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    );
}
