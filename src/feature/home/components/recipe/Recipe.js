import React, { useEffect, useState } from "react";
import { recipeApi }        from "../../../../service/recipe";
import { RecipeIngredient } from "./RecipeIngredient";
import {Modal} from "../layout/Modal";
import {FaHamburger, FaPlusCircle} from "react-icons/fa";

export const Recipe = ({title, buttonText, recipe, addRecipe, ingredients, children}) => {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState(recipe !== undefined ? recipe.name : '')
    const [ingredientsSelected, setIngredientsSelected] = useState([]);

    useEffect(() => {
        if (recipe !== undefined) {
            setIngredientsSelected(recipe.ingredients)
        }
    }, [recipe])

    const createRecipe = () => {
        if (name.length <= 3) {
            setError('Le nom de la recette est invalide')
            return;
        }
        if (recipe !== undefined) {
            recipeApi
                .updateRecipe(recipe.id, name)
                .then(result => {
                    addRecipe(result)
                    handleClose()
                })
                .catch(err => console.log(err))
        } else {
            recipeApi
                .addRecipe(name, ingredientsSelected)
                .then(result => {
                    addRecipe(result, true)
                    clean()
                    handleClose()
                })
                .catch(err => console.log(err))
        }
    }

    const updateIngredient = (key, ingredient) => {
        let items = ingredientsSelected
        items[key] = ingredient

        setIngredientsSelected(items)
    }

    const deleteIngredient = (index) => {
        const newIngredients = [...ingredientsSelected]
        newIngredients.splice(index, 1)
        setIngredientsSelected(newIngredients)
    }

    const addIngredient = () => {
        const newIngredient = {
            name: '',
            quantity: 0,
            unit: ''
        }
        setIngredientsSelected((ingredientsSelected) => [...ingredientsSelected, newIngredient])
    }

    const clean = () => {
        setIngredientsSelected([])
        setName('')
    }

    return (
        <>
            <Modal open={open} handleClose={handleClose} title={title}>
                <div className="p-6">
                    <div className="border-4 border-gray rounded-full w-full">
                        <input value={name} onChange={e => setName(e.target.value)} placeholder={"Nom de la recette..."} className={"m-2 w-[95%] focus:outline-none"}/>
                        {error.length > 0 && (
                            <div className="text-normal text-red-500 ">{error}</div>
                        )}
                    </div>
                    <div>
                        {ingredientsSelected.map((ingredientSelected, key) =>
                            <RecipeIngredient
                                key={key}
                                index={key}
                                ingredients={ingredients}
                                selectIngredient={ingredientSelected}
                                updateIngredient={updateIngredient}
                                deleteIngredient={deleteIngredient} />
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => addIngredient()}
                    >
                        <FaPlusCircle className={"inline"} />&nbsp;Ajouter un ingredient
                    </button>
                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => createRecipe()}
                    >
                        <FaPlusCircle className={"inline"} />&nbsp;{buttonText}
                    </button>
                </div>
            </Modal>
            <div onClick={handleOpen}>{children}</div>
        </>
    )
}
