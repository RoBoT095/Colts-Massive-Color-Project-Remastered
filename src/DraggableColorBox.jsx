import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles/DraggableColorBox.css";

export default function DraggableColorBox(props) {
    return (
        <div
            className="DraggableColorBox"
            style={{ backgroundColor: props.color }}
        >
            <div className="DCB-boxContent">
                <span>{props.name}</span>
                <DeleteIcon className="DCB-deleteIcon" />
            </div>
        </div>
    );
}
