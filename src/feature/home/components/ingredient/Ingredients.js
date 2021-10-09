import React, { useEffect, useState } from "react";
import { ingredientApi }              from "../../../../service/ingredient";
import { styled }                     from '@mui/material/styles';
import Table                           from '@mui/material/Table';
import TableBody                       from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer                  from '@mui/material/TableContainer';
import TableHead                       from '@mui/material/TableHead';
import TableRow                        from '@mui/material/TableRow';
import Paper                          from '@mui/material/Paper';
import { Ingredient }                 from "./Ingredient";
import TextField                      from "@mui/material/TextField";
import Button                          from "@mui/material/Button";
import Icon                            from "@mui/material/Icon";
import Box                             from "@mui/material/Box";


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
export const Ingredients = () => {
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        ingredientApi
            .getIngredients()
            .then(result => setIngredients(result))
            .catch(err => console.log(err))
    }, [])

    const deleteIngredient = id => {
        ingredientApi
            .deleteIngredient(id)
            .then(() => setIngredients(ingredients.filter(ingredient => ingredient.id !== id)))
            .catch(err => console.log(err))
    }

    const updateName = newIngredient => {
        setIngredients(ingredients.map(ingredient => {
            if (ingredient.id === newIngredient.id) {
                ingredient.name = newIngredient.name
            }
            return ingredient
        }))
    }

    return (
        <>
            <Ingredient title={"Ajouter un ingrédient"} buttonText={"Ajouter"} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Nom</StyledTableCell>
                            <StyledTableCell>Options</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ingredients.map(ingredient => (
                            <StyledTableRow hover key={ingredient.id}>
                                <StyledTableCell component="th" scope="row">{ingredient.id}</StyledTableCell>
                                <StyledTableCell align="left">{ingredient.name}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <Ingredient title={"Modifier"} buttonText={"Modifier"} ingredient={ingredient} updateName={updateName}/>
                                    <Button variant="contained" color="error" onClick={() => deleteIngredient(ingredient.id)}>
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