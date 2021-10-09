import React, { useEffect, useState } from "react";
import Button            from '@mui/material/Button';
import TextField         from "@mui/material/TextField";
import Box               from "@mui/material/Box";
import Modal             from "@mui/material/Modal";
import Icon              from "@mui/material/Icon";
import { recipeApi }     from "../../../../service/recipe";
import Select            from '@mui/material/Select';
import { ingredientApi } from "../../../../service/ingredient";
import MenuItem          from "@mui/material/MenuItem";
import OutlinedInput     from "@mui/material/OutlinedInput";
import Checkbox          from "@mui/material/Checkbox";
import ListItemText      from "@mui/material/ListItemText";
import Chip              from "@mui/material/Chip";
import InputLabel        from "@mui/material/InputLabel";
import FormControl       from "@mui/material/FormControl";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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

export const Recipe = ({title, buttonText, recipe}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ingredients, setIngredients] = useState([])
    const [name, setName] = useState(recipe !== undefined ? recipe.name : "")
    const [ingredientsSelected, setIngredientsSelected] = useState([]);

    useEffect(() => {
        ingredientApi
            .getIngredients()
            .then(result => {
                setIngredients(result)
                if (recipe !== undefined) {
                    setIngredientsSelected(recipe.ingredients.map(ingredient => ingredient.name))
                }
            })
            .catch(err => console.log(err))
    }, [recipe])

    const createRecipe = () => {
        let recipeIngredients = ingredients.filter(ingredient => ingredientsSelected.includes(ingredient.name))
        recipeIngredients = recipeIngredients.map(ingredient => ({...ingredient, quantity: 1}))
        if (recipe !== undefined) {
            recipeApi
                .updateRecipe(recipe.id, name)
                .then(result => {
                    handleClose()
                })
                .catch(err => console.log(err))
        } else {
            recipeApi
                .addRecipe(name, recipeIngredients)
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
    }

    const handleChange = (event) => {
        const { target: {value} } = event;

        setIngredientsSelected(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        id="outlined-error"
                        label="Nom"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Choisissez un ingrédient</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={ingredientsSelected}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                            renderValue={(selected) =>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            }
                            MenuProps={MenuProps}
                        >
                            {ingredients.map(ingredient => (
                                <MenuItem key={ingredient.id} value={ingredient.name}>
                                    <Checkbox checked={ingredientsSelected.indexOf(ingredient.name) > -1} />
                                    <ListItemText primary={ingredient.name} />

                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="success" onClick={() => createRecipe()}>
                        <Icon>add_circle</Icon>&nbsp;{buttonText}
                    </Button>
                </Box>
            </Modal>
            <Button variant="contained" onClick={handleOpen}>{title}</Button>
        </>
    )
}