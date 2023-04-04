import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import "./styles/PaletteList.css";

export default class PaletteList extends Component {
    render() {
        const { palettes, deletePalette } = this.props;
        return (
            <div className="PaletteList-root">
                <div className="PaletteList-container">
                    <nav className="PaletteList-nav">
                        <h1 className="PaletteList-heading">React Colors</h1>
                        <Link to="/palette/new" className="PaletteList-new">
                            Create Palette
                        </Link>
                    </nav>
                    <div className="PaletteList-palettes">
                        {palettes.map((palette) => (
                            <MiniPalette
                                {...palette}
                                key={palette.id}
                                id={palette.id}
                                handleDelete={deletePalette}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
