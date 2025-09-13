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
import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
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
import {
    createWishList,
    deleteWishList,
    getWListByProductAndUser,
} from '@apis/wishlistService';
import {
    deleteCompare,
    createCompare,
    getCompareByProduct,
} from '@apis/compareService';

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
        handleGetListCompare,
    } = useContext(SidebarContext);
    const { toast } = useContext(ToastContext);

    const userId = Cookies.get('id');

    const initialState = {
        isShowGrid: ourShopStore?.isShowGrid,
        sizeChoose: '',
        colorChoose: '',
        showSizeChoose: false,
        productDetail: null,
        isLoadingCart: false,
        isLoadingWList: false,
        isLoadingCompare: false,
        quantity: 1,
        isWishList: {},
        isCompare: {},
    };

    const [state, dispatch] = useReducer(reducer, initialState);

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

    const validSizesByColor = useMemo(() => {
        if (!state.colorChoose) return sizes;
        return _.uniq(
            item?.productDetails
                ?.filter(pd => pd.color.hex === state.colorChoose.hex)
                .map(pd => pd.size.name)
        );
    }, [state.colorChoose, item]);

    const validColorsBySize = useMemo(() => {
        if (!state.sizeChoose) return colors;
        return _.uniqBy(
            item?.productDetails
                ?.filter(pd => pd.size.name === state.sizeChoose)
                .map(pd => ({
                    hex: pd.color.hex,
                    name: pd.color.name,
                })),
            'hex'
        );
    }, [state.sizeChoose, item]);

    const productDetailCart = listProductCart?.filter(
        lst => lst.productDetail.id === state.productDetail?.id
    )[0];

    function reducer(state, action) {
        return { ...state, [action.type]: action.payload };
    }

    const handleSetShowSizeChoose = () => {
        dispatch({ type: 'showSizeChoose', payload: true });
    };

    const handleChooseSize = size => {
        dispatch({ type: 'sizeChoose', payload: size });
    };

    const handleChooseColor = color => {
        dispatch({ type: 'colorChoose', payload: color });
    };

    const handleAddToCompare = () => {
        if (state.isLoadingCompare) return;
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập');
            return;
        }
        dispatch({ type: 'isLoadingCompare', payload: true });
        if (state.isCompare.status === 1) {
            deleteCompare(state.isCompare.id)
                .then(res => {
                    dispatch({ type: 'isLoadingCompare', payload: false });
                    handleGetListCompare(userId);
                    apiIsCompare();
                })
                .catch(err => {
                    dispatch({ type: 'isLoadingCompare', payload: false });
                    console.log(err);
                });
        } else {
            createCompare({ product: item })
                .then(res => {
                    dispatch({ type: 'isLoadingCompare', payload: false });
                    handleGetListCompare(userId);
                    apiIsCompare();
                    setIsOpen(true);
                    setType('compare');
                    toast.success('Thêm sản phẩm vào mục so sánh');
                })
                .catch(err => {
                    console.log(err);
                    dispatch({ type: 'isLoadingCompare', payload: false });
                });
        }
    };

    const handleAddToWishList = () => {
        if (state.isLoadingWList) return;
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập');
            return;
        }
        dispatch({ type: 'isLoadingWList', payload: true });
        if (state.isWishList.status === 1) {
            deleteWishList(state.isWishList.id)
                .then(res => {
                    dispatch({ type: 'isLoadingWList', payload: false });
                    handleGetListWishList(userId);
                    apiIsWishList();
                })
                .catch(err => {
                    console.log(err);
                    dispatch({ type: 'isLoadingWList', payload: false });
                });
        } else {
            const query = {
                product: { id: item.id },
            };

            createWishList(query)
                .then(res => {
                    dispatch({ type: 'isLoadingWList', payload: false });
                    setIsOpen(true);
                    setType('wishlist');
                    toast.success('Thêm sản phẩm vào mục yêu thích');
                    handleGetListWishList(userId);
                    apiIsWishList();
                })
                .catch(err => {
                    dispatch({ type: 'isLoadingWList', payload: false });
                    console.log(err);
                });
        }
    };

    const handleAddToCart = () => {
        if (state.isLoadingCart) return;
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
        if (!state.sizeChoose) {
            dispatch({ type: 'showSizeChoose', payload: true });
            toast.warning('Vui lòng chọn size');
            return;
        }
        if (!state.colorChoose) {
            toast.warning('Vui lòng chọn màu sắc');
            return;
        }

        const query = {
            orderItems: [
                {
                    productDetail: state.productDetail,
                    quantity: state.quantity,
                },
            ],
        };
        dispatch({ type: 'isLoadingCart', payload: true });
        addProductToCart(query)
            .then(res => {
                if (res.data.errors) {
                    toast.error(res.data.errors['401']);
                    handleGetListProductsCart(userId);
                    dispatch({ type: 'isLoadingCart', payload: false });
                    return;
                }
                setIsOpen(true);
                setType('cart');
                toast.success('Thêm sản phẩm vào giỏ hàng thành công');
                dispatch({ type: 'isLoadingCart', payload: false });
                handleGetListProductsCart(userId);
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'isLoadingCart', payload: false });
            });
    };

    const handleClear = () => {
        dispatch({ type: 'sizeChoose', payload: '' });
        dispatch({ type: 'colorChoose', payload: '' });
        dispatch({ type: 'showSizeChoose', payload: false });
        dispatch({ type: 'productDetail', payload: null });
        dispatch({ type: 'quantity', payload: 1 });
    };

    const handleShowDetailProduct = () => {
        setProduct(item);
        setIsOpen(true);
        setType('detail');
    };

    const handleDecrement = () => {
        if (state.quantity <= 1) {
            return;
        }
        setQuantity(state.quantity - 1);
    };

    const handleIncrement = () => {
        if (!state.sizeChoose) {
            toast.warning('Vui lòng chọn size');
            return;
        }
        if (!state.colorChoose) {
            toast.warning('Vui lòng chọn màu sắc');
            return;
        }
        if (
            state.quantity < state.productDetail?.amount &&
            (!productDetailCart ||
                state.quantity <
                    +state.productDetail?.amount - +productDetailCart?.quantity)
        ) {
            dispatch({ type: 'quantity', payload: state.quantity + 1 });
        }
    };

    const handleNavigateToDetail = () => {
        if (isViewProduct) {
            setIsOpen(false);
        }
        const path = `/san-pham-chi-tiet/${item.id}`;
        navigate(path);
    };

    useEffect(() => {
        isHomePage
            ? dispatch({ type: 'isShowGrid', payload: true })
            : dispatch({
                  type: 'isShowGrid',
                  payload: ourShopStore?.isShowGrid,
              });
    }, [isHomePage, ourShopStore?.isShowGrid]);
    useEffect(() => {
        if (state.colorChoose && state.sizeChoose) {
            let productDetail = item?.productDetails?.filter(
                pd =>
                    pd.size.name === state.sizeChoose &&
                    pd.color.hex === state.colorChoose.hex
            )[0];
            getProductDetail(productDetail.id)
                .then(resp => {
                    dispatch({
                        type: 'productDetail',
                        payload: resp.data.data,
                    });
                    if (userId) handleGetListProductsCart(userId);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [state.colorChoose, state.sizeChoose]);

    useEffect(() => {
        if (slideItem)
            dispatch({
                type: 'isShowGrid',
                payload: true,
            });
    }, [slideItem]);

    useEffect(() => {
        if (userId) {
            apiIsWishList();
            apiIsCompare();
        }
    }, [userId]);

    const apiIsWishList = () => {
        dispatch({ type: 'isLoadingWList', payload: true });
        getWListByProductAndUser({ product: item })
            .then(res => {
                dispatch({ type: 'isWishList', payload: res.data });
                dispatch({ type: 'isLoadingWList', payload: false });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'isLoadingWList', payload: false });
            });
    };

    const apiIsCompare = () => {
        dispatch({ type: 'isLoadingCompare', payload: true });
        getCompareByProduct({ product: item })
            .then(res => {
                dispatch({ type: 'isCompare', payload: res.data });
                dispatch({ type: 'isLoadingCompare', payload: false });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'isLoadingCompare', payload: false });
            });
    };

    return (
        <div
            className={cls(styles.container, {
                [styles.containerItem]: !state.isShowGrid && !isViewProduct,
                [styles.containerViewItem]: isViewProduct,
                [styles.containerRelatedProducts]: isRelatedProducts,
            })}
            style={{
                flexDirection: isViewProduct ? 'column' : '',
            }}
        >
            <div
                className={cls(styles.boxImg, {
                    [styles.largImg]: !state.isShowGrid && !isViewProduct,
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
                        showSizeChoose={state.showSizeChoose}
                        isViewProduct={isViewProduct}
                        handleSetShowSizeChoose={handleSetShowSizeChoose}
                        handleChooseSize={handleChooseSize}
                        sizes={sizes}
                        sizeChoose={state.sizeChoose}
                        disabledSizes={
                            state.colorChoose
                                ? sizes.filter(
                                      size => !validSizesByColor.includes(size)
                                  )
                                : []
                        }
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
                            {state.isLoadingCart ? <LoadMore /> : <BsBag />}
                        </div>
                        <div
                            className={styles.boxIcon}
                            onClick={() => handleAddToWishList()}
                        >
                            {state.isLoadingWList ? (
                                <LoadMore />
                            ) : state.isWishList.status === 1 ? (
                                <BsHeartFill />
                            ) : (
                                <BsHeart />
                            )}
                        </div>
                        <div
                            className={styles.boxIcon}
                            onClick={() => handleAddToCompare()}
                        >
                            {state.isLoadingCompare ? (
                                <LoadMore />
                            ) : (
                                <TfiReload />
                            )}
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
                    [styles.content]: !state.isShowGrid && !isViewProduct,
                })}
                style={{ marginTop: '10px' }}
            >
                {!isHomePage && !isViewProduct && (
                    <Color
                        colors={colors}
                        colorChoose={state.colorChoose}
                        handleChooseColor={handleChooseColor}
                        disabledColors={
                            state.sizeChoose
                                ? colors.filter(
                                      color =>
                                          !validColorsBySize.find(
                                              c => c.hex === color.hex
                                          )
                                  )
                                : []
                        }
                    />
                )}

                {(!isHomePage && state.showSizeChoose && !isViewProduct) ||
                (state.colorChoose != '' && !isViewProduct && !isHomePage) ? (
                    <div
                        className={styles.btnClear}
                        onClick={() => handleClear()}
                    >
                        chọn lại
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
                    {state.productDetail ? (
                        <span>{formatPrice(state.productDetail.price)}</span>
                    ) : (
                        getPriceRange(item?.productDetails)
                    )}
                </div>

                {isViewProduct && (
                    <>
                        <div className={styles.des}>{item.description}</div>

                        <div className={styles.labelSize}>
                            Size {state.sizeChoose}
                        </div>
                        <Size
                            isViewProduct={isViewProduct}
                            handleChooseSize={handleChooseSize}
                            sizes={sizes}
                            sizeChoose={state.sizeChoose}
                            disabledSizes={
                                state.colorChoose
                                    ? sizes.filter(
                                          size =>
                                              !validSizesByColor.includes(size)
                                      )
                                    : []
                            }
                        />

                        <div className={styles.labelColor}>
                            Màu sắc {state.colorChoose.name}
                        </div>
                        <Color
                            colors={colors}
                            colorChoose={state.colorChoose}
                            handleChooseColor={handleChooseColor}
                            isViewProduct={isViewProduct}
                            disabledColors={
                                state.sizeChoose
                                    ? colors.filter(
                                          color =>
                                              !validColorsBySize.find(
                                                  c => c.hex === color.hex
                                              )
                                      )
                                    : []
                            }
                        />

                        {(!isHomePage && isViewProduct && state.sizeChoose) ||
                        (state.colorChoose != '' &&
                            isViewProduct &&
                            !isHomePage) ? (
                            <div
                                className={styles.btnClear}
                                onClick={() => handleClear()}
                                style={{ textAlign: 'left' }}
                            >
                                chọn lại
                            </div>
                        ) : (
                            ''
                        )}

                        <div className={styles.boxAddToCart}>
                            <QuantitySelector
                                item={item}
                                quantity={state.quantity}
                                increment={handleIncrement}
                                decrement={handleDecrement}
                                productDetail={state.productDetail}
                                productDetailCart={productDetailCart}
                            />
                            <Button
                                content={
                                    <>
                                        <BsCart3 /> Thêm vào giỏ
                                    </>
                                }
                                disabled={
                                    +state.productDetail?.amount -
                                        +productDetailCart?.quantity ===
                                    0
                                }
                                onClick={handleAddToCart}
                            />
                        </div>

                        {state.productDetail && (
                            <div className={styles.labelQty}>
                                Số lượng trong kho:{' '}
                                {state.productDetail.amount -
                                    state.productDetail.stockReserved}
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
                            onClick={() => handleBuyNow()}
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
