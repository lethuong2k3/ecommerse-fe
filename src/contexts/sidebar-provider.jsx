import { createContext, useEffect, useState } from 'react';
import { getCart } from '@apis/cartService';
import Cookies from 'js-cookie';
import { getWishList } from '@apis/wishlistService';
import { getListCompare } from '@apis/compareService';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [leftSideBar, setLeftSideBar] = useState(false);
    const [type, setType] = useState('');
    const [listProductCart, setListProductCart] = useState([]);
    const [listWList, setListWList] = useState([]);
    const [compareList, setCompareList] = useState([]);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const userId = Cookies.get('id');

    const handleGetListProductsCart = userId => {
        if (userId) {
            setIsLoading(true);
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

    const handleGetListWishList = userId => {
        if (userId) {
            setIsLoading(true);
            getWishList()
                .then(res => {
                    setListWList(res.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setListWList([]);
                    setIsLoading(false);
                });
        }
    };
    const handleGetListCompare = userId => {
        if (userId) {
            setIsLoading(true);
            getListCompare()
                .then(res => {
                    setCompareList(res.data.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setCompareList([]);
                    setIsLoading(false);
                });
        }
    };
    useEffect(() => {
        handleGetListProductsCart(userId);
        handleGetListWishList(userId);
        handleGetListCompare(userId);
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
        listWList,
        handleGetListWishList,
        setListWList,
        setListProductCart,
        compareList,
        setCompareList,
        handleGetListCompare,
        leftSideBar,
        setLeftSideBar,
    };
    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
};
