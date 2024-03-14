// useToken.js
import { useContext } from "react";
import { TokenContext } from "./TokenContext";

export function useToken() {
    const context = useContext(TokenContext);
    if (context === undefined) {
        throw new Error("useToken must be used within a TokenProvider");
    }
    return context;
}
