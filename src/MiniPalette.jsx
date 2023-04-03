import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles/MiniPalette.css";

export default function MiniPalette({ paletteName, emoji, colors, id }) {
    const history = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        history(`/palette/${id}`);
    };

    const miniColorBoxes = colors.map((color) => (
        <div
            className="MiniPalette-miniColor"
            style={{ backgroundColor: color.color }}
            key={color.name}
        ></div>
    ));
    return (
        <div className="MiniPalette-root" onClick={handleClick}>
            <div className="MiniPalette-delete">
                <DeleteIcon className="MiniPalette-deleteIcon" />
            </div>
            <div className="MiniPalette-colors">{miniColorBoxes}</div>
            <h5 className="MiniPalette-title">
                {paletteName} <span className="MiniPalette-emoji">{emoji}</span>
            </h5>
        </div>
    );
}
