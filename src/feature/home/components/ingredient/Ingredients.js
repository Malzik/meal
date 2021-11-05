import React, { useEffect, useState } from "react";
import { ingredientApi }              from "../../../../service/ingredient";
import { Ingredient }                 from "./Ingredient";
import {FaCircle} from "react-icons/all";

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
            <table>
                <thead>
                <tr>
                    <td>#</td>
                    <td>Nom</td>
                    <td>Options</td>
                </tr>
                </thead>
                <tbody>
                {ingredients.map(ingredient => (
                    <tr>
                        <th>{ingredient.id}</th>
                        <td>{ingredient.name}</td>
                        <td>
                            <Ingredient title={"Modifier"} buttonText={"Modifier"} ingredient={ingredient} updateName={updateName}/>
                            <button onClick={() => deleteIngredient(ingredient.id)}>
                                <FaCircle>delete_circle</FaCircle>&nbsp;Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}
