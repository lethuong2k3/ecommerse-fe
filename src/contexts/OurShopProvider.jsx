import { createContext, useEffect, useState } from 'react';
import getProducts from '@apis/productsService';

export const OurShopContext = createContext();

export const OurShopProvider = ({ children }) => {
    const sortOptions = [
        { label: 'Default sorting', value: '0' },
        { label: 'Sort by popularity', value: '1' },
        { label: 'Sort by average rating', value: '2' },
        { label: 'Sort by latest', value: '3' },
        { label: 'Sort by price low to hight', value: '4' },
        { label: 'Sort by price hight to low', value: '5' },
    ];
    const showOptions = [
        { label: '8', value: '8' },
        { label: '12', value: '12' },
        { label: 'All', value: 'all' },
    ];

    const [sortId, setSortId] = useState('0');
    const [showId, setShowId] = useState('8');
    const [isShowGrid, setIsShowGrid] = useState(true);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const handleLoadMore = () => {
        const query = {
            sortType: sortId,
            page: +page + 1,
            limit: showId,
        };
        setIsLoadMore(true);
        getProducts(query)
            .then(res => {
                setProducts(prev => {
                    return [...prev, ...res.data.content];
                });
                setPage(res.data.page.number);
                setTotal(res.data.page.totalElements);
                setIsLoadMore(false);
            })
            .catch(err => {
                setIsLoadMore(false);
                console.log(err);
            });
    };
    const values = {
        sortOptions,
        showOptions,
        setSortId,
        setShowId,
        setIsShowGrid,
        products,
        isShowGrid,
        isLoading,
        handleLoadMore,
        total,
        isLoadMore,
    };
    useEffect(() => {
        const query = {
            sortType: sortId,
            page: 0,
            limit: showId,
        };
        setIsLoading(true);
        getProducts(query)
            .then(res => {
                setProducts(res.data.content);
                setTotal(res.data.page.totalElements);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    }, [sortId, showId]);
    return (
        <OurShopContext.Provider value={values}>
            {children}
        </OurShopContext.Provider>
    );
};
