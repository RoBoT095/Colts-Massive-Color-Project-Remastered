import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// Material UI Stuff Starts
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// Material UI Stuff Ends
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { drawerWidth } from "./NewPaletteForm";
import "./styles/PaletteFormNav.css";

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
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px",
    }),
}));

export default function PaletteFormNav(props) {
    useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
            return props.palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    const handleChange = (e) => {
        setNewPaletteName(e.target.value);
    };

    const {
        open,
        handleDrawerOpen,
        newPaletteName,
        setNewPaletteName,
        handleSubmit,
    } = props;

    return (
        <Box className="PaletteFormNav">
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
                </Toolbar>
                <div className="PFNav-navBtns">
                    <ValidatorForm
                        autoComplete="off"
                        onSubmit={() => handleSubmit(newPaletteName)}
                    >
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"
                            onChange={handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={[
                                "Enter a Palette Name",
                                "Name is already taken",
                            ]}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save Palette
                        </Button>
                    </ValidatorForm>
                    <Link to="/">
                        <Button variant="contained" color="secondary">
                            Go Back
                        </Button>
                    </Link>
                </div>
            </AppBar>
        </Box>
    );
}
