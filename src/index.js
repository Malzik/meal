import React, {useState} from 'react';
import ReactDOM                                   from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import reportWebVitals                            from './reportWebVitals';
import { initConfig }                             from "./service/config/config";
import { Home }                                   from "./feature/home/Home";
import { Template }                               from "./feature/home/components/layout/Template";
import { Ingredients }                            from "./feature/home/components/ingredient/Ingredients";
import { Recipes }                                from "./feature/home/components/recipe/Recipes";
import {MobileHome} from "./feature/mobile/MobileHome";
import {Login} from "./feature/login/Login";

const AppWrapper = () => {
    const [ingredients, setIngredients] = useState([])
    const [recipes, setRecipes] = useState([])

    return (
        <Router>
            <Template ingredients={ingredients} setIngredients={setIngredients} recipes={recipes} setRecipes={setRecipes}>
                <Switch>
                    <Route path="/ingredients"><Ingredients ingredients={ingredients} setIngredients={setIngredients}/></Route>
                    <Route path="/recipes"><Recipes ingredients={ingredients} recipes={recipes} setRecipes={setRecipes}/></Route>
                    <Route path="/mobile"><MobileHome ingredients={ingredients} recipes={recipes}/></Route>
                    <Route path="/"><Login/></Route>
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
