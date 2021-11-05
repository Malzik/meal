import React          from "react";
import { Schedule }   from "./components/Schedule";
import { Ingredient } from "./components/ingredient/Ingredient";
import { Recipe }     from "./components/recipe/Recipe";
import {RightPanel} from "./components/home/RightPanel";

export const Home = () => {
    return (
        <div className="bg-indigo-200">
            {/*<Ingredient title={"Ajouter un ingrédient"} />*/}
            {/*<Recipe title={"Ajouter une recette"} buttonText={"Ajouter"} addRecipe={() => {}}/>*/}
            {/*<Schedule />*/}
            <RightPanel/>
        </div>
    )
}
