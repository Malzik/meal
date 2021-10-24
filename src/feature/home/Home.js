import React          from "react";
import { Schedule }   from "./components/Schedule";
import { Ingredient } from "./components/ingredient/Ingredient";
import { Recipe }     from "./components/recipe/Recipe";

export const Home = () => {
    return (
        <div>
            <Ingredient title={"Ajouter un ingrédient"} />
            <Recipe title={"Ajouter une recette"} buttonText={"Ajouter"} addRecipe={() => {}}/>
            <Schedule />
        </div>
    )
}