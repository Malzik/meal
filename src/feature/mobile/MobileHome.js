import React, {useEffect, useState} from "react";
import {Recipe} from "./components/Recipe";
import {FaPlus} from "react-icons/fa";

export const MobileHome = () => {
    const [recipes, setRecipes] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setRecipes([{image: undefined, name: "Poulet curry coco"}])
    }, [])

    const addRecipe = (recipe) => setRecipes({...recipes, recipe})

    return (
        <div className={"font-roboto"}>
            {recipes.map(recipe => <Recipe key={recipe.name} recipe={recipe}/>)}
            <div className={"border-2 border-[#6699CC] text-[#6699CC] rounded-lg max-h-[8em] h-[8em] m-2 text-center"}
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
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="mb-3 pt-0">
                                        <input type="text" placeholder="Nom de la recette"
                                               className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setOpen(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setOpen(false)}
                                    >
                                        Save Changes
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