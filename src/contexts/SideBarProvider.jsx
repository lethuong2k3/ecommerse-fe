import { createContext, useEffect, useState } from 'react';
import { getCart } from '@apis/cartService';
import Cookies from 'js-cookie';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [listProductCart, setListProductCart] = useState([]);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const userId = Cookies.get('id');

    const handleGetListProductsCart = (userId, type) => {
        if (userId && type === 'cart') {
            getCart()
                .then(res => {
                    setListProductCart(res.data.orderItems);
                    setIsLoading(false);
                })
                .catch(err => {
                    setListProductCart([]);
                    setIsLoading(false);
                });
        }
    };
    useEffect(() => {
        handleGetListProductsCart(userId, 'cart');
    }, []);
    const value = {
        isOpen,
        setIsOpen,
        type,
        setType,
        handleGetListProductsCart,
        listProductCart,
        isLoading,
        setIsLoading,
        product,
        setProduct,
    };
    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
};
