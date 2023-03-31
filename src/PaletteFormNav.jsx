import React from "react";
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
import { drawerWidth } from "./NewPaletteForm";
import PaletteMetaForm from "./PaletteMetaForm";
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
    const {
        open,
        handleDrawerOpen,
        palettes,
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
                    <PaletteMetaForm
                        palettes={palettes}
                        newPaletteName={newPaletteName}
                        setNewPaletteName={setNewPaletteName}
                        handleSubmit={handleSubmit}
                    />
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
