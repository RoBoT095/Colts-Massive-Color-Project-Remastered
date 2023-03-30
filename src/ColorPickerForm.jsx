import React, { useState, useEffect } from "react";
// Material UI Stuff Starts
import Button from "@mui/material/Button";
// Material UI Stuff Ends
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function ColorPickerForm(props) {
    const [currentColor, setCurrentColor] = useState("#EF5959");
    const [newColorName, setNewColorName] = useState("");

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

    const updateCurrentColor = (color) => setCurrentColor(color.hex);

    const handleChange = (e) => {
        setNewColorName(e.target.value);
    };

    const handleSubmit = () => {
        const newColor = {
            color: currentColor,
            name: newColorName,
        };
        props.addNewColor(newColor);
        setNewColorName("");
    };

    const { paletteIsFull, colors } = props;
    return (
        <div>
            <ChromePicker
                color={currentColor}
                onChangeComplete={updateCurrentColor}
            />
            <ValidatorForm autoComplete="off" onSubmit={handleSubmit}>
                <TextValidator
                    id="filled-error-helper-text"
                    label="Color Name"
                    value={newColorName}
                    name="newColorName"
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
                    type="submit"
                    color="primary"
                    disabled={paletteIsFull}
                    style={{
                        backgroundColor: paletteIsFull ? "grey" : currentColor,
                    }}
                >
                    {paletteIsFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </div>
    );
}
