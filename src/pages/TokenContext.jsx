// TokenContext.jsx
import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a context for the token
export const TokenContext = createContext();

// Create a provider component for the token
export function TokenProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
}

TokenProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
