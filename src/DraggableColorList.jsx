import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { ReactSortable } from "react-sortablejs";

export default function DraggableColorList(props) {
    const { colors, setColors, removeColor } = props;
    return (
        <ReactSortable
            // tag="div"
            list={colors}
            setList={setColors}
            style={{ height: "100%" }}
        >
            {colors.map((color, i) => (
                <DraggableColorBox
                    index={i}
                    key={color.name}
                    color={color.color}
                    name={color.name}
                    handleClick={() => removeColor(color.name)}
                />
            ))}
        </ReactSortable>
    );
}
