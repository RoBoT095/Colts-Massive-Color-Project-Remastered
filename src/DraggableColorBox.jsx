import React from "react";
import "./styles/DraggableColorBox.css";

export default function DraggableColorBox(props) {
    return (
        <div
            className="DraggableColorBox"
            style={{ backgroundColor: props.color }}
        >
            {props.name}
        </div>
    );
}
