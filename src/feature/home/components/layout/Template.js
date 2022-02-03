import React      from "react";
import { Navbar } from "./Navbar";

export const Template = props => {
    return (
        <div className="bg-indigo-200 pb-5 max-h-screen h-screen overflow-y-scroll">
            <Navbar ingredients={props.ingredients} setIngredients={props.setIngredients}
                    recipes={props.recipes} setRecipes={props.setRecipes}/>
            {props.children}
        </div>
    );
}