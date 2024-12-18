import styles from './styles.module.scss';
import { BsBag, BsHeart, BsEye } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';
import _ from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { CiRuler } from 'react-icons/ci';
import { OurShopContext } from '@contexts/OurShopProvider';
import Cookies from 'js-cookie';
import { SidebarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';
import { addProductToCart } from '@apis/cartService';
import LoadMore from '@components/Loading/LoadMore';

function ProductItem({ src, prevSrc, name, item, isHomePage = true }) {
    const getPriceRange = obj => {
        const prices = obj.map(product => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        return { minPrice, maxPrice };
    };
    const { minPrice, maxPrice } = getPriceRange(item.productDetails);
    const isSamePrice = minPrice === maxPrice;
    const sizes = useMemo(() => {
        const sizeSet = _.uniq(_.map(item?.productDetails, 'size.name'));
        return sizeSet;
    }, [item]);
    const colors = useMemo(() => {
        const colorSet = _.uniq(_.map(item?.productDetails, 'color.hex'));
        return colorSet;
    }, [item]);
    const ourShopStore = useContext(OurShopContext);
    const [isShowGrid, setIsShowGrid] = useState(ourShopStore?.isShowGrid);
    const [sizeChoose, setSizeChoose] = useState('');
    const [colorChoose, setColorChoose] = useState('');
    const [showSizeChoose, setShowSizeChoose] = useState(false);
    const userId = Cookies.get('id');
    const { setIsOpen, setType, handleGetListProductsCart } =
        useContext(SidebarContext);
    const { toast } = useContext(ToastContext);
    const [isLoading, setIsLoading] = useState(false);
    const handleChooseSize = size => {
        setSizeChoose(size);
    };

    const handleChooseColor = color => {
        setColorChoose(color);
    };

    const handleAddToCart = () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Please login to add product to cart');
            return;
        }
        if (!sizeChoose) {
            setShowSizeChoose(true);
            toast.warning('Please choose size!');
            return;
        }
        if (!colorChoose) {
            toast.warning('Please choose color!');
            return;
        }
        let productDetail = item?.productDetails?.filter(
            pd => pd.size.name === sizeChoose && pd.color.hex === colorChoose
        )[0];
        const query = {
            orderItems: [
                {
                    productDetail: productDetail,
                    quantity: 1,
                },
            ],
        };
        setIsLoading(true);
        addProductToCart(query)
            .then(res => {
                setIsOpen(true);
                setType('cart');
                toast.success('Add product to cart successfully!');
                setIsLoading(false);
                handleGetListProductsCart(userId, 'cart');
            })
            .catch(err => {
                toast.error('Add product to cart failed');
                setIsLoading(false);
            });
    };

    const handleClearSize = () => {
        setSizeChoose('');
        setColorChoose('');
        setShowSizeChoose(false);
    };
    useEffect(() => {
        isHomePage
            ? setIsShowGrid(true)
            : setIsShowGrid(ourShopStore?.isShowGrid);
    }, [isHomePage, ourShopStore?.isShowGrid]);
    useEffect(() => {
        if (isHomePage) {
            setSizeChoose(sizes[0]);
            setColorChoose(colors[0]);
        }
    }, [isHomePage]);
    return (
        <div
            className={isShowGrid ? '' : styles.containerItem}
            style={{ cursor: 'pointer' }}
        >
            <div
                className={cls(styles.boxImg, {
                    [styles.largImg]: !isShowGrid,
                })}
            >
                <img src={src} alt='' />
                <img src={prevSrc} alt='' className={styles.showImgWhenHover} />
                {!isHomePage && (
                    <>
                        {showSizeChoose ? (
                            <div className={styles.boxSize}>
                                {sizes?.map((size, index) => (
                                    <div
                                        className={cls(styles.sizes, {
                                            [styles.isActiveSize]:
                                                sizeChoose === size,
                                        })}
                                        key={index}
                                        onClick={() => handleChooseSize(size)}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.boxAddSize}>
                                <div
                                    className={styles.addSize}
                                    onClick={() => setShowSizeChoose(true)}
                                >
                                    <CiRuler size={25} />
                                </div>
                            </div>
                        )}
                    </>
                )}

                <div
                    className={cls(styles.showFncWhenHover, {
                        [styles.locationShowFnc]: !isHomePage,
                    })}
                >
                    <div
                        className={styles.boxIcon}
                        onClick={() => handleAddToCart()}
                    >
                        {isLoading ? <LoadMore /> : <BsBag />}
                    </div>
                    <div className={styles.boxIcon}>
                        <BsHeart />
                    </div>
                    <div className={styles.boxIcon}>
                        <TfiReload />
                    </div>
                    <div className={styles.boxIcon}>
                        <BsEye />
                    </div>
                </div>
            </div>
            <div
                className={isShowGrid ? '' : styles.content}
                style={{ marginTop: '10px' }}
            >
                {!isHomePage && (
                    <>
                        <div className={styles.boxColor}>
                            {colors?.map((color, index) => (
                                <div
                                    key={index}
                                    className={cls(styles.colors, {
                                        [styles.isActiveColor]:
                                            colorChoose === color,
                                    })}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleChooseColor(color)}
                                ></div>
                            ))}
                        </div>
                    </>
                )}

                {!isHomePage && showSizeChoose | (colorChoose != '') ? (
                    <div
                        className={styles.btnClear}
                        onClick={() => handleClearSize()}
                    >
                        clear
                    </div>
                ) : (
                    ''
                )}
                <div
                    className={cls(styles.title, {
                        [styles.textCenter]: !isHomePage,
                    })}
                >
                    {name}
                </div>
                {!isHomePage && (
                    <div
                        className={styles.textCenter}
                        style={{ color: '#888', fontSize: '14px' }}
                    >
                        {item.brand.name}
                    </div>
                )}
                <div
                    className={cls(styles.price, {
                        [styles.textCenter]: !isHomePage,
                    })}
                    style={{ color: isHomePage ? '#333' : '#888' }}
                >
                    {isSamePrice ? (
                        <p>${minPrice}</p>
                    ) : (
                        <>
                            <p>Min Price: ${minPrice}</p>
                            <p>Max Price: ${maxPrice}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
