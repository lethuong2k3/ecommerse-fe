import { createContext, useEffect, useState } from 'react';
import { getProducts } from '@apis/productsService';
import { useNavigate, useParams } from 'react-router-dom';

export const OurShopContext = createContext();

export const OurShopProvider = ({ children }) => {
    const [sortId, setSortId] = useState(0);
    const [showId, setShowId] = useState(8);
    const [isShowGrid, setIsShowGrid] = useState(true);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const navigate = useNavigate();

    const param = useParams();
    const sortOptions = [
        { label: 'Mặc định', value: 0 },
        { label: 'Phổ biến', value: 1 },
        { label: 'Đánh giá', value: 2 },
        { label: 'Mới nhất', value: 3 },
        { label: 'Giá thấp - cao', value: 4 },
        { label: 'Giá cao - thấp', value: 5 },
    ];
    const showOptions = [
        { label: '8', value: 8 },
        { label: '12', value: 12 },
        { label: 'Tất cả', value: 0 },
    ];

    const handleLoadMore = () => {
        const query = {
            sortType: sortId,
            page: +page + 1,
            limit: showId,
            categoryName: 'all',
        };
        if (param.categoryName) query.categoryName = param.categoryName;
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
            categoryName: 'all',
        };
        if (param.categoryName) query.categoryName = param.categoryName;
        if (param.keyword) query.keyword = param.keyword;
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
    }, [sortId, showId, param]);
    useEffect(() => {
        if (param.keyword && products.length == 1) {
            navigate(`/product/${products[0].id}`);
        }
    }, [products, param]);
    return (
        <OurShopContext.Provider value={values}>
            {children}
        </OurShopContext.Provider>
    );
};
