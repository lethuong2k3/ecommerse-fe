const getPriceRange = obj => {
    const prices = obj.map(product => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return { minPrice, maxPrice };
};

export default getPriceRange;
