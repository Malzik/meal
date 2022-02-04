import { requestApi } from "./request";
import {toast} from "react-hot-toast";

export const ingredientApi = {
    getIngredients: () =>
        new Promise((resolve, reject) => {
            requestApi
                .get("meal/ingredient")
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    addIngredient: name =>
        new Promise((resolve, reject) => {
            requestApi
                .post("meal/ingredient", {
                        name,
                })
                .then(res =>{
                    if(res.status >= 300) {
                        reject(res.statusText)
                    }
                    toast.success('Ingredient ' + name + ' ajouté')
                    return res.json()
                })
                .then(res => resolve(res))
                .catch(err => reject(err))
        }),
    updateIngredient: (id, name) =>
        new Promise((resolve, reject) => {
            requestApi
                .put("meal/ingredient/" + id, {
                    name,
                })
                .then(res =>{
                    if(res.status >= 300) {
                        reject(res.statusText)
                    }
                    toast.success('Ingredient ' + name + ' mis à jour')
                    return res.json()
                })
                .then(res => resolve(res))
                .catch(err => reject(err))
        }),
    deleteIngredient: id =>
        new Promise((resolve, reject) => {
            requestApi
                .delete("meal/ingredient/" + id)
                .then(res =>{
                    if(res.status >= 300) {
                        reject(res.statusText)
                    }
                    toast.success('Ingredient supprimé')
                    resolve(res)
                })
                .catch(err => reject(err))
        }),
}