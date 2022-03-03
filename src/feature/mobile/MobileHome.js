import React, {useEffect, useState} from "react";
import {Recipe} from "./components/Recipe";
import {FaPlus, FaPlusCircle} from "react-icons/fa";
import {DaySlider} from "./components/DaySlider";
import moment from "moment";
import {Carousel} from "./components/Carousel";
import {BottomSheet} from "react-spring-bottom-sheet";
import 'react-spring-bottom-sheet/dist/style.css'

export const MobileHome = () => {
    const [selectedDay, setSelectedDay] = useState(moment().format('DD-MM'))
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [meals, setMeals] = useState([])
    const [open, setOpen] = useState(false)
    const [searchName, setSearchName] = useState("")

    useEffect(() => {
        setRecipes([
            {id: 1, image: 'empty.png', name: "Poulet curry coco"},
            {id: 2, image: 'empty.png', name: "Lasagne"},
            {id: 3, image: 'empty.png', name: "Petit déjeuner"},
            {id: 4, image: 'empty.png', name: "Pomme de terre Poulet"},
            {id: 5, image: 'empty.png', name: "Nuggets"},
            {id: 6, image: 'empty.png', name: "Riz"},
            {id: 7, image: 'empty.png', name: "Pates à la bolognaise"},
            {id: 8, image: 'empty.png', name: "Pates carbonara"},
        ])
        setFilteredRecipes([
            {id: 1, image: 'empty.png', name: "Poulet curry coco"},
            {id: 2, image: 'empty.png', name: "Lasagne"},
            {id: 3, image: 'empty.png', name: "Petit déjeuner"},
            {id: 4, image: 'empty.png', name: "Pomme de terre Poulet"},
            {id: 5, image: 'empty.png', name: "Nuggets"},
            {id: 6, image: 'empty.png', name: "Riz"},
            {id: 7, image: 'empty.png', name: "Pates à la bolognaise"},
            {id: 8, image: 'empty.png', name: "Pates carbonara"},
        ])
    }, [meals])

    const addMeal = (recipe) => {
        const oldMeals = meals
        if (oldMeals[selectedDay] === undefined) {
            oldMeals[selectedDay] = recipe
            setMeals(oldMeals)
        } else {
            console.log(oldMeals[selectedDay])
            oldMeals[selectedDay].push(recipe)
            setMeals(oldMeals)
        }
        setOpen(false)
    }

    const getRecipes = () => {
        return meals;
        // return meals.filter(meal => meal.date === selectedDay)
    }

    const searchByName = (value) => {
        setSearchName(value)
        if (value === "") {
            setFilteredRecipes(recipes)
        } else {
            setFilteredRecipes(recipes.filter(recipe => recipe.name.includes(value)))

        }
    }

    return (
        <div className={"font-roboto m-2"}>
            <DaySlider selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
            <h2 className={"text-[#ffaf64] text-2xl font-bold pt-2"}>Mes recettes</h2>
            {getRecipes().map(recipe => <Recipe key={recipe.name} recipe={recipe}/>)}
            <div className={"border-2 border-[#ffaf64] text-[#ffaf64] rounded-lg max-h-[8em] h-[8em] my-2 text-center shadow-md"}
                 onClick={() => setOpen(true)}>
                <FaPlus className={"w-[4rem] h-[4rem] p-1 m-auto mt-3 rounded-full border-4 border-[#ffaf64]"}/>
                <h3 className={"text-2xl"}>Ajouter une recette</h3>
            </div>
            <BottomSheet open={open}
                         onDismiss={() => setOpen(false)}>
                <div className={"p-2"}>
                    <div className="border-4 border-gray rounded-xl w-full">
                        <input type={"text"} value={searchName} onChange={e => searchByName(e.target.value)} placeholder={"Nom de la recette..."} className={"m-2 w-[95%] focus:outline-none"}/>
                    </div>
                    <Carousel slides={filteredRecipes} addMeal={addMeal}/>
                </div>
                <div className={"flex justify-center pb-4 pt-2"}>
                    <button className={"flex items-center"}>
                        <FaPlusCircle/> Ajouter ma recette
                    </button>
                </div>
            </BottomSheet>
        </div>
    )
}
