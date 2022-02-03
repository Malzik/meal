import {FaSearch} from "react-icons/fa";
import {MuuriComponent} from "muuri-react";
import {GiChicken} from "react-icons/gi";
import React, {useEffect, useState} from "react";
import {columnOptions} from "../../../../service/utils";
import {ingredientApi} from "../../../../service/ingredient";

export const RightPanel = ({onSend, items}) => {
    console.log(items)

    const renderRecipe = () => {
            return items['ingredients'].map(item =>
                <div className={"inline-block border-2 rounded-2xl p-2"} key={item.id}>
                    <div className={"mx-2 shadow-lg rounded-2xl inline-block"}>
                        <GiChicken className={"font-width m-2"}/>
                    </div>
                    <div className={"inline-block align-top"}>
                        <h3>{item.name}</h3>
                        <h3>{item.ingredients}</h3>
                    </div>
                </div>
            )
    }

    return (
        <div className={"overflow-y-scroll h-full"}>
            <div className="text-gray-700 leading-10 text-xl">Ajouter Element</div>
            <div className="border-4 border-white rounded-full w-full">
                <label htmlFor="right-panel-searchbar" className="rounded-2xl">
                    <FaSearch className="inline-block my-2 mx-2 text-gray-500"/>
                    <input className="right-panel-searchbar inline-block bg-transparent focus:outline-none text-lg" name="right-panel-searchbar"
                           type="text" placeholder="Recette, ingredient..." />
                </label>
            </div>
            <MuuriComponent containerClass={"muuri-rightpanel-grid"} {...columnOptions} id={"ingredients"} onSend={onSend}>
                {renderRecipe()}
            </MuuriComponent>
        </div>
    )
}
