import React, { useEffect, useState } from "react";
// MUI start
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// MUI end
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function PaletteMetaForm(props) {
    const [stage, setStage] = useState("form");

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

    const showEmojiPicker = () => {
        setStage("emoji");
    };

    const savePalette = (emoji) => {
        const newPalette = {
            paletteName: newPaletteName,
            emoji: emoji.native,
        };
        handleSubmit(newPalette);
        setStage("");
    };

    const { newPaletteName, setNewPaletteName, handleSubmit, hideForm } = props;

    return (
        <div>
            <Dialog open={stage === "emoji"} onClose={hideForm}>
                <DialogTitle>Choose a Palette Emoji</DialogTitle>
                <Picker data={data} onEmojiSelect={savePalette} theme="light" />
            </Dialog>

            <Dialog open={stage === "form"} onClose={hideForm}>
                <DialogTitle>Choose a Palette Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your beautiful palette. Make
                        sure it's unique!
                    </DialogContentText>

                    <ValidatorForm
                        autoComplete="off"
                        onSubmit={showEmojiPicker}
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
        </div>
    );
}
