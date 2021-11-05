import React, { useEffect, useState } from "react";
import { recipeApi }        from "../../../../service/recipe";
import { ingredientApi }    from "../../../../service/ingredient";
import { RecipeIngredient } from "./RecipeIngredient";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 850,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Recipe = ({title, buttonText, recipe, addRecipe}) => {
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
                    setIngredientsSelected(recipe.ingredients)
                }
            })
            .catch(err => console.log(err))
    }, [recipe])

    const createRecipe = () => {
        if (recipe !== undefined) {
            recipeApi
                .updateRecipe(recipe.id, name)
                .then(result => {
                    handleClose()
                })
                .catch(err => console.log(err))
        } else {
            recipeApi
                .addRecipe(name, ingredientsSelected)
                .then(result => {
                    addRecipe(result)
                    clean()
                    handleClose()
                })
                .catch(err => console.log(err))
        }
    }

    const updateIngredient = (key, ingredient) => {
        let items = ingredientsSelected
        items[key] = ingredient

        setIngredientsSelected(items)
    }

    const addIngredient = () => {
        const newIngredient = {
            name: "",
            quantity: 0,
            unit: ""
        }
        setIngredientsSelected((ingredientsSelected) => [...ingredientsSelected, newIngredient])
    }

    const clean = () => {
        setIngredientsSelected([])
        setName("")
    }
    return (
        <>
            {/*<Modal*/}
            {/*    open={open}*/}
            {/*    onClose={handleClose}*/}
            {/*    aria-labelledby="modal-modal-title"*/}
            {/*    aria-describedby="modal-modal-description"*/}
            {/*>*/}
            {/*    <Box sx={style}>*/}
            {/*        <TextField*/}
            {/*            id="outlined-error"*/}
            {/*            label="Nom"*/}
            {/*            value={name}*/}
            {/*            onChange={e => setName(e.target.value)}*/}
            {/*        />*/}
            {/*        {*/}
            {/*            ingredientsSelected.map((ingredientSelected, key) => {*/}
            {/*                return (*/}
            {/*                    <div key={key}>*/}
            {/*                        <RecipeIngredient index={key} ingredients={ingredients} selectIngredient={ingredientSelected} updateIngredient={updateIngredient}/>*/}
            {/*                    </div>)*/}
            {/*            })*/}
            {/*        }*/}
            {/*        <Button variant="contained" color="success" onClick={() => addIngredient()}>*/}
            {/*            <Icon>add_circle</Icon>&nbsp;Ajouter un ingredient*/}
            {/*        </Button>*/}
            {/*        <Button variant="contained" color="success" onClick={() => createRecipe()}>*/}
            {/*            <Icon>add_circle</Icon>&nbsp;{buttonText}*/}
            {/*        </Button>*/}
            {/*    </Box>*/}
            {/*</Modal>*/}
            {/*<Button variant="contained" onClick={handleOpen}>{title}</Button>*/}
        </>
    )
}
