import React, {useEffect, useState} from "react";
import {Recipe} from "./components/Recipe";
import {FaPlus} from "react-icons/fa";
import {DaySlider} from "./components/DaySlider";
import moment from "moment";
import {DayRecipes} from "./components/DayRecipes";

export const MobileHome = () => {
    const [selectedDay, setSelectedDay] = useState(moment().format('DD-MM'))
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        setRecipes([{image: undefined, name: "Poulet curry coco"}])
    }, [])

    const addRecipe = (recipe) => setRecipes(oldRecipes => [oldRecipes, recipe])

    const getRecipes = () => {
        return recipes.map(recipe => recipe.date = selectedDay)
    }
    return (
        <div className={"font-roboto m-2"}>
            <DaySlider selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
            <h2 className={"text-[#6699CC] text-2xl font-bold pt-2"}>Mes recettes</h2>
            <DayRecipes day={selectedDay} recipes={getRecipes()}/>
        </div>
    )
}
