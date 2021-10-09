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
            .then(result => setRecipes(result))
            .catch(err => console.log(err))
    }, [])

    const deleteRecipe = id => {
        recipeApi
            .deleteRecipe(id)
            .then(() => setRecipes(recipes.filter(recipe => recipe.id !== id)))
            .catch(err => console.log(err))
    }

    const renderIngredient = ingredient => {
        if (ingredient.recipe_ingredient.unit === null) {
            return (
                <div>{ingredient.name} * {ingredient.recipe_ingredient.quantity}</div>
            )
        }
        return (
            <div>{ingredient.name} - {ingredient.recipe_ingredient.quantity}&nbsp;{ingredient.recipe_ingredient.unit}</div>
        )
    }

    return (
        <>
            <Recipe title={"Ajouter une recette"} buttonText={"Ajouter"} />
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