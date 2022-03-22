import React from "react";

export const Carousel = ({ slides, addMeal}) => {
    const length = slides.length;

    const getImage = image => image === undefined ? "empty.png" : "images/" + image

    return (
        length > 0 && (
            <div className={"flex overflow-x-auto overflow-y-hidden gap-4 py-4 text-gray-600"}>
                {
                    slides.map((slide, index) =>
                        <div key={index} className={"h-[8rem] text-center"} onClick={() => addMeal(slide)}>
                            <img src={getImage(slide.image)} alt={slide.name}  className={"h-[7rem]"}
                                 onError={e => e.target.src="empty.png"}/>
                            <label className={"h-[1rem]"}>{slide.name}</label>
                        </div>
                    )
                }
            </div>
        )
    );
};
