import React from "react";

export const Recipe = ({recipe}) => {
    const renderImage = () => recipe.image === undefined ? "empty.png" : recipe.image

    return (
        <div className={"text-[#6699CC] rounded-lg max-h-[8em] h-[8em] my-3 flex"}>
            <img src={renderImage()} className={"w-5/12 inline rounded-2xl"} alt={"Recipe Image"}/>
            <div className={"m-2 w-7/12"}>
                <h1 className={"text-xl"}>{ recipe.name }</h1>
            </div>
        </div>
    )
}
