import React from "react";

export default function PaletteFooter(props) {
    const { paletteName, emoji } = props;
    return (
        <footer className="Palette-footer">
            {paletteName}
            <span className="emoji">{emoji}</span>
        </footer>
    );
}
