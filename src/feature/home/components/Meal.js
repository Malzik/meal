import React, { useEffect, useState } from "react";
import './Meal.css';
import Select                         from "react-select";
import makeAnimated                   from "react-select/animated";

export const Meal = ({title, meals}) => {
    const animatedComponents = makeAnimated();
    const [mealList] = useState(meals);

    return (
        <div className="meal">
            <div>{title}</div>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={mealList}
            />
        </div>
    )
}