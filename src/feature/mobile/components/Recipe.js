import React from "react";

export const Recipe = ({recipe}) => {
    const renderImage = () => recipe.image === undefined ? "empty.png" : "images/" + recipe.image

    return (
        <div className={"text-gray-500 rounded-lg max-h-[8em] h-[8em] my-3 flex w-full"}>
            <img src={renderImage()} className={"w-5/12 inline rounded-2xl"} alt={"Recipe Image"}
                 onError={e => e.target.src="empty.png"}/>
            <div className={"m-2 w-7/12"}>
                <h1 className={"text-xl"}>{ recipe.name }
                {recipe.quantity > 1 ?
                <span
                    className="px-2 py-1 mr-2 text-xs font-bold bg-[#ffaf64] bg-red-60 text-white rounded-full float-right">
                    {recipe.quantity}
                </span> : null}
                </h1>
            </div>
        </div>
    )
}
