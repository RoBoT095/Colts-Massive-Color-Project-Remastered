import React from "react";
import "./styles/Page.css";

export default function Page({ children }) {
    return <section className="page">{children}</section>;
}
