import React, { useEffect, useState } from "react";
import './Schedule.css'
import { Meal }                       from "./Meal";
import { mealApi }                    from "../../../service/meal";
import { recipeApi }                  from "../../../service/recipe";

export const Schedule = () => {
    const [recipes, setRecipes] = useState ([])
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    const mealNames = ['PDJ', 'Midi', 'Soir']

    useEffect(() => {
        recipeApi.getRecipes()
            .then((result) => {
                    setRecipes(result)
                },
            )
    }, [])
    const renderMealName = () => (
        <div className="left-head">
            <div style={{borderBottom: "1px solid lightgray"}}/>
            {mealNames.map((mealName, key) => <div className="meal-border" key={key}>{mealName}</div>)}
        </div>
    )

    const renderDay = (day, key) => {
        return (
            <div className="day" key={key}>
                <div className="day-border">{day}</div>
                <Meal title={"Matin"} recipes={recipes}/>
                <Meal title={"Midi"} recipes={recipes}/>
                <Meal title={"Soir"} recipes={recipes}/>
            </div>
        );
    }

    const renderDays = () => {
        return days.map((day, key) => renderDay(day, key))
    }

    return (
        <div>
            {
                recipes.length > 0 ? (
                    <div className="grid-container">
                        {renderMealName()}
                        {renderDays()}
                    </div>
                ) : null
            }
        </div>
    )
}