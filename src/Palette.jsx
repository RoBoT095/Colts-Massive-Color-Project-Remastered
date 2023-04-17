import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./styles/Palette.css";

export default function Palette(props) {
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState("hex");

    const changeLevel = (level) => {
        setLevel(level);
    };
    const changeFormat = (val) => {
        setFormat(val);
    };

    const { colors, paletteName, emoji, id } = props.palette;
    const colorBoxes = colors[level].map((color) => (
        <ColorBox
            background={color[format]}
            name={color.name}
            key={color.id}
            moreUrl={`/palette/${id}/${color.id}`}
            showLink={true}
        />
    ));

    return (
        <div className="Palette">
            <Navbar
                level={level}
                changeLevel={changeLevel}
                handleChange={changeFormat}
                showSlider={true}
            />
            <div className="Palette-colors">{colorBoxes}</div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    );
}
