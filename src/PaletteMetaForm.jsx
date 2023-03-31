import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function PaletteMetaForm(props) {
    const open = true;

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

    const { newPaletteName, setNewPaletteName, handleSubmit, hideForm } = props;

    return (
        <Dialog open={open} onClose={hideForm}>
            <DialogTitle>Choose a Palette Name</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a name for your beautiful palette. Make sure
                    it's unique!
                </DialogContentText>
                <Picker data={data} onEmojiSelect={console.log} theme="light" />

                <ValidatorForm
                    autoComplete="off"
                    onSubmit={() => handleSubmit(newPaletteName)}
                >
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
                    <DialogActions>
                        <Button onClick={hideForm}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </DialogContent>
        </Dialog>
    );
}
