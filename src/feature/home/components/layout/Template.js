import React      from "react";
import { Toaster } from 'react-hot-toast';
import { Navbar } from "./Navbar";


export const Template = props => {
    return (
        <div className="bg-[#fefefe] pb-5 max-h-screen h-screen overflow-y-scroll">
            <Navbar ingredients={props.ingredients} setIngredients={props.setIngredients}
                    recipes={props.recipes} setRecipes={props.setRecipes}/>
            {props.children}
            <Toaster />
        </div>
    );
}
