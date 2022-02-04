import React from "react";
import { recipeApi }                   from "../../../../service/recipe";
import { Recipe }                      from "./Recipe";
import {FaEdit, FaTrash} from "react-icons/fa";

export const Recipes = ({ingredients, recipes, setRecipes}) => {

    const deleteRecipe = id => {
        recipeApi
            .deleteRecipe(id)
            .then(() => setRecipes(recipes.filter(recipe => recipe.id !== id)))
            .catch(err => console.log(err))
    }

    const renderIngredient = ingredient => {
        if (ingredient.unit === null) {
            return (
                <div key={ingredient.name}>{ingredient.name} * {ingredient.quantity}</div>
            )
        }
        return (
            <div key={ingredient.name}>{ingredient.name} - {ingredient.quantity}&nbsp;{ingredient.unit}</div>
        )
    }

    const addRecipe = newRecipe => {
        setRecipes(recipes.map(recipe => recipe.id === newRecipe.id ? {...recipe, ...newRecipe} : recipe))
    }

    return (
        <>
            <div className="container m-auto">
                <h1 className={"font-roboto text-center py-4 text-3xl"}>Liste des recettes</h1>
                <div className={"max-h-[80vh] overflow-y-auto"}>
                    <table className={"w-full table-fixed"}>
                        <thead className={"bg-gray-800 text-white border-b sticky top-0 shadow-md"}>
                        <tr>
                            <th className={"ingredients-table-th text-center w-1/12"}>#</th>
                            <th className={"ingredients-table-th"}>Nom</th>
                            <th className={"ingredients-table-th"}>Ingrédients</th>
                            <th className={"ingredients-table-th"}>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipes.map(recipe => (
                            <tr className={"ingredients-table-line"} key={recipe.id}>
                                <th>{recipe.id}</th>
                                <td>{recipe.name}</td>
                                <td>{recipe.ingredients.map(ingredient => renderIngredient(ingredient))}</td>
                                <td>
                                    <FaEdit className={"inline"}/>&nbsp;<Recipe title={"Modifier"} buttonText={"Modifier"} recipe={recipe} addRecipe={addRecipe} ingredients={ingredients}/>
                                    <button onClick={() => deleteRecipe(recipe.id)} className={"ml-4"}>
                                        <FaTrash className={"inline"} />&nbsp;Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
