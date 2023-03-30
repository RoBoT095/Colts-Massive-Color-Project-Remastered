import React, { useState, useEffect } from "react";
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
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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
    const [currentColor, setCurrentColor] = useState("#EF5959");
    const [newColorName, setNewColorName] = useState("");
    const [colors, setColors] = useState(props.palettes[0].colors);
    const [newPaletteName, setNewPaletteName] = useState("");

    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isColorUnique", () => {
            return colors.every(
                ({ color }) =>
                    color.toLowerCase() !== currentColor.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
            return props.palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    const handleDrawerOpen = () => setOpen(true);

    const handleDrawerClose = () => setOpen(false);

    const handleChangeComplete = (color) => setCurrentColor(color.hex);

    const addNewColor = (e) => {
        e.preventDefault();
        const newColor = {
            color: currentColor,
            name: newColorName,
        };
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

    const handleSubmit = (newPaletteName) => {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors: colors,
        };
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
                <Typography variant="h4">Design Your Palette</Typography>
                <div>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={clearColors}
                    >
                        Clear Palette
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addRandomColor}
                        disabled={paletteIsFull}
                    >
                        Random Color
                    </Button>
                </div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={handleChangeComplete}
                />
                <ValidatorForm autoComplete="off" onSubmit={addNewColor}>
                    <TextValidator
                        id="filled-error-helper-text"
                        label="Color Name"
                        value={newColorName}
                        name="newColorName"
                        onChange={(e) => setNewColorName(e.target.value)}
                        variant="filled"
                        validators={[
                            "required",
                            "isColorNameUnique",
                            "isColorUnique",
                        ]}
                        errorMessages={[
                            "Color name is required",
                            "Name must be unique",
                            "You already used this color",
                        ]}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={paletteIsFull}
                        style={{
                            backgroundColor: paletteIsFull
                                ? "grey"
                                : currentColor,
                        }}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
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
