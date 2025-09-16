import { useContext, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { getCategories } from '@apis/categoryService';
import { MdClear } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { TfiClose } from 'react-icons/tfi';
import LoadMore from '@components/Loading/LoadMore';
import { SearchContext } from '@contexts/SearchProvider';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '@apis/productsService';
import useDebounce from '@hooks/useDebounce';
import Categories from '@components/Search/Categories/Categories';
import Products from '@components/Search/Products/Products';

function Search() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const { showSearch, setShowSearch } = useContext(SearchContext);

    const navigate = useNavigate();
    const inputRef = useRef();
    const debouncedValue = useDebounce(searchValue, 500);

    const trendingSearches = [
        {
            title: 'Shirt',
            href: '/#',
        },
        {
            title: 'Shoes',
            href: '/#',
        },
        {
            title: 'Cap',
            href: '/#',
        },
        {
            title: 'Skirt',
            href: '/#',
        },
    ];

    const handleClose = () => {
        setShowSearch(false);
    };

    const handleClearInput = () => {
        setSearchValue('');
        setProducts([]);
        inputRef.current.focus();
    };

    const handleNavigateToShop = categoryName => {
        var path = `/shop/${categoryName}`;
        setShowSearch(false);
        navigate(path);
    };

    const handleNavigateToDetail = id => {
        var path = `/product/${id}`;
        setShowSearch(false);
        navigate(path);
    };

    const handleChangeSelected = e => {
        setSelectedCategory(e.target.value);
    };

    const handleChangeSearch = e => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleBtnSearch = () => {
        const path = `/shop/${selectedCategory}/${debouncedValue}`;
        setShowSearch(false);
        navigate(path);
    };

    useEffect(() => {
        getCategories()
            .then(res => {
                setCategories(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setProducts([]);
            return;
        }

        const query = {
            sortType: 0,
            page: 0,
            limit: 0,
            categoryName: selectedCategory,
            keyword: debouncedValue,
        };
        setIsLoading(true);
        getProducts(query)
            .then(res => {
                setProducts(res.data.content);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [debouncedValue]);

    return (
        <div
            className={cls(styles.container, {
                [styles.showSearch]: showSearch,
            })}
        >
            <div className={styles.containerForm}>
                <form>
                    <div>
                        <div className={styles.title}>
                            Bạn đang tìm kiếm cái gì?
                        </div>
                        <div className={styles.formInput}>
                            <select
                                className={styles.formSelect}
                                value={selectedCategory}
                                onChange={handleChangeSelected}
                            >
                                <option value={'all'} key={0}>
                                    Tất cả thể loại
                                </option>
                                {categories?.map(item => {
                                    return (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className={styles.inputSearch}>
                                <input
                                    type='text'
                                    value={searchValue}
                                    placeholder='Tìm kiếm sản phẩm'
                                    onChange={handleChangeSearch}
                                    spellCheck={false}
                                    ref={inputRef}
                                />
                                <span>
                                    {isLoading && <LoadMore size={13} />}
                                    {!!searchValue && (
                                        <MdClear
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleClearInput()}
                                        />
                                    )}
                                </span>
                            </div>
                            <div className={styles.boxBtn}>
                                <button
                                    type='submit'
                                    onClick={() => handleBtnSearch()}
                                >
                                    <IoIosSearch size={16} />
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                        <div className={styles.tags}>
                            <span className={styles.tagsTitle}>
                                Top tìm kiếm:{' '}
                            </span>
                            {trendingSearches.map((item, index) => {
                                return (
                                    <span
                                        key={index}
                                        href={item.href}
                                        onClick={() =>
                                            setSearchValue(item.title)
                                        }
                                    >
                                        {item.title}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    {products.length > 0 &&
                        (isLoading ? (
                            <LoadMore />
                        ) : (
                            <Products
                                data={products}
                                searchValue={searchValue}
                                handleNavigateToDetail={handleNavigateToDetail}
                            />
                        ))}
                    {debouncedValue && !products.length && !isLoading && (
                        <span>Không tìm thấy kết quả nào!</span>
                    )}
                    {!searchValue && (
                        <Categories
                            categories={categories}
                            handleNavigateToShop={handleNavigateToShop}
                        />
                    )}
                </form>
            </div>
            <span className={styles.btnClose} onClick={() => handleClose()}>
                <TfiClose size={26} />
            </span>
        </div>
    );
}

export default Search;
