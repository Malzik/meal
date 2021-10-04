import React  from "react";

export const Recipes = ({ recipes }) => {
    const renderRecipe = recipe => {
        return (
            <tr>
                <td>{recipe.name}</td>
                <td>
                    <ul>
                        {
                            recipe.ingredients.map(ingredient => <li>{ingredient}</li>)
                        }
                    </ul>
                </td>
                <td>{recipe.recipe.split('\n').map(str => <p>{str}</p>)}</td>
            </tr>
        )
    }

    return (
        <table className="table table-striped table-dark">
            <thead>
            <tr>
                <th scope="col">NOM</th>
                <th scope="col">INGREDIENTS</th>
                <th scope="col">RECETTE</th>
            </tr>
            </thead>
            <tbody>
            {
                recipes.map(recipe => renderRecipe(recipe))
            }
            </tbody>
        </table>
    )
}