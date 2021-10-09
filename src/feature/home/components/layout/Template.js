import React      from "react";
import { Navbar } from "./Navbar";

export const Template = props => {
    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    );
}