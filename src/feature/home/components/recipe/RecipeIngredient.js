import React, { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export const RecipeIngredient = ({index, ingredients, selectIngredient, updateIngredient}) => {
    const [ingredient, setIngredient] = useState(selectIngredient);

    const updateSelectedIngredients = (value) => {
        setIngredient({...ingredient, name: value})
        updateIngredient(index, {...ingredient, name: value})
    }

    const updateSelectedIngredientsQuantity = (value) => {
        setIngredient({...ingredient, quantity: parseInt(value)})
        updateIngredient(index, {...ingredient, quantity: parseInt(value)})
    }

    const updateSelectedIngredientsUnit = (value) => {
        setIngredient({...ingredient, unit: value})
        updateIngredient(index, {...ingredient, unit: value})
    }

    return (
        <>
            {/*<FormControl sx={{ m: 1, width: 300 }}>*/}
            {/*    <InputLabel id="demo-multiple-name-label">Choisissez un ingrédient</InputLabel>*/}
            {/*    <Select*/}
            {/*        labelId="demo-multiple-name-label"*/}
            {/*        id="demo-multiple-name"*/}
            {/*        value={ingredient.name}*/}
            {/*        onChange={e => updateSelectedIngredients(e.target.value)}*/}
            {/*        input={<OutlinedInput label="Name" />}*/}
            {/*        renderValue={(selected) => {*/}
            {/*            return (*/}
            {/*                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>*/}
            {/*                    <Chip key={selected} label={selected} />*/}
            {/*                </Box>*/}
            {/*            )*/}
            {/*        }*/}
            {/*        }*/}
            {/*        MenuProps={MenuProps}*/}
            {/*    >*/}
            {/*        {ingredients.map(selectIngredient => (*/}
            {/*            <MenuItem key={selectIngredient.id} value={selectIngredient.name}>*/}
            {/*                <Checkbox checked={selectIngredient.name === ingredient.name} />*/}
            {/*                <ListItemText primary={selectIngredient.name} />*/}
            {/*            </MenuItem>*/}
            {/*        ))}*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}
            {/*<TextField*/}
            {/*    id="quantity"*/}
            {/*    label="Quantité"*/}
            {/*    variant="outlined"*/}
            {/*    type="number"*/}
            {/*    value={ingredient.quantity}*/}
            {/*    onChange={e => updateSelectedIngredientsQuantity(e.target.value)}*/}
            {/*    InputLabelProps={{*/}
            {/*        shrink: true,*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<TextField*/}
            {/*    id="unit"*/}
            {/*    label="Unité"*/}
            {/*    variant="outlined"*/}
            {/*    value={ingredient.unit}*/}
            {/*    onChange={e => updateSelectedIngredientsUnit(e.target.value)}*/}
            {/*/>*/}
        </>
    )
}
