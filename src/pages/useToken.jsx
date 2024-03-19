// UseToken.js
import { useContext } from "react";
import { TokenContext } from "./TokenContext";

export function UseToken() {
    const context = useContext(TokenContext);
    if (context === undefined) {
        throw new Error("UseToken must be used within a TokenProvider");
    }
    return context;
}
