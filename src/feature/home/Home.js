import React, { useState } from "react";
import { Recipes }         from "./components/Recipes";
import { Modal }           from "./components/Modal";
import * as data           from '../../data.json'
import { Schedule }        from "./components/Schedule";

export const Home = () => {
    const [recipes, setRecipes] = useState(data.recipes)
    const [show, setShow] = useState(false)

    return (
        <div>
            <Modal show={show} handleClose={setShow}>
                <p>Modal</p>
            </Modal>
            <button onClick={() => setShow(true)}>Ajouter une recette</button>
            {/*<Recipes recipes={recipes} />*/}
            <Schedule />
        </div>
    )
}