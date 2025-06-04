import styles from './styles.module.scss';
import { BsBag, BsHeart, BsEye, BsCart3, BsHeartFill } from 'react-icons/bs';
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
import { getPriceRange, formatPrice } from '@hooks/useFomatPrice';

import { addProductToCart } from '@apis/cartService';
import { getProductDetail } from '@apis/productsService';
import { useNavigate } from 'react-router-dom';
import { createWishList, deleteWishList } from '@apis/wishlistService';
import { deleteCompare, createCompare } from '@apis/compareService';

function ProductItem({
    src,
    prevSrc,
    name,
    item,
    isHomePage = true,
    isViewProduct = false,
    slideItem = false,
    isRelatedProducts,
}) {
    const ourShopStore = useContext(OurShopContext);
    const {
        setIsOpen,
        setType,
        handleGetListProductsCart,
        handleGetListWishList,
        setProduct,
        listProductCart,
        listWList,
        compareList,
        handleGetListCompare,
    } = useContext(SidebarContext);
    const { toast } = useContext(ToastContext);

    const userId = Cookies.get('id');

    const [isShowGrid, setIsShowGrid] = useState(ourShopStore?.isShowGrid);
    const [sizeChoose, setSizeChoose] = useState('');
    const [colorChoose, setColorChoose] = useState('');
    const [showSizeChoose, setShowSizeChoose] = useState(false);
    const [productDetail, setProductDetail] = useState(null);
    const [isLoadingCart, setIsLoadingCart] = useState(false);
    const [isLoadingWList, setIsLoadingWList] = useState(false);
    const [isLoadingCompare, setIsLoadingCompare] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const sizes = useMemo(() => {
        const sizeSet = _.uniq(_.map(item?.productDetails, 'size.name'));
        return sizeSet;
    }, [item]);
    const colors = useMemo(() => {
        const colorSet = _.uniqBy(
            item?.productDetails?.map(({ color }) => ({
                hex: color.hex,
                name: color.name,
            })),
            'hex'
        );
        return colorSet;
    }, [item]);

    const productDetailCart = listProductCart?.filter(
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

    const isInWishlist = listWList?.some(w => w.product.id === item.id);

    const handleAddToCompare = () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập');
            return;
        }
        const compare = compareList.find(c => c.product.id === item.id);
        setIsLoadingCompare(true);
        if (compare) {
            deleteCompare(compare.id)
                .then(res => {
                    handleGetListCompare(userId);
                    setIsLoadingCompare(false);
                })
                .catch(err => {
                    setIsLoadingCompare(false);
                    console.log(err);
                });
        } else {
            createCompare({ product: item })
                .then(res => {
                    setIsOpen(true);
                    setType('compare');
                    toast.success('Thêm sản phẩm vào mục so sánh');
                    setIsLoadingCompare(false);
                    handleGetListCompare(userId);
                })
                .catch(err => {
                    setIsLoadingCompare(false);
                    console.log(err);
                });
        }
    };

    const handleAddToWishList = () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập');
            return;
        }
        const wishlistItem = listWList.find(w => w.product.id === item.id);
        setIsLoadingWList(true);
        if (wishlistItem) {
            deleteWishList(wishlistItem.id)
                .then(res => {
                    handleGetListWishList(userId);
                    setIsLoadingWList(false);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoadingWList(false);
                });
        } else {
            const query = {
                product: { id: item.id },
            };

            createWishList(query)
                .then(res => {
                    setIsOpen(true);
                    setType('wishlist');
                    toast.success('Thêm sản phẩm vào mục yêu thích');
                    setIsLoadingWList(false);
                    handleGetListWishList(userId);
                })
                .catch(err => {
                    setIsLoadingWList(false);
                    console.log(err);
                });
        }
    };

    const handleAddToCart = () => {
        if (isHomePage) {
            handleNavigateToDetail();
            return;
        }
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập');
            return;
        }
        if (!sizeChoose) {
            setShowSizeChoose(true);
            toast.warning('Vui lòng chọn size');
            return;
        }
        if (!colorChoose) {
            toast.warning('Vui lòng chọn màu sắc');
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
        setIsLoadingCart(true);
        addProductToCart(query)
            .then(res => {
                if (res.data.errors) {
                    toast.error(res.data.errors['401']);
                    handleGetListProductsCart(userId);
                    setIsLoadingCart(false);
                    return;
                }
                setIsOpen(true);
                setType('cart');
                toast.success('Thêm sản phẩm vào giỏ hàng thành công');
                setIsLoadingCart(false);
                handleGetListProductsCart(userId);
            })
            .catch(err => {
                console.log(err);
                setIsLoadingCart(false);
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
            toast.warning('Vui lòng chọn size');
            return;
        }
        if (!colorChoose) {
            toast.warning('Vui lòng chọn màu sắc');
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

    const handleNavigateToDetail = () => {
        if (isViewProduct) {
            setIsOpen(false);
        }
        const path = `/product/${item.id}`;
        navigate(path);
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
                    pd.size.name === sizeChoose &&
                    pd.color.hex === colorChoose.hex
            )[0];
            getProductDetail(productDetail.id)
                .then(resp => {
                    setProductDetail(resp.data.data);
                    if (userId) handleGetListProductsCart(userId);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [colorChoose, sizeChoose]);

    useEffect(() => {
        if (slideItem) setIsShowGrid(true);
    }, [slideItem]);

    return (
        <div
            className={cls(styles.container, {
                [styles.containerItem]: !isShowGrid && !isViewProduct,
                [styles.containerViewItem]: isViewProduct,
                [styles.containerRelatedProducts]: isRelatedProducts,
            })}
            style={{
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
                    <div
                        onClick={handleNavigateToDetail}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={src} alt='' />
                        <img
                            src={prevSrc}
                            alt=''
                            className={styles.showImgWhenHover}
                        />
                    </div>
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
                            {isLoadingCart ? <LoadMore /> : <BsBag />}
                        </div>
                        <div
                            className={styles.boxIcon}
                            onClick={() => handleAddToWishList()}
                        >
                            {isLoadingWList ? (
                                <LoadMore />
                            ) : isInWishlist ? (
                                <BsHeartFill />
                            ) : (
                                <BsHeart />
                            )}
                        </div>
                        <div
                            className={styles.boxIcon}
                            onClick={() => handleAddToCompare()}
                        >
                            {isLoadingCompare ? <LoadMore /> : <TfiReload />}
                        </div>
                        <div
                            className={cls(styles.boxIcon, styles.hideOnMobile)}
                            onClick={handleShowDetailProduct}
                        >
                            <BsEye />
                        </div>
                    </div>
                )}
            </div>

            <div
                className={cls(styles.boxContent, {
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
                    onClick={handleNavigateToDetail}
                    style={{ cursor: 'pointer' }}
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
                        <span>{formatPrice(productDetail.price)}</span>
                    ) : (
                        getPriceRange(item?.productDetails)
                    )}
                </div>

                {isViewProduct && (
                    <>
                        <div className={styles.des}>{item.description}</div>

                        <div className={styles.labelSize}>
                            Size {sizeChoose}
                        </div>
                        <Size
                            isViewProduct={isViewProduct}
                            handleChooseSize={handleChooseSize}
                            sizes={sizes}
                            sizeChoose={sizeChoose}
                        />

                        <div className={styles.labelColor}>
                            Màu sắc {colorChoose.name}
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
                            <Button
                                content={
                                    <>
                                        <BsCart3 /> Thêm vào giỏ
                                    </>
                                }
                                disabled={
                                    +productDetail?.amount -
                                        +productDetailCart?.quantity ===
                                    0
                                }
                                onClick={handleAddToCart}
                            />
                        </div>

                        {productDetail && (
                            <div className={styles.labelQty}>
                                Số lượng trong kho: {productDetail.amount}
                            </div>
                        )}

                        <div className={styles.boxOr}>
                            <div className={styles.line} />
                            <div>OR</div>
                            <div className={styles.line} />
                        </div>

                        <Button
                            content={'Mua ngay'}
                            style={{ width: '100%' }}
                        />

                        <div
                            className={styles.boxAddOther}
                            onClick={() => handleAddToCompare()}
                        >
                            <TfiReload size={20} />
                            <div>Thêm vào mục so sánh</div>
                        </div>

                        <div
                            className={styles.boxAddOther}
                            onClick={() => handleAddToWishList()}
                        >
                            <BsHeart size={20} />
                            <div>Thêm vào mục yêu thích</div>
                        </div>

                        <div className={styles.boxFooter}>
                            SKU: <span>{item.sku}</span>
                        </div>
                        <div className={styles.boxFooter}>
                            Thể loại: <span>{item.category.name}</span>
                        </div>
                        <div className={styles.boxFooter}>
                            Dự kiến giao hàng: <span>5 - 7 ngày</span>
                        </div>
                        <div className={styles.boxFooter}>
                            Chia sẻ:{' '}
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
