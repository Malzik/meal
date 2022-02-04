import React, { useState } from "react";
import { ingredientApi } from "../../../../service/ingredient";
import {Modal} from "../layout/Modal";
import {FaPlusCircle} from "react-icons/fa";

export const Ingredient = ({title, buttonText, ingredient, updateIngredients, navBarClassName}) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState(ingredient !== undefined ? ingredient.name : '')

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        if (ingredient === undefined) {
            setName('')
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            createIngredient()
        }
    }

    const createIngredient = () => {
        if (ingredient !== undefined && ingredient.id !== undefined) {
            ingredientApi
                .updateIngredient(ingredient.id, name)
                .then(result => {
                    updateIngredients(result)
                    handleClose()
                })
                .catch(err => console.log(err))
        } else {
            ingredientApi
                .addIngredient(name)
                .then(result => {
                    handleClose()
                    updateIngredients(result, true)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <Modal open={open} handleClose={handleClose} title={title}>
                <div className="p-6">
                    <div className="border-4 border-gray rounded-full w-full">
                        <input type={"text"} value={name} onChange={e => setName(e.target.value)} placeholder={"Nom de l'ingrédient..."} className={"m-2 w-[95%] focus:outline-none"} onKeyDown={handleKeyDown}/>
                    </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleClose()}
                    >
                        Fermer
                    </button>
                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => createIngredient()}
                    >
                        <FaPlusCircle className={"inline"} />&nbsp;{buttonText}
                    </button>
                </div>
            </Modal>
            <button className={navBarClassName} onClick={handleOpen}>{title}</button>
        </>
    )
}
