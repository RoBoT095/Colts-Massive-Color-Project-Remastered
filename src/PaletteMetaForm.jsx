import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function PaletteMetaForm(props) {
    const [open, setOpen] = useState(true);

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

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const { newPaletteName, setNewPaletteName, handleSubmit } = props;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Choose a Palette Name</DialogTitle>
            <ValidatorForm
                autoComplete="off"
                onSubmit={() => handleSubmit(newPaletteName)}
            >
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your beautiful palette. Make
                        sure it's unique!
                    </DialogContentText>
                    <TextValidator
                        label="Palette Name"
                        value={newPaletteName}
                        name="newPaletteName"
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={[
                            "Enter a Palette Name",
                            "Name is already taken",
                        ]}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" type="submit">
                        Save Palette
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}
