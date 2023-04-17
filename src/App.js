import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import Page from "./Page";
import "./styles/App.css";

import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

export default function App() {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    const [palettes, setPalettes] = useState(savedPalettes || seedColors);

    const findPalette = (id) => {
        return palettes.find((palette) => palette.id === id);
    };

    const deletePalette = (id) => {
        setPalettes(palettes.filter((palette) => palette.id !== id));
    };

    const PaletteWrapper = () => {
        const { id } = useParams();
        const palette = generatePalette(findPalette(id));
        return <Palette palette={palette} />;
    };

    const SingleColorWrapper = () => {
        const { paletteId, colorId } = useParams();
        const palette = generatePalette(findPalette(paletteId));
        return <SingleColorPalette palette={palette} colorId={colorId} />;
    };

    const savePalette = (newPalette) => {
        setPalettes(palettes.concat(newPalette));
    };

    useEffect(() => {
        window.localStorage.setItem("palettes", JSON.stringify(palettes));
    }, [palettes]);

    const location = useLocation();
    return (
        <TransitionGroup className="App" location={location}>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
                <Routes location={location}>
                    <Route
                        index
                        path="/"
                        element={
                            <Page>
                                <PaletteList
                                    palettes={palettes}
                                    deletePalette={deletePalette}
                                />
                            </Page>
                        }
                    />
                    <Route
                        path="/palette/new"
                        element={
                            <Page>
                                <NewPaletteForm
                                    savePalette={savePalette}
                                    palettes={palettes}
                                />
                            </Page>
                        }
                    />
                    <Route
                        path="/palette/:id"
                        element={
                            <Page>
                                <PaletteWrapper />
                            </Page>
                        }
                    />
                    <Route
                        path="/palette/:paletteId/:colorId"
                        element={
                            <Page>
                                <SingleColorWrapper />
                            </Page>
                        }
                    />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}
