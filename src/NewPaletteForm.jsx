import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Material UI Stuff Starts
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// Material UI Stuff Ends
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import "./styles/NewPaletteForm.css";

export const drawerWidth = 350;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function NewPaletteForm(props) {
    const defaultProps = {
        maxColors: 20,
    };

    const [open, setOpen] = useState(true);
    const [colors, setColors] = useState(props.palettes[0].colors);
    const [newPaletteName, setNewPaletteName] = useState("");

    const handleDrawerOpen = () => setOpen(true);

    const handleDrawerClose = () => setOpen(false);

    const addNewColor = (newColor) => {
        setColors(colors.concat(newColor));
    };

    const clearColors = () => {
        setColors([]);
    };

    const addRandomColor = () => {
        const allColors = props.palettes.map((p) => p.colors).flat();
        var rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        setColors(colors.concat(randomColor));
    };

    const navigate = useNavigate();

    const handleSubmit = (newPalette) => {
        newPalette.id = newPaletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = colors;
        props.savePalette(newPalette);
        navigate("/");
    };

    const removeColor = (colorName) => {
        setColors(colors.filter((color) => color.name !== colorName));
    };

    const paletteIsFull = colors.length >= defaultProps.maxColors;

    const { palettes } = props;

    return (
        <Box sx={{ display: "flex" }}>
            <PaletteFormNav
                drawerWidth={drawerWidth}
                open={open}
                palettes={palettes}
                handleDrawerOpen={handleDrawerOpen}
                newPaletteName={newPaletteName}
                setNewPaletteName={setNewPaletteName}
                handleSubmit={handleSubmit}
            />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        display: "flex",
                        alignItems: "center",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <div className="NPF-container">
                    <Typography variant="h4" gutterBottom>
                        Design Your Palette
                    </Typography>
                    <div className="NPF-buttons">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={clearColors}
                            className="NPF-button"
                        >
                            Clear Palette
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addRandomColor}
                            disabled={paletteIsFull}
                            className="NPF-button"
                        >
                            Random Color
                        </Button>
                    </div>
                    <ColorPickerForm
                        colors={colors}
                        paletteIsFull={paletteIsFull}
                        addNewColor={addNewColor}
                    />
                </div>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <DraggableColorList
                    colors={colors}
                    setColors={setColors}
                    removeColor={removeColor}
                />
            </Main>
        </Box>
    );
}
