import { requestApi } from "./request";

export const mealApi = {
    getMeals: () =>
        new Promise((resolve, reject) => {
            requestApi
                .get("meal")
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    addMeal: (title, date, recipes) =>
        new Promise((resolve, reject) => {
            requestApi
                .post("meal", {
                    title: title,
                    date: date,
                    recipes: recipes
                })
                .then(res =>{
                    if(res.status >= 300) {
                        reject(res.statusText)
                    }
                    resolve(res)
                })
                .catch(err => reject(err))
        }),
}