import React, { Component } from "react";
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
import TextField from "@mui/material/TextField";
// Material UI Stuff Ends
import DraggableColorBox from "./DraggableColorBox";
import { ChromePicker } from "react-color";

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

export default class NewPaletteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            pickerColor: "#EF5959",
            newName: "",
            colors: [],
        };
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleChangeComplete = (color) => {
        this.setState({ pickerColor: color.hex });
    };

    addNewColor(evt) {
        evt.preventDefault();
        const newColor = {
            color: this.state.pickerColor,
            name: this.state.newName,
        };
        if (
            this.state.colors.every(
                ({ name }) =>
                    name.toLowerCase() !== this.state.newName.toLowerCase()
            ) &&
            this.state.colors.every(
                ({ color }) =>
                    color.toLowerCase() !== this.state.pickerColor.toLowerCase()
            )
        ) {
            this.setState({
                colors: [...this.state.colors, newColor],
            });
        } else {
            alert("Name or Color is duplicate");
        }
    }

    handleChange(evt) {
        this.setState({ newName: evt.target.value });
    }

    handleSubmit() {
        const newPalette = {
            paletteName: "New Test Palette",
            colors: this.state.colors,
        };
        this.props.savePalette(newPalette);
        this.history.push("/");
    }

    render() {
        const { open, pickerColor, newName } = this.state;
        return (
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} color="default">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
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
                            onClick={this.handleSubmit}
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
                        <IconButton onClick={this.handleDrawerClose}>
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
                        color={pickerColor}
                        onChangeComplete={this.handleChangeComplete}
                    />
                    <Box
                        component="form"
                        autoComplete="off"
                        onSubmit={this.addNewColor}
                    >
                        <TextField
                            required
                            id="filled-error-helper-text"
                            label="Color Name"
                            value={newName}
                            onChange={this.handleChange}
                            variant="filled"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ backgroundColor: pickerColor }}
                        >
                            Add Color
                        </Button>
                    </Box>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    {this.state.colors.map((color) => (
                        <DraggableColorBox
                            color={color.color}
                            name={color.name}
                        />
                    ))}
                </Main>
            </Box>
        );
    }
}
