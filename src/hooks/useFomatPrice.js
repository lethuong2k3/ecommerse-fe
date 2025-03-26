const getPriceRange = obj => {
    if (!obj) return;
    const prices = obj.map(product => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    if (minPrice === maxPrice) return `$${maxPrice}`;
    return `$${minPrice} - $${maxPrice}`;
};

export default getPriceRange;
