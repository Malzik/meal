import React from "react";
import {useCarousel} from "./UseCarousel.js";

export const Carousel = ({ slides, interval = 5000 }) => {
    const length = slides.length;
    const [active, setActive, handlers, style] = useCarousel(length, interval);

    return (
        length > 0 && (
            <div className="carousel">
                <ol className="carousel-indicators">
                    {slides.map((_, index) => (
                        <li
                            onClick={() => setActive(index)}
                            key={index}
                            className={`${active === index ? "active" : ""}`}
                        />
                    ))}
                </ol>
                <div className="carousel-content" {...handlers} style={style}>
                    <div className="carousel-item">{slides[slides.length - 1]}</div>
                    {slides.map((slide, index) => (
                        <div className="carousel-item" key={index}>
                            <img src={slide} />
                        </div>
                    ))}
                    <div className="carousel-item">{slides[0]}</div>
                </div>
            </div>
        )
    );
};