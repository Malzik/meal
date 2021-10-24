import React, { useEffect, useState } from "react";
import { styled }                      from '@mui/material/styles';
import Table                           from '@mui/material/Table';
import TableBody                       from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer                  from '@mui/material/TableContainer';
import TableHead                       from '@mui/material/TableHead';
import TableRow                        from '@mui/material/TableRow';
import Paper                           from '@mui/material/Paper';
import Button                          from "@mui/material/Button";
import Icon                            from "@mui/material/Icon";
import { recipeApi }                   from "../../../../service/recipe";
import { Recipe }                      from "./Recipe";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Nom</StyledTableCell>
                            <StyledTableCell>Ingredients</StyledTableCell>
                            <StyledTableCell>Options</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipes.map(recipe => (
                            <StyledTableRow hover key={recipe.id}>
                                <StyledTableCell component="th" scope="row">{recipe.id}</StyledTableCell>
                                <StyledTableCell align="left">{recipe.name}</StyledTableCell>
                                <StyledTableCell align="left">
                                    {recipe.ingredients.map(ingredient => renderIngredient(ingredient))}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Recipe title={"Modifier"} buttonText={"Modifier"} recipe={recipe}/>
                                    <Button variant="contained" color="error" onClick={() => deleteRecipe(recipe.id)}>
                                        <Icon>delete_circle</Icon>&nbsp;Supprimer
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}