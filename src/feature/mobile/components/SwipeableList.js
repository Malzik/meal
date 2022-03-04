import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type
} from "react-swipeable-list";
import {Recipe} from "./Recipe";
import React from "react";
import {FaCheck, FaTrash} from "react-icons/fa";

export const MealSwipeableList = ({meals, removeMeals}) => {
    const handleAccept = id => () => {
        console.log('[Handle ACCEPT]', id);
    };

    const handleDelete = id => () => {
        console.log('[Handle DELETE]', id);
        removeMeals(id)
    };

    const leadingActions = id => (
        <LeadingActions>
            <SwipeAction onClick={handleDelete(id)}>
                <div className={"bg-red-600 text-white font-bold flex items-center pl-7 pr-2"}>
                    <FaTrash className={"h-6 w-6"}/>
                </div>
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = id => (
        <TrailingActions>
            <SwipeAction onClick={handleAccept(id)}>
                <div className={"bg-green-600 text-white font-bold flex items-center pr-7 pl-2"}>
                    <FaCheck className={"h-6 w-6"}/>
                </div>
            </SwipeAction>
        </TrailingActions>
    );

    return (
        meals.length > 0 ?
            <SwipeableList
                threshold={0.7}
                type={Type.ANDROID}
            >
                {meals.map(recipe =>
                    <SwipeableListItem
                        key={recipe.id}
                        leadingActions={leadingActions(recipe.id)}
                        // trailingActions={trailingActions(recipe.id)}
                    >
                        <Recipe key={recipe.name} recipe={recipe}/>
                    </SwipeableListItem>
                )}
            </SwipeableList>
            : null
    )
}
