import React from "react";

const ItemCarousel = ({
    item
}) => {
    return (
        <img
            src={item.src}
            alt={item.alt}
        />
    );
}

export default ItemCarousel;