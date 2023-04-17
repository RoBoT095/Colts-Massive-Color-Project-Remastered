import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import chroma from "chroma-js";
import "./styles/DraggableColorBox.css";

export default function DraggableColorBox(props) {
    const { color, name, handleClick } = props;

    const isDarkColor = chroma(color).luminance() <= 0.08;
    return (
        <div className="DraggableColorBox" style={{ backgroundColor: color }}>
            <div className="DCB-boxContent">
                <span className={isDarkColor ? "light-text" : ""}>{name}</span>
                <DeleteIcon className="DCB-deleteIcon" onClick={handleClick} />
            </div>
        </div>
    );
}
