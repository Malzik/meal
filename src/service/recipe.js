import { requestApi } from "./request";

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
                    resolve(res)
                })
                .catch(err => reject(err))
        }),
}