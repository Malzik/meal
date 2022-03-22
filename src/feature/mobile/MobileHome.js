import React, {useEffect, useState} from "react";
import {FaPlus, FaPlusCircle} from "react-icons/fa";
import {DaySlider} from "./components/DaySlider";
import moment from "moment";
import {Carousel} from "./components/Carousel";
import {BottomSheet} from "react-spring-bottom-sheet";
import 'react-spring-bottom-sheet/dist/style.css'
import 'react-swipeable-list/dist/styles.css';
import {MealSwipeableList} from "./components/SwipeableList";
import {recipeApi} from "../../service/recipe";
import {mealApi} from "../../service/meal";

export const MobileHome = () => {
    const [selectedDay, setSelectedDay] = useState(moment().format('DD-MM'))
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [meals, setMeals] = useState([])
    const [open, setOpen] = useState(false)
    const [searchName, setSearchName] = useState("")
    const [order, setOrder] = useState(1)

    useEffect(() => {
            mealApi.getMeals().then(meals => setMeals(meals))
            recipeApi.getRecipes().then(recipes => {
                setRecipes(recipes)
                setFilteredRecipes(recipes)
            })
    }, [])

    const addMeal = (recipe) => {
        mealApi
            .addMeal(moment(selectedDay, 'DD-MM').format('YYYY-MM-DD'), order, recipe.id)
            .then(() => {
                let alreadyAdd = false
                meals.forEach(meal => {
                    if (meal.id === recipe.id && moment(meal.date).format('DD-MM') === selectedDay) {
                        alreadyAdd = true
                        meal.quantity += 1
                    }
                })
                if (!alreadyAdd) {
                    setMeals(oldMeals => [...oldMeals, {...recipe, date: moment(selectedDay, 'DD-MM'), quantity: 1}])
                }
                setSearchName("")
                setOpen(false)
            })
            .catch(e => console.log(e))
    }

     const getMeals = () => {
        return meals.filter(meal => {
            // console.log(meal.date,moment(meal.date).format('DD-MM'), selectedDay, moment(meal.date).format('DD-MM') === selectedDay)
            return moment(meal.date).format('DD-MM') === selectedDay
        })
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
                addMeal(meal)
                return meal
            } else {
                mealApi.removeMeal(id)
            }
        }))
    }

    const dismissBottomSheet = () => {
        setOpen(false)
        setSearchName("")
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
                         onDismiss={() => dismissBottomSheet()}>
                <div className={"p-2"}>
                    <div className="border-4 border-gray-400 text-gray-600 rounded-xl w-full">
                        <input type={"text"} value={searchName} onChange={e => searchByName(e.target.value)} placeholder={"Nom de la recette..."}
                               className={"m-2 w-[95%] focus:outline-none"}/>
                    </div>
                    <Carousel slides={filteredRecipes} addMeal={addMeal}/>
                </div>
                <div className={"flex justify-center pb-4 pt-2"}>
                    <button className={"flex items-center text-gray-600"}>
                        <FaPlusCircle/> <span className={"ml-1"}>Ajouter ma recette</span>
                    </button>
                </div>
            </BottomSheet>
        </div>
    )
}
