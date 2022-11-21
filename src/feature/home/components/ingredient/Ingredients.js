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
            <div className={"max-h-[80vh] overflow-y-auto"}>
                <table className={"w-full table-fixed"}>
                    <thead className={"bg-gray-800 text-white border-b sticky top-0 shadow-md"}>
                    <tr>
                        <th className={"ingredients-table-th text-center w-1/12"}>#</th>
                        <th className={"ingredients-table-th w-6/12"}>Nom</th>
                        <th className={"ingredients-table-th"}>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ingredients.map(ingredient => (
                        <tr className={"ingredients-table-line"} key={ingredient.id}>
                            <th>{ingredient.id}</th>
                            <td>{ingredient.name}</td>
                            <td className={"flex text-xl sm:block sm:text-md"}>
                                <Ingredient title={"Modifier"} buttonText={"Modifier"} ingredient={ingredient} updateIngredients={updateIngredients}>
                                    <FaEdit className={"inline "}/>&nbsp;<span className={"hidden sm:inline-block"}>Modifier</span>
                                </Ingredient>
                                <button onClick={() => deleteIngredient(ingredient.id)}>
                                    <FaTrash className={"inline"} />&nbsp;<div className={"hidden sm:inline-block"}>Supprimer</div>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
