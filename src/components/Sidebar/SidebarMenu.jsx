import styles from './styles.module.scss';
import classNames from 'classnames';
import Logo from '@images/Logo.png';

import { useContext, useEffect, useRef, useState } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import { MdClear, MdClose } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { TfiClose } from 'react-icons/tfi';
import dataMenu from '@components/Sidebar/constans';
import { getProducts } from '@apis/productsService';
import useDebounce from '@hooks/useDebounce';
import LoadMore from '@components/Loading/LoadMore';
import getPriceRange from '@hooks/useFomatPrice';
import { StoreContext } from '@contexts/StoreProvider';

function SidebarMenu() {
    const { leftSideBar, setLeftSideBar, listProductCart } =
        useContext(SidebarContext);
    const { userInfo } = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [products, setProducts] = useState([]);
    const inputRef = useRef();
    const debouncedValue = useDebounce(searchValue, 500);

    const subTotal = listProductCart.reduce((acc, item) => {
        return acc + item.totalPrice;
    }, 0);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setProducts([]);
            return;
        }

        const query = {
            sortType: 0,
            page: 0,
            limit: 0,
            categoryName: 'all',
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

    const handleToggle = () => {
        setLeftSideBar(!leftSideBar);
    };

    const handleChangeSearch = e => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClearInput = () => {
        setSearchValue('');
        setProducts([]);
        inputRef.current.focus();
    };

    const handleRenderText = content => {
        return content === 'Account' && userInfo
            ? `Hello: ${userInfo?.name}`
            : content;
    };

    return (
        <div className={styles.container}>
            <div
                className={classNames({
                    [styles.overlay]: leftSideBar,
                })}
                onClick={handleToggle}
            />
            <div
                className={classNames(styles.sideBar, styles.left, {
                    [styles.sideSideBar]: leftSideBar,
                })}
            >
                {leftSideBar && (
                    <div
                        className={classNames(styles.boxIcon, {
                            [styles.btnRight]: leftSideBar,
                        })}
                        onClick={handleToggle}
                    >
                        <MdClose />
                    </div>
                )}
                <div className={styles.contentSideBar}>
                    <div className={styles.logo}>
                        <img
                            src={Logo}
                            style={{ width: '70px', height: '70px' }}
                            alt='Logo'
                        />
                    </div>
                    <div className={styles.searchInput}>
                        <input
                            value={searchValue}
                            type='text'
                            placeholder='Search for products.'
                            spellCheck={false}
                            ref={inputRef}
                            onChange={handleChangeSearch}
                            onFocus={() => setShowResult(true)}
                            onBlur={() => setShowResult(false)}
                        />
                        <span className={styles.boxClear}>
                            {isLoading && <LoadMore size={12} />}
                            {!!searchValue && (
                                <MdClear
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleClearInput()}
                                />
                            )}
                        </span>
                        <div className={styles.boxBtn}>
                            <IoIosSearch size={20} />
                        </div>
                        {showResult &&
                            products.length > 0 &&
                            (isLoading ? (
                                <LoadMore />
                            ) : (
                                <div className={styles.searchResults}>
                                    {products.map(item => (
                                        <div
                                            className={styles.products}
                                            key={item.id}
                                        >
                                            <div className={styles.productName}>
                                                {item.name}
                                            </div>
                                            <span
                                                className={styles.productPrice}
                                            >
                                                {getPriceRange(
                                                    item.productDetails
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}

                        {debouncedValue && !products.length && !isLoading && (
                            <div className={styles.searchResults}>
                                <span className={styles.products}>
                                    No results were found!
                                </span>
                            </div>
                        )}
                    </div>
                    <nav>
                        {dataMenu.map((item, index) => {
                            return (
                                <a key={index} href={item.href}>
                                    {item.icon && <item.icon />}{' '}
                                    {handleRenderText(item.content)}{' '}
                                    {item.content === 'Cart' &&
                                        `$${parseFloat(subTotal.toFixed(2))}`}
                                </a>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default SidebarMenu;
