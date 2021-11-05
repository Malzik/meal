import React, { useEffect, useState } from "react";
import { recipeApi }                   from "../../../../service/recipe";
import { Recipe }                      from "./Recipe";

export const Recipes = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        recipeApi
            .getRecipes()
            .then(result => {
                setRecipes(result.map(recipe => {
                    return ({
                            id: recipe.id,
                            name: recipe.name,
                            ingredients: recipe.ingredients.map(ingredient => {
                                return ({
                                    id: ingredient.id,
                                    name: ingredient.name,
                                    quantity: ingredient.recipe_ingredient.quantity,
                                    unit: ingredient.recipe_ingredient.unit,
                                })
                            })
                        })
                    }
                ))
            })
            .catch(err => console.log(err))
    }, [])

    const deleteRecipe = id => {
        recipeApi
            .deleteRecipe(id)
            .then(() => setRecipes(recipes.filter(recipe => recipe.id !== id)))
            .catch(err => console.log(err))
    }

    const renderIngredient = ingredient => {
        if (ingredient.unit === null) {
            return (
                <div key={ingredient.id}>{ingredient.name} * {ingredient.quantity}</div>
            )
        }
        return (
            <div key={ingredient.id}>{ingredient.name} - {ingredient.quantity}&nbsp;{ingredient.unit}</div>
        )
    }

    const addRecipe = newRecipe => {
        setRecipes(recipes.map(recipe => recipe.id === newRecipe.id ? newRecipe : recipe))
    }

    return (
        <>
            <Recipe title={"Ajouter une recette"} buttonText={"Ajouter"} addRecipe={addRecipe}/>
            {/*<TableContainer component={Paper}>*/}
            {/*    <Table sx={{ minWidth: 700 }} aria-label="customized table">*/}
            {/*        <TableHead>*/}
            {/*            <TableRow>*/}
            {/*                <StyledTableCell>#</StyledTableCell>*/}
            {/*                <StyledTableCell>Nom</StyledTableCell>*/}
            {/*                <StyledTableCell>Ingredients</StyledTableCell>*/}
            {/*                <StyledTableCell>Options</StyledTableCell>*/}
            {/*            </TableRow>*/}
            {/*        </TableHead>*/}
            {/*        <TableBody>*/}
            {/*            {recipes.map(recipe => (*/}
            {/*                <StyledTableRow hover key={recipe.id}>*/}
            {/*                    <StyledTableCell component="th" scope="row">{recipe.id}</StyledTableCell>*/}
            {/*                    <StyledTableCell align="left">{recipe.name}</StyledTableCell>*/}
            {/*                    <StyledTableCell align="left">*/}
            {/*                        {recipe.ingredients.map(ingredient => renderIngredient(ingredient))}*/}
            {/*                    </StyledTableCell>*/}
            {/*                    <StyledTableCell align="left">*/}
            {/*                        <Recipe title={"Modifier"} buttonText={"Modifier"} recipe={recipe}/>*/}
            {/*                        <Button variant="contained" color="error" onClick={() => deleteRecipe(recipe.id)}>*/}
            {/*                            <Icon>delete_circle</Icon>&nbsp;Supprimer*/}
            {/*                        </Button>*/}
            {/*                    </StyledTableCell>*/}
            {/*                </StyledTableRow>*/}
            {/*            ))}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}
        </>
    )
}
