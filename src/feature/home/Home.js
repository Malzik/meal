import React from "react";
import { Schedule }    from "./components/Schedule";
import { Ingredient }  from "./components/ingredient/Ingredient";

export const Home = () => {
    return (
        <div>
            <Ingredient title={"Ajouter un ingrédient"} />
            <Schedule />
        </div>
    )
}