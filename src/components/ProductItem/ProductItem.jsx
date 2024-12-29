import styles from './styles.module.scss';
import { BsBag, BsHeart, BsEye, BsCart3 } from 'react-icons/bs';
import { TfiReload, TfiEmail } from 'react-icons/tfi';
import {
    FaXTwitter,
    FaFacebookF,
    FaVk,
    FaPinterestP,
    FaLinkedinIn,
    FaWhatsapp,
    FaSkype,
} from 'react-icons/fa6';
import _ from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { OurShopContext } from '@contexts/OurShopProvider';
import Cookies from 'js-cookie';
import { SidebarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';

import LoadMore from '@components/Loading/LoadMore';
import SliderCommon from '@components/SliderCommon/SliderCommon';
import Size from '@components/ProductItem/Size/Size';
import Color from '@components/ProductItem/Color/Color';
import QuantitySelector from '@components/QuantitySelector/QuantitySelector';
import Button from '@components/Button/Button';

import { addProductToCart } from '@apis/cartService';
import { getProductDetail } from '@apis/productsService';

function ProductItem({
    src,
    prevSrc,
    name,
    item,
    isHomePage = true,
    isViewProduct = false,
}) {
    const ourShopStore = useContext(OurShopContext);
    const {
        setIsOpen,
        setType,
        handleGetListProductsCart,
        setProduct,
        listProductCart,
    } = useContext(SidebarContext);
    const { toast } = useContext(ToastContext);

    const userId = Cookies.get('id');

    const [isShowGrid, setIsShowGrid] = useState(ourShopStore?.isShowGrid);
    const [sizeChoose, setSizeChoose] = useState('');
    const [colorChoose, setColorChoose] = useState('');
    const [showSizeChoose, setShowSizeChoose] = useState(false);
    const [productDetail, setProductDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const sizes = useMemo(() => {
        const sizeSet = _.uniq(_.map(item?.productDetails, 'size.name'));
        return sizeSet;
    }, [item]);
    const colors = useMemo(() => {
        const colorSet = _.uniq(_.map(item?.productDetails, 'color.hex'));
        return colorSet;
    }, [item]);

    const getPriceRange = obj => {
        const prices = obj.map(product => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        return { minPrice, maxPrice };
    };
    const { minPrice, maxPrice } = getPriceRange(item.productDetails);
    const isSamePrice = minPrice === maxPrice;
    const productDetailCart = listProductCart.filter(
        lst => lst.productDetail.id === productDetail?.id
    )[0];

    const handleSetShowSizeChoose = () => {
        setShowSizeChoose(true);
    };

    const handleChooseSize = size => {
        setSizeChoose(size);
    };

    const handleChooseColor = color => {
        setColorChoose(color);
    };

    const handleAddToCart = () => {
        if (isHomePage) return;
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

        const query = {
            orderItems: [
                {
                    productDetail: productDetail,
                    quantity: quantity,
                },
            ],
        };
        setIsLoading(true);
        addProductToCart(query)
            .then(res => {
                if (res.data.errors) {
                    toast.error(res.data.errors['400']);
                    setIsLoading(false);
                    return;
                }
                setIsOpen(true);
                setType('cart');
                toast.success('Add product to cart successfully!');
                setIsLoading(false);
                handleGetListProductsCart(userId, 'cart');
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    };

    const handleClear = () => {
        setSizeChoose('');
        setColorChoose('');
        setShowSizeChoose(false);
        setProductDetail(null);
        setQuantity(1);
    };

    const handleShowDetailProduct = () => {
        setProduct(item);
        setIsOpen(true);
        setType('detail');
    };

    const handleDecrement = () => {
        if (quantity <= 1) {
            return;
        }
        setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        if (!sizeChoose) {
            toast.warning('Please choose size!');
            return;
        }
        if (!colorChoose) {
            toast.warning('Please choose color!');
            return;
        }
        if (
            quantity < productDetail?.amount &&
            (!productDetailCart ||
                quantity <
                    +productDetail?.amount - +productDetailCart?.quantity)
        ) {
            setQuantity(quantity + 1);
        }
    };

    useEffect(() => {
        isHomePage
            ? setIsShowGrid(true)
            : setIsShowGrid(ourShopStore?.isShowGrid);
    }, [isHomePage, ourShopStore?.isShowGrid]);

    useEffect(() => {
        if (colorChoose && sizeChoose) {
            let productDetail = item?.productDetails?.filter(
                pd =>
                    pd.size.name === sizeChoose && pd.color.hex === colorChoose
            )[0];
            getProductDetail(productDetail.id)
                .then(resp => {
                    setProductDetail(resp.data.data);
                    handleGetListProductsCart(userId, 'cart');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [colorChoose, sizeChoose]);
    return (
        <div
            className={cls({
                [styles.containerItem]: !isShowGrid && !isViewProduct,
                [styles.containerViewItem]: isViewProduct,
            })}
            style={{
                cursor: isViewProduct ? 'default' : 'pointer',
                flexDirection: isViewProduct ? 'column' : '',
            }}
        >
            <div
                className={cls(styles.boxImg, {
                    [styles.largImg]: !isShowGrid && !isViewProduct,
                })}
                style={{ width: isViewProduct ? '100%' : '' }}
            >
                {!isViewProduct ? (
                    <>
                        <img src={src} alt='' />
                        <img
                            src={prevSrc}
                            alt=''
                            className={styles.showImgWhenHover}
                        />
                    </>
                ) : (
                    <SliderCommon data={item.images} />
                )}

                {!isHomePage && !isViewProduct && (
                    <Size
                        showSizeChoose={showSizeChoose}
                        isViewProduct={isViewProduct}
                        handleSetShowSizeChoose={handleSetShowSizeChoose}
                        handleChooseSize={handleChooseSize}
                        sizes={sizes}
                        sizeChoose={sizeChoose}
                    />
                )}

                {!isViewProduct && (
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
                        <div
                            className={styles.boxIcon}
                            onClick={handleShowDetailProduct}
                        >
                            <BsEye />
                        </div>
                    </div>
                )}
            </div>

            <div
                className={cls({
                    [styles.content]: !isShowGrid && !isViewProduct,
                })}
                style={{ marginTop: '10px' }}
            >
                {!isHomePage && !isViewProduct && (
                    <Color
                        colors={colors}
                        colorChoose={colorChoose}
                        handleChooseColor={handleChooseColor}
                    />
                )}

                {(!isHomePage && showSizeChoose && !isViewProduct) ||
                (colorChoose != '' && !isViewProduct && !isHomePage) ? (
                    <div
                        className={styles.btnClear}
                        onClick={() => handleClear()}
                    >
                        clear
                    </div>
                ) : (
                    ''
                )}

                <div
                    className={cls(styles.title, {
                        [styles.textCenter]: !isHomePage && !isViewProduct,
                    })}
                >
                    {name}
                </div>

                {!isHomePage && !isViewProduct && (
                    <div
                        className={styles.textCenter}
                        style={{ color: '#888', fontSize: '14px' }}
                    >
                        {item.brand.name}
                    </div>
                )}

                <div
                    className={cls(styles.price, {
                        [styles.textCenter]: !isHomePage && !isViewProduct,
                    })}
                    style={{ color: isHomePage ? '#333' : '#888' }}
                >
                    {productDetail ? (
                        <div>${productDetail.price}</div>
                    ) : isSamePrice ? (
                        <div>${minPrice}</div>
                    ) : (
                        <div>
                            ${minPrice} - ${maxPrice}
                        </div>
                    )}
                </div>

                {isViewProduct && (
                    <>
                        <div className={styles.des}>{item.description}</div>

                        <div className={styles.labelSize}>
                            Size {productDetail?.size.name}
                        </div>
                        <Size
                            showSizeChoose={showSizeChoose}
                            isViewProduct={isViewProduct}
                            handleSetShowSizeChoose={handleSetShowSizeChoose}
                            handleChooseSize={handleChooseSize}
                            sizes={sizes}
                            sizeChoose={sizeChoose}
                        />

                        <div className={styles.labelColor}>
                            Color {productDetail?.color.name}
                        </div>
                        <Color
                            colors={colors}
                            colorChoose={colorChoose}
                            handleChooseColor={handleChooseColor}
                            isViewProduct={isViewProduct}
                        />

                        {(!isHomePage && isViewProduct && sizeChoose) ||
                        (colorChoose != '' && isViewProduct && !isHomePage) ? (
                            <div
                                className={styles.btnClear}
                                onClick={() => handleClear()}
                                style={{ textAlign: 'left' }}
                            >
                                clear
                            </div>
                        ) : (
                            ''
                        )}

                        <div className={styles.boxAddToCart}>
                            <QuantitySelector
                                item={item}
                                quantity={quantity}
                                increment={handleIncrement}
                                decrement={handleDecrement}
                                productDetail={productDetail}
                                productDetailCart={productDetailCart}
                            />
                            <div>
                                <Button
                                    content={
                                        <>
                                            <BsCart3 /> ADD TO CART
                                        </>
                                    }
                                    onClick={handleAddToCart}
                                />
                            </div>
                        </div>

                        {productDetail && (
                            <div className={styles.labelQty}>
                                Current quantity:{' '}
                                {productDetailCart
                                    ? +productDetail.amount -
                                      +productDetailCart.quantity
                                    : productDetail.amount}
                            </div>
                        )}

                        <div className={styles.boxOr}>
                            <div className={styles.line} />
                            <div>OR</div>
                            <div className={styles.line} />
                        </div>

                        <Button content={'BUY NOW'} style={{ width: '100%' }} />

                        <div className={styles.boxAddOther}>
                            <TfiReload size={20} />
                            <div>Add to compare</div>
                        </div>

                        <div className={styles.boxAddOther}>
                            <BsHeart size={20} />
                            <div>Add to wishlist</div>
                        </div>

                        <div className={styles.boxFooter}>
                            SKU: <span>{item.sku}</span>
                        </div>
                        <div className={styles.boxFooter}>
                            Category: <span>{item.category.name}</span>
                        </div>
                        <div className={styles.boxFooter}>
                            Estimated delivery: <span>5 - 7 days</span>
                        </div>
                        <div className={styles.boxFooter}>
                            Share:{' '}
                            <span className={styles.iconFooter}>
                                <i>
                                    <FaXTwitter />
                                </i>
                                <i>
                                    <FaFacebookF />
                                </i>
                                <i>
                                    <FaVk />
                                </i>
                                <i>
                                    <FaPinterestP />
                                </i>
                                <i>
                                    <TfiEmail />
                                </i>
                                <i>
                                    <FaLinkedinIn />
                                </i>
                                <i>
                                    <FaWhatsapp />
                                </i>
                                <i>
                                    <FaSkype />
                                </i>
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductItem;
