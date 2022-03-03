import React from "react";

export const Carousel = ({ slides, addMeal}) => {
    const length = slides.length;

    const getImage = image => image === undefined ? "empty.png" : image

    return (
        length > 0 && (
            <div className={"flex overflow-x-auto gap-4 py-2"}>
                {
                    slides.map((slide, index) =>
                        <div key={index} className={"w-[8rem] h-[8rem] text-center"} onClick={() => addMeal(slide)}>
                            <img src={getImage(slide.image)} alt={slide.name}  className={"w-[8rem] max-w-[8rem]"}/>
                            <label>{slide.name}</label>
                        </div>
                    )
                }
            </div>
        )
    );
};
