import React, {useState} from "react";
import {Ingredient} from "../ingredient/Ingredient";
import {Recipe} from "../recipe/Recipe";
import {NavLink} from "react-router-dom";

export const Navbar = ({ingredients, setIngredients, recipes, setRecipes}) => {
    const [isOpen, setIsOpen] = useState(false);

    const updateIngredients = (newIngredient, isNew = false) => {
        if (isNew) {
            setIngredients([...ingredients, newIngredient])
            return
        }
        setIngredients(ingredients.map(ingredient => {
            if (ingredient.id === newIngredient.id) {
                ingredient.name = newIngredient.name
            }
            return ingredient
        }))
    }

    return (
        <nav className="bg-gray-800 mb-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-8 w-8"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                alt="Workflow"
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink to="" exact activeClassName="text-indigo-500" className={"navbar-title"}>Accueil</NavLink>
                                <NavLink to="/ingredients" activeClassName="text-indigo-500" className={"navbar-title"}>Ingredients</NavLink>
                                <NavLink to="/recipes" activeClassName="text-indigo-500" className={"navbar-title"}>Recette</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className={isOpen ? "show" : "hidden"}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="/"
                       className="navbar-dropdown-title"
                    >
                        Accueil
                    </a>
                    <NavLink to="/ingredients" className={"navbar-dropdown-title"}>Ingredients</NavLink>
                    <NavLink to="/recipes" className={"navbar-dropdown-title"}>Recette</NavLink>
                </div>
            </div>
        </nav>
    );
}
