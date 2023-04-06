import React, { PureComponent } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles/MiniPalette.css";

function MiniPalette({ paletteName, emoji, colors, id, openDialog }) {
    const history = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        history(`/palette/${id}`);
    };

    const deletePaletteDialog = (e) => {
        e.stopPropagation();
        openDialog(id);
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
            <DeleteIcon
                className="MiniPalette-deleteIcon"
                onClick={deletePaletteDialog}
            />
            <div className="MiniPalette-colors">{miniColorBoxes}</div>
            <h5 className="MiniPalette-title">
                {paletteName} <span className="MiniPalette-emoji">{emoji}</span>
            </h5>
        </div>
    );
}
export default React.memo(MiniPalette, () => true);
