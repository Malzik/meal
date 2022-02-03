import React, {useEffect, useState} from "react";
import { Schedule }   from "./components/Schedule";
import { Ingredient } from "./components/ingredient/Ingredient";
import { Recipe }     from "./components/recipe/Recipe";
import {RightPanel} from "./components/home/RightPanel";
import {LeftPanel} from "./components/home/LeftPanel";
import moment from "moment";
import {useSend} from "../../service/utils";
import {ingredientApi} from "../../service/ingredient";

export const Home = () => {
    const [testDate, setTestDate] = useState(moment().format('DD/MM/YYYY'))
    const [currentDate, setCurrentDate] = useState(moment().startOf('isoWeek'))
    const [ingredients, setIngredients] = useState([])

    const [items, setItems] = useState({
        ingredients: [],
        "30/01/2022": {
            breakfast: [],
            lunch: [],
            dinner: []
        },
        "31/01/2022": {
            breakfast: [],
            lunch: [],
            dinner: []
        },
        "01/02/2022": {
            breakfast: [],
            lunch: [],
            dinner: []
        },
        "02/02/2022": {
            breakfast: [],
            dinner: [],
            lunch: [],
        },
        "03/02/2022": {
            breakfast: [],
            dinner: [],
            lunch: [],
        },
        "04/02/2022": {
            breakfast: [],
            dinner: [],
            lunch: [],
        },
        "05/02/2022": {
            breakfast: [],
            dinner: [],
            lunch: [],
        },
        "06/02/2022": {
            breakfast: [],
            dinner: [],
            lunch: [],
        },
    });

    useEffect(() => {
        if (ingredients.length === 0) {
            ingredientApi
                .getIngredients()
                .then(result => {
                    setIngredients(result)
                    setItems({...items, ingredients: result})
                })
                .catch(err => console.log(err))
        }
    }, [ingredients, items])

    const previousWeek = () => {
        setTestDate(moment(testDate).add('-7', 'days'))
        setCurrentDate(moment(testDate).add('-7', 'days').startOf('isoWeek'))
    }

    const nextWeek = () => {
        setTestDate(moment(testDate).add('7', 'days'))
        setCurrentDate(moment(testDate).add('7', 'days').startOf('isoWeek'))
    }

    const onSend = useSend(setItems, testDate);

    return (
        <div className="grid grid-cols-8 ml-24 mr-24 mx-auto max-h-full">
            <div className="col-span-6">
                <LeftPanel date={currentDate} setTestDate={setTestDate} onSend={onSend} items={items} previousWeek={previousWeek} nextWeek={nextWeek}/>
            </div>
            <div className="col-span-2">
                <RightPanel onSend={onSend} items={items}/>
            </div>
            {/*<Schedule />*/}
        </div>
    )
}

