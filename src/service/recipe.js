import { requestApi } from "./request";
import {toast} from "react-hot-toast";

export const recipeApi = {
    getRecipes: () =>
        new Promise((resolve, reject) => {
            requestApi
                .get("meal/recipe")
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    addRecipe: (name, ingredients) =>
        new Promise((resolve, reject) => {
            requestApi
                .post("meal/recipe", {
                    name,
                    ingredients
                })
                .then(res =>{
                    if(res.status >= 300) {
                        reject(res.statusText)
                    }
                    toast.success('Recette ' + name + ' ajoutée')
                    return res.json()
                })
                .then(res => resolve(res))
                .catch(err => reject(err))
        }),
    updateRecipe: (id, name) =>
        new Promise((resolve, reject) => {
            requestApi
                .put("meal/recipe/" + id, {
                    name,
                })
                .then(res =>{
                    if(res.status >= 300) {
                        reject(res.statusText)
                    }
                    console.log(name)
                    toast.success('Recette ' + name + ' mise à jour')
                    return res.json()
                })
                .then(res => resolve(res))
                .catch(err => reject(err))
        }),
    deleteRecipe: id =>
        new Promise((resolve, reject) => {
            requestApi
                .delete("meal/recipe/" + id)
                .then(res =>{
                    if(res.status >= 300) {
                        reject(res.statusText)
                    }
                    toast.success('Recette supprimée')
                    resolve(res)
                })
                .catch(err => reject(err))
        }),
}