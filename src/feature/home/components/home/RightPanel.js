import {FaAppleAlt, FaEdit, FaSearch, FaTrash} from "react-icons/fa";
import {MuuriComponent} from "muuri-react";
import {GiChicken} from "react-icons/gi";
import React  from "react";
import {columnOptions} from "../../../../service/utils";
import {Recipe} from "../recipe/Recipe";
import {Ingredient} from "../ingredient/Ingredient";
import {ingredientApi} from "../../../../service/ingredient";

export const RightPanel = ({onSend, items, ingredients, setIngredients, updateIngredients, addRecipe}) => {
    const deleteIngredient = id => {
        ingredientApi
            .deleteIngredient(id)
            .then(() => setIngredients(ingredients.filter(ingredient => ingredient.id !== id)))
            .catch(err => console.log(err))
    }
    const renderRecipe = () => {
        return items['ingredients'].map(ingredient =>
            <div className={"inline-block border-2 rounded-2xl p-2 m-2 bg-indigo-300"} key={ingredient.id}>
                <div className={"mx-2 shadow rounded-2xl inline-block"}>
                    <GiChicken className={"font-width m-2"}/>
                </div>
                <div className={"inline-block align-top"}>
                    <h3>{ingredient.name}</h3>
                    <div>
                        <Ingredient title={"Modifier"} buttonText={"Modifier"} ingredient={ingredient} setIngredients={setIngredients}><FaEdit className={"cursor-pointer inline"}/></Ingredient>
                        <button onClick={() => deleteIngredient(ingredient.id)} className={"ml-4"}>
                            <FaTrash className={"inline"} />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className={"flex flex-wrap"}>
                <div className="border-4 border-white rounded-full bg-indigo-300">
                    <FaSearch className="inline-block my-2 mx-2 text-gray-500 sm:hidden xl:inline"/>
                    <input className="right-panel-searchbar inline-block bg-transparent focus:outline-none text-lg sm:ml-6 xl:ml-0" name="right-panel-searchbar"
                           type="text" placeholder="Recette, ingredient..." />
                </div>
                <div className={"border-2 rounded-xl ml-2 bg-indigo-300 sm:mt-2 xl:mt-0"}>
                    <Ingredient title={"Ajouter un ingrédient"} buttonText={"Ajouter"} updateIngredients={updateIngredients}>
                        <FaAppleAlt className={"cursor-pointer modal-icons"}/>
                    </Ingredient>
                </div>
                <div className={"border-2 rounded-xl ml-2 bg-indigo-300 sm:mt-2 xl:mt-0"}>
                    <Recipe title={"Ajouter une recette"} buttonText={"Ajouter"} addRecipe={addRecipe} navBarClassName={"navbar-title"} ingredients={ingredients}/>
                </div>
            </div>
            <div className={"max-h-[80vh] overflow-y-auto"}>
                <MuuriComponent containerClass={"muuri-rightpanel-grid"} {...columnOptions} id={"ingredients"} onSend={onSend} dragEnabled dragFixed>
                    {renderRecipe()}
                </MuuriComponent>
            </div>
        </div>
    )
}
