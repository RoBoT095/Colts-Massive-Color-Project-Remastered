import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// MUI start
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import blue from "@mui/material/colors/blue";
import red from "@mui/material/colors/red";
// MUI end
import MiniPalette from "./MiniPalette";
import "./styles/PaletteList.css";

export default function PaletteList(props) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deletingId, setDeletingId] = useState("");

    const openDialog = (id) => {
        setOpenDeleteDialog(true);
        setDeletingId(id);
    };

    const closeDialog = () => {
        setOpenDeleteDialog(false);
        setDeletingId("");
    };

    const handleDelete = () => {
        deletePalette(deletingId);
        closeDialog();
    };

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
                                openDialog={openDialog}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            <Dialog
                open={openDeleteDialog}
                aria-labelledby="delete-dialog-title"
            >
                <DialogTitle id="delete-dialog-title">
                    Delete This Palette?
                </DialogTitle>
                <List>
                    <ListItem disableGutters>
                        <ListItemButton onClick={handleDelete}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        background: blue[100],
                                        color: blue[600],
                                    }}
                                >
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemButton onClick={closeDialog}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        background: red[100],
                                        color: red[600],
                                    }}
                                >
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}
