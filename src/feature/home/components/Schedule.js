import React, { useEffect, useState } from "react";
import './Schedule.css'
import { Meal }                       from "./Meal";
import { mealApi }                    from "../../../service/meal";

export const Schedule = () => {
    const [meals, setMeals] = useState ([])
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    const mealNames = ['PDJ', 'Midi', 'Soir']

    useEffect(() => {
        mealApi.getMeals()
            .then((result) => {
                    setMeals(result)
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
                <Meal title={"Matin"} meals={meals}/>
                <Meal title={"Midi"} meals={meals}/>
                <Meal title={"Soir"} meals={meals}/>
            </div>
        );
    }

    const renderDays = () => {
        return days.map((day, key) => renderDay(day, key))
    }

    return (
        <div>
            <div className="grid-container">
                {renderMealName()}
                {renderDays()}
            </div>
        </div>
    )
}