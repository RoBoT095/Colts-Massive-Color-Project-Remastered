import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import ColorBox from "./ColorBox";

export default function SingleColorPalette(props) {
    const [format, setFormat] = useState("hex");

    const gatherShades = (palette, colorToFilterBy) => {
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter((color) => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);
    };

    const changeFormat = (val) => {
        setFormat(val);
    };

    let _shades = gatherShades(props.palette, props.colorId);
    const { paletteName, emoji, id } = props.palette;
    const colorBoxes = _shades.map((color) => (
        <ColorBox
            key={color.name}
            name={color.name}
            background={color[format]}
            showLink={false}
        />
    ));
    return (
        <div className="SingleColorPalette Palette">
            <Navbar handleChange={changeFormat} showSlider={false} />
            <div className="Palette-colors">
                {colorBoxes}
                <div className="go-back ColorBox">
                    <Link to={`/palette/${id}`} className="back-button">
                        Go Back
                    </Link>
                </div>
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    );
}
