import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles/PaletteList.css";

export default function PaletteList(props) {
    const { palettes, deletePalette } = props;
    return (
        <div className="PaletteList-root">
            <div className="PaletteList-container">
                <nav className="PaletteList-nav">
                    <h1 className="PaletteList-heading">React Colors</h1>
                    <Link to="/palette/new" className="PaletteList-new">
                        Create Palette
                    </Link>
                </nav>
                <TransitionGroup className="PaletteList-palettes">
                    {palettes.map((palette) => (
                        <CSSTransition
                            key={palette.id}
                            timeout={500}
                            classNames="fade"
                        >
                            <MiniPalette
                                {...palette}
                                key={palette.id}
                                id={palette.id}
                                handleDelete={deletePalette}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>
    );
}
