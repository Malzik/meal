import { requestApi } from "./request";

export const mealApi = {
    getMeals: () =>
        new Promise((resolve, reject) => {
            requestApi
                .get("meal")
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    addMeal: (date, order, recipeId) =>
        new Promise((resolve, reject) => {
            requestApi
                .post("meal", {
                    order: order,
                    date: date,
                    recipe_id: recipeId
                })
                .then(res =>{
                    if(res.status >= 300) {
                        reject(res.statusText)
                    }
                    resolve(res)
                })
                .catch(err => reject(err))
        }),
    removeMeal: id =>
        new Promise((resolve, reject) => {
            requestApi
                .delete("meal/" + id)
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
}