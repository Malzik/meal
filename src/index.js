import React, {useEffect, useState} from 'react';
import ReactDOM                                   from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals                            from './reportWebVitals';
import { initConfig }                             from "./service/config/config";
import { Home }                                   from "./feature/home/Home";
import { Template }                               from "./feature/home/components/layout/Template";
import { Ingredients }                            from "./feature/home/components/ingredient/Ingredients";
import { Recipes }                                from "./feature/home/components/recipe/Recipes";
import {ingredientApi} from "./service/ingredient";
import {recipeApi} from "./service/recipe";
import {MobileHome} from "./feature/mobile/MobileHome";

const AppWrapper = () => {
    const [ingredients, setIngredients] = useState([])
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        // ingredientApi
        //     .getIngredients()
        //     .then(result => setIngredients(result))
        //     .catch(err => console.log(err))
        //
        // recipeApi
        //     .getRecipes()
        //     .then(result => {
        //         setRecipes(result.map(recipe => {
        //                 return ({
        //                     id: recipe.id,
        //                     name: recipe.name,
        //                     ingredients: recipe.ingredients.map(ingredient => {
        //                         return ({
        //                             id: ingredient.id,
        //                             name: ingredient.name,
        //                             quantity: ingredient.recipe_ingredient.quantity,
        //                             unit: ingredient.recipe_ingredient.unit,
        //                         })
        //                     })
        //                 })
        //             }
        //         ))
        //     })
        //     .catch(err => console.log(err))
    }, [])

    return (
        <Router>
            <Template ingredients={ingredients} setIngredients={setIngredients} recipes={recipes} setRecipes={setRecipes}>
                <Switch>
                    <Route path="/ingredients"><Ingredients ingredients={ingredients} setIngredients={setIngredients}/></Route>
                    <Route path="/recipes"><Recipes ingredients={ingredients} recipes={recipes} setRecipes={setRecipes}/></Route>
                    <Route path="/mobile"><MobileHome /></Route>
                    <Route path="/"><Home ingredients={ingredients} setIngredients={setIngredients} recipes={recipes} setRecipes={setRecipes}/></Route>
                </Switch>
            </Template>
        </Router>
    )
}

initConfig()
    .then(() => {
        ReactDOM.render(
            (<AppWrapper />),
            document.getElementById('root')
        );
    })
    .catch(err => {
        console.error('App bootstrap stop', err);
    });

reportWebVitals();
