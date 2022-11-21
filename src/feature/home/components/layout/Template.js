import React, {useEffect} from "react";
import { Toaster } from 'react-hot-toast';
import { Navbar } from "./Navbar";
import jwt_decode from "jwt-decode";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import {ingredientApi} from "../../../../service/ingredient";
import {recipeApi} from "../../../../service/recipe";


export const Template = props => {
    let history = useHistory()
    const [cookie, , removeCookie] = useCookies(['user'])
    useEffect(() => {
        if(cookie.token === undefined) {
            history.push('/login');
            return;
        }
        const decodedToken = jwt_decode(cookie.token)
        if(decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
            return
        }
        ingredientApi
            .getIngredients()
            .then(result => props.setIngredients(result))
            .catch(err => console.log(err))

        recipeApi
            .getRecipes()
            .then(result => {
                props.setRecipes(result.map(recipe => {
                        return ({
                            id: recipe.id,
                            name: recipe.name,
                            ingredients: recipe.ingredients.map(ingredient => {
                                return ({
                                    id: ingredient.id,
                                    name: ingredient.name,
                                    quantity: ingredient.recipe_ingredient.quantity,
                                    unit: ingredient.recipe_ingredient.unit,
                                })
                            })
                        })
                    }
                ))
            })
            .catch(err => console.log(err))
    }, [])

    const logout = () => {
        removeCookie("refreshToken", {path: "/"})
        removeCookie("token", {path: "/"})
        removeCookie("user", {path: "/"})
    }

    return (
        <div className="bg-[#fefefe] pb-5 max-h-screen h-screen overflow-y-scroll">
            <Navbar logout={logout}/>
            {props.children}
            <Toaster />
        </div>
    );
}
