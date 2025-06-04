const formatPrice = price => {
    return price ? price?.toLocaleString('vi-VN') + 'đ' : `0đ`;
};

const getPriceRange = obj => {
    if (!obj || !obj.length) return;
    const prices = obj.map(product => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    if (minPrice === maxPrice) return formatPrice(maxPrice);
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};

export { getPriceRange, formatPrice };
