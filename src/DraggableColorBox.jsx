import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles/DraggableColorBox.css";

export default function DraggableColorBox(props) {
    const { color, name, handleClick } = props;
    return (
        <div className="DraggableColorBox" style={{ backgroundColor: color }}>
            <div className="DCB-boxContent">
                <span>{name}</span>
                <DeleteIcon className="DCB-deleteIcon" onClick={handleClick} />
            </div>
        </div>
    );
}
