import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Material UI Stuff Starts
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import TextField from "@mui/material/TextField";
// Material UI Stuff Ends
import DraggableColorBox from "./DraggableColorBox";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const drawerWidth = 400;

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

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function NewPaletteForm(props) {
    const [open, setOpen] = useState(true);
    const [currentColor, setCurrentColor] = useState("#EF5959");
    const [newName, setNewName] = useState("");
    const [colors, setColors] = useState([]);

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
    });

    const handleDrawerOpen = () => setOpen(true);

    const handleDrawerClose = () => setOpen(false);

    const handleChangeComplete = (color) => setCurrentColor(color.hex);

    const addNewColor = (e) => {
        e.preventDefault();
        const newColor = {
            color: currentColor,
            name: newName,
        };
        setColors(colors.concat(newColor));
    };

    const handleChange = (e) => setNewName(e.target.value);

    const navigate = useNavigate();

    const handleSubmit = () => {
        let newName = "New Test Palette";
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, "-"),
            colors: colors,
        };
        props.savePalette(newPalette);
        navigate("/");
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} color="default">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Create New Palette
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Save Palette
                    </Button>
                </Toolbar>
            </AppBar>
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
                    <Button variant="contained" color="secondary">
                        Clear Palette
                    </Button>
                    <Button variant="contained" color="primary">
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
                        value={newName}
                        onChange={handleChange}
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
                        color="primary"
                        type="submit"
                        style={{ backgroundColor: currentColor }}
                    >
                        Add Color
                    </Button>
                </ValidatorForm>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {colors.map((color) => (
                    <DraggableColorBox color={color.color} name={color.name} />
                ))}
            </Main>
        </Box>
    );
}
