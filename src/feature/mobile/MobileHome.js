import React, {useEffect, useState} from "react";
import {Recipe} from "./components/Recipe";
import {FaPlus, FaPlusCircle} from "react-icons/fa";
import {DaySlider} from "./components/DaySlider";
import moment from "moment";
import {Carousel} from "./components/Carousel";
import {BottomSheet} from "react-spring-bottom-sheet";
import 'react-spring-bottom-sheet/dist/style.css'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions, Type,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import {MealSwipeableList} from "./components/SwipeableList";

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
        let alreadyAdd = false
        meals.forEach(meal => {
            if (meal.id === recipe.id && meal.date === selectedDay) {
                alreadyAdd = true
                meal.quantity += 1
            }
        })
        if (!alreadyAdd) {
            setMeals(oldMeals => [...oldMeals, {...recipe, date: selectedDay, quantity: 1}])
        }
        setSearchName("")
        setOpen(false)
    }

    const getMeals = () => {
        return meals.filter(meal => meal.date === selectedDay)
    }

    const searchByName = (value) => {
        setSearchName(value)
        if (value === "") {
            setFilteredRecipes(recipes)
        } else {
            setFilteredRecipes(recipes.filter(recipe => recipe.name.toLowerCase().includes(value.toLowerCase())))
        }
    }

    const removeMeals = id => {
        setMeals(() => meals.filter(meal => {
            if (meal.id !== id)
                return meal
            if (meal.quantity > 1) {
                meal.quantity -= 1
                return meal
            }
        }))
    }

    return (
        <div className={"font-roboto m-2"}>
            <DaySlider selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
            <h2 className={"text-[#ffaf64] text-2xl font-bold py-2"}>Mes recettes</h2>
            <MealSwipeableList meals={getMeals()} removeMeals={removeMeals}/>
            <div className={"border-2 border-[#ffaf64] text-[#ffaf64] rounded-lg max-h-[8em] h-[8em] my-2 text-center shadow-md"}
                 onClick={() => setOpen(true)}>
                <FaPlus className={"w-[4rem] h-[4rem] p-1 m-auto mt-3 rounded-full border-4 border-[#ffaf64]"}/>
                <h3 className={"text-2xl"}>Ajouter une recette</h3>
            </div>
            <BottomSheet open={open}
                         onDismiss={() => setOpen(false)}>
                <div className={"p-2"}>
                    <div className="border-4 border-gray-400 text-[#ffaf64] rounded-xl w-full">
                        <input type={"text"} value={searchName} onChange={e => searchByName(e.target.value)} placeholder={"Nom de la recette..."}
                               className={"m-2 w-[95%] focus:outline-none"}/>
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
