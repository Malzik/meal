import React, {useEffect, useState} from "react";
import {Recipe} from "./components/Recipe";
import {FaPlus} from "react-icons/fa";
import {DaySlider} from "./components/DaySlider";
import moment from "moment";
import {Carousel} from "./components/Carousel";

export const MobileHome = () => {
    const [selectedDay, setSelectedDay] = useState(moment().format('DD-MM'))
    const [recipes, setRecipes] = useState([])
    const [dbRecipes, setDbRecipes] = useState([])
    const [open, setOpen] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        setRecipes(['empty.png', 'empty.png', 'empty.png', 'empty.png'])
        // setRecipes([{image: undefined, name: "Poulet curry coco"}])
    }, [])

    const addRecipe = (recipe) => setRecipes(oldRecipes => [oldRecipes, recipe])

    const getRecipes = () => {
        return dbRecipes.filter(dbRecipe => dbRecipe.date === selectedDay)
    }
    return (
        <div className={"font-roboto m-2"}>
            <DaySlider selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
            <h2 className={"text-[#6699CC] text-2xl font-bold pt-2"}>Mes recettes</h2>
            {getRecipes().map(recipe => <Recipe key={recipe.name} recipe={recipe}/>)}
            <div className={"border-2 border-[#6699CC] text-[#6699CC] rounded-lg max-h-[8em] h-[8em] my-2 text-center"}
                 onClick={() => setOpen(true)}>
                <FaPlus className={"w-[4rem] h-[4rem] p-1 m-auto mt-3 rounded-full border-4 border-[#6699CC]"}/>
                <h3 className={"text-2xl"}>Ajouter une recette</h3>
            </div>
            {open ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg bg-[#F7EDE2] relative flex flex-col w-full outline-none focus:outline-none">
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                      ×
                                    </span>
                                </button>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="max-w-lg h-72 flex overflow-hidden relative">
                                        <Carousel slides={recipes}/>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setOpen(false)}
                                    >
                                        Femer
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setOpen(false)}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}
