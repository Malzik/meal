import React from "react";

export const Recipe = ({recipe}) => {
    const renderImage = () => recipe.image === undefined ? "empty.png" : recipe.image

    return (
        <div className={"border-2 border-[#6699CC] text-[#6699CC] rounded-lg max-h-[8em] h-[8em] m-2 flex"}>
            <img src={renderImage()} className={"w-5/12 inline"} alt={"Recipe Image"}/>
            <div className={"m-2 w-7/12"}>
                <h1 className={"text-xl"}>{ recipe.name }</h1>
            </div>
        </div>
    )
}