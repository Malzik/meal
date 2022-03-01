import React, {useEffect, useState} from "react";

export const RecipeIngredient = ({index, ingredients, selectIngredient, updateIngredient, deleteIngredient}) => {
    const [ingredient, setIngredient] = useState({})

    useEffect(() => {
        setIngredient(selectIngredient)
    }, [selectIngredient])

    const updateSelectedIngredients = (e) => {
        setIngredient({...ingredient, name: e.target.value})
        updateIngredient(index, {...selectIngredient, name: e.target.value})
    }

    const updateSelectedIngredientsQuantity = (value) => {
        setIngredient({...ingredient, quantity: value})
        updateIngredient(index, {...selectIngredient, quantity: parseFloat(value)})
    }

    const updateSelectedIngredientsUnit = (value) => {
        setIngredient({...ingredient, unit: value})
        updateIngredient(index, {...selectIngredient, unit: value})
    }

    return (
        <div className={"px-2 pb-2 m-2 border-2 rounded"}>
            <div className={"flex align-end"}>
                <span className={"ml-auto text-gray-500 arrow cursor-pointer"} onClick={() => deleteIngredient(index)}>×</span>
            </div>
            <select value={ingredient.name} onChange={updateSelectedIngredients} className={"w-full rounded bg-white border border-solid border-gray-300 p-2"}>
                {ingredients.map(ingredient => <option key={ingredient.id} value={ingredient.name}>{ingredient.name}</option>)}
            </select>
            <div className="flex flex-wrap justify-around">
                <div className="border-4 my-2 border-gray rounded w-full md:w-[48%]">
                    <input type={"number"} value={ingredient.quantity || 0} onChange={e => updateSelectedIngredientsQuantity(e.target.value)} placeholder={"Quantité"} className={"m-2 w-[95%] focus:outline-none"}/>
                </div>
                <div className="border-4 my-2 border-gray rounded w-full md:w-[48%]">
                    <input value={ingredient.unit || ''} onChange={e => updateSelectedIngredientsUnit(e.target.value)} placeholder={"Unité"} className={"m-2 w-[95%] focus:outline-none"}/>
                </div>
            </div>
        </div>
    )
}
