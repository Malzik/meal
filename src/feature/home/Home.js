import React, {useEffect, useState} from "react";
import {RightPanel} from "./components/home/RightPanel";
import {LeftPanel} from "./components/home/LeftPanel";
import moment from "moment";
import {useSend} from "../../service/utils";

export const Home = ({ingredients, setIngredients, recipes, addRecipe}) => {
    const [currentDate, setCurrentDate] = useState(moment())

    const [items, setItems] = useState({
        ingredients: [],
        "22/02/2022": {
            breakfast: [{id: 3, name: "Thé"}],
            lunch: [],
            dinner: []
        },
        "23/02/2022": {
            breakfast: [],
            lunch: [],
            dinner: []
        },
        "24/02/2022": {
            breakfast: [],
            lunch: [],
            dinner: []
        },
        "25/02/2022": {
            breakfast: [],
            lunch: [],
            dinner: []
        },
    });

    useEffect(() => {
        setItems({...items, ingredients: ingredients})
    }, [ingredients])

    const previousWeek = () => {
        setCurrentDate(moment(currentDate, 'DD/MM/YYYY').add('-7', 'days').startOf('isoWeek'))
    }

    const nextWeek = () => {
        setCurrentDate(moment(currentDate, 'DD/MM/YYYY').add('7', 'days').startOf('isoWeek'))
    }

    const updateIngredients = (newIngredient, isNew = false) => {
        if (isNew) {
            setIngredients([...ingredients, newIngredient])
            return
        }
        setIngredients(ingredients.map(ingredient => {
            if (ingredient.id === newIngredient.id) {
                ingredient.name = newIngredient.name
            }
            return ingredient
        }))
    }

    const onSend = useSend(setItems, currentDate);

    return (
        <div className="grid grid-cols-8 ml-24 mr-24 mx-auto max-h-full">
            <div className="col-span-6">
                <LeftPanel date={currentDate} setTestDate={setCurrentDate} onSend={onSend} items={items} previousWeek={previousWeek} nextWeek={nextWeek} setItems={setItems}/>
            </div>
            <div className="col-span-2">
                <RightPanel onSend={onSend} items={items} ingredients={ingredients} addRecipe={addRecipe} updateIngredients={updateIngredients}/>
            </div>
        </div>
    )
}

