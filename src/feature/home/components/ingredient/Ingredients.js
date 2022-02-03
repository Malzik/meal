import React from "react";
import { ingredientApi }              from "../../../../service/ingredient";
import { Ingredient }                 from "./Ingredient";
import {FaEdit, FaTrash} from "react-icons/fa";

export const Ingredients = ({ingredients, setIngredients}) => {
    const deleteIngredient = id => {
        ingredientApi
            .deleteIngredient(id)
            .then(() => setIngredients(ingredients.filter(ingredient => ingredient.id !== id)))
            .catch(err => console.log(err))
    }

    const updateIngredients = (newIngredient, isNew = false) => {
        if (isNew) {
            setIngredients([...ingredients, newIngredient])
            return
        }
        setIngredients(ingredients.map(ingredient => {
            if (ingredient.id === newIngredient.id) {
                ingredient.name = newIngredient.name
            }
            return ingredient
        }))
    }

    return (
        <div className="container m-auto">
            <h1 className={"font-roboto text-center py-4 text-3xl"}>Liste des ingredients</h1>
            <table className={"w-full table-fixed"}>
                <thead className={"bg-gray-800 text-white border-b"}>
                <tr>
                    <th className={"ingredients-table-th text-center w-1/12"}>#</th>
                    <th className={"ingredients-table-th"}>Nom</th>
                    <th className={"ingredients-table-th"}>Options</th>
                </tr>
                </thead>
                <tbody>
                {ingredients.map(ingredient => (
                    <tr className={"ingredients-table-line"} key={ingredient.id}>
                        <th>{ingredient.id}</th>
                        <td>{ingredient.name}</td>
                        <td>
                            <FaEdit className={"inline"}/>&nbsp;<Ingredient title={"Modifier"} buttonText={"Modifier"} ingredient={ingredient} updateIngredients={updateIngredients}/>
                            <button onClick={() => deleteIngredient(ingredient.id)} className={"ml-4"}>
                                <FaTrash className={"inline"} />&nbsp;Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
