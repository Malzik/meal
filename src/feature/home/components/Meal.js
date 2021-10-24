import React, { useState } from "react";
import './Meal.css';
import FormControl         from "@mui/material/FormControl";
import InputLabel          from "@mui/material/InputLabel";
import Select              from "@mui/material/Select";
import MenuItem            from "@mui/material/MenuItem";
import OutlinedInput       from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

export const Meal = ({title, recipes}) => {
    const [recipesList, ] = useState(recipes);
    const [selectedRecipes, setSelectedRecipes] = useState([])

    const handleChange = () => {

    }

    return (
        <div className="meal">
            <div>{title}</div>
            <FormControl sx={{ m: 1 }}>
                <InputLabel id="demo-multiple-name-label">Recettes</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selectedRecipes}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {recipesList.map(recipe => (
                        <MenuItem
                            key={recipe.id}
                            value={recipe.name}
                        >
                            {recipe.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}