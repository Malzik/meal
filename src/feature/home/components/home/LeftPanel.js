import {GiChicken, GiHoneypot, GiOlive} from "react-icons/gi";
import React, {useCallback, useEffect, useState} from "react";
import moment from "moment";
import {MuuriComponent} from "muuri-react";
import {columnOptions} from "../../../../service/utils";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

export const LeftPanel = ({date, onSend, setTestDate, items, previousWeek, nextWeek, setItems}) => {
    const [meals, setMeals] = useState(items)
    const [currentMeal, setCurrentMeal] = useState([])
    const [currentDate, setCurrentDate] = useState(moment())

    useEffect(() => {
        setCurrentDate(date)
        if (meals[currentDate.format("DD/MM/YYYY")] === undefined) {
            setMeals({...meals, [currentDate.format("DD/MM/YYYY")]: {
                    breakfast: [],
                    lunch: [{id: 3, name: "ntm"}],
                    dinner: []
                }
            })
        }
    }, [date, meals])

    const selectDate = (add) => {
        const newDate = moment(date).startOf('isoWeek').add(add, 'days')
        setCurrentDate(newDate)
        setTestDate(newDate)
        if (meals[newDate.format("DD/MM/YYYY")] !== undefined) {
            setCurrentMeal(meals[newDate.format("DD/MM/YYYY")])
        } else {
            console.log("Error: pas de repas pour cette date", newDate)
        }
    }

    const renderRecipe = mealName => {
        if (meals[currentDate.format("DD/MM/YYYY")] !== undefined && meals[currentDate.format("DD/MM/YYYY")][mealName] !== undefined) {
            return meals[currentDate.format("DD/MM/YYYY")][mealName].map(recipe =>
                <div className={"inline-block border-2 rounded-2xl p-2"} key={recipe.id}>
                    <div className={"mx-2 shadow-lg rounded-2xl inline-block"}>
                        <GiChicken className={"font-width m-2"}/>
                    </div>
                    <div className={"inline-block align-top"}>
                        <h3>{recipe.name}</h3>
                        <h3>{recipe.ingredients}</h3>
                    </div>
                </div>
            )
        }
        console.log("Repas not found pour la date " + currentDate.format("DD/MM/YYYY"))
        return null
    }

    const isToday = key => currentDate.get('isoWeekday') === key ? "underline" : "cursor-pointer";

    console.log(meals)
    return (
        <div className={"left-panel font-roboto w-11/12 h-[80vh]"}>
            <div/>
            <div className={"days text-center align-middle font-bold"}>
                <div className={"arrow cursor-pointer"} onClick={() => previousWeek()}>
                    <FaArrowLeft/>
                </div>
                <div onClick={() => selectDate(0)} className={isToday(1)}>Lundi</div>
                <div onClick={() => selectDate(1)} className={isToday(2)}>Mardi</div>
                <div onClick={() => selectDate(2)} className={isToday(3)}>Mercredi</div>
                <div onClick={() => selectDate(3)} className={isToday(4)}>Jeudi</div>
                <div onClick={() => selectDate(4)} className={isToday(5)}>Vendredi</div>
                <div onClick={() => selectDate(5)} className={isToday(6)}>Samedi</div>
                <div onClick={() => selectDate(6)} className={isToday(7)}>Dimanche</div>
                <div className={"arrow cursor-pointer"} onClick={() => nextWeek()}>
                    <FaArrowRight/>
                </div>
            </div>
            <div className={"meals text-center font-bold"}>
                <div className={"meal-name"}>Petit déjeuner</div>
                <div className={"meal-name"}>Déjeuner</div>
                <div className={"meal-name"}>Diner</div>
            </div>
            <div className={"border rounded-3xl h-full w-full bg-white p-2"}>
                <div className={"bg-indigo-200 rounded-3xl h-full w-full p-4"}>
                    <div className={"grid grid-rows-3 w-full h-full testdragable"}>
                        <MuuriComponent {...columnOptions} id={"breakfast"} onSend={onSend} containerClass={"muuri-leftpanel-flex"} dragEnabled dragFixed>
                            {renderRecipe("breakfast")}
                        </MuuriComponent>
                        <MuuriComponent {...columnOptions} id={"lunch"} onSend={onSend} containerClass={"muuri-leftpanel-flex"} dragEnabled dragFixed>
                            {renderRecipe("lunch")}
                        </MuuriComponent>
                        <MuuriComponent {...columnOptions} id={"dinner"} onSend={onSend} containerClass={"muuri-leftpanel-flex"} dragEnabled dragFixed>
                            {renderRecipe("dinner")}
                        </MuuriComponent>
                    </div>
                </div>
            </div>
        </div>
    )
}