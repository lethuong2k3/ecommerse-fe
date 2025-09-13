import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import PaymentMethods from '@components/PaymentMethods/PaymentMethods';
import AccordionMenu from '@components/AccordionMenu';
import InformationProduct from '@pages/DetailProduct/components/informartion';
import ReviewProduct from '@pages/DetailProduct/components/Review';
import MyFooter from '@components/Footer/Footer';
import SliderCommon from '@components/SliderCommon/SliderCommon';
import ReactImageMagnifier from 'simple-image-magnifier/react';
import Size from '@components/ProductItem/Size/Size';
import Color from '@components/ProductItem/Color/Color';
import _ from 'lodash';
import QuantitySelector from '@components/QuantitySelector/QuantitySelector';
import Cookies from 'js-cookie';

import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { TfiReload } from 'react-icons/tfi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import {
    getRelatedProducts,
    getProduct,
    getProductDetail,
} from '@apis/productsService';
import { addProductToCart } from '@apis/cartService';

import { useParams } from 'react-router-dom';
import { SidebarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';
import { BsCart3 } from 'react-icons/bs';
import LoadMore from '@components/Loading/LoadMore';
import { getPriceRange, formatPrice } from '@hooks/useFomatPrice';
import {
    createCompare,
    deleteCompare,
    getCompareByProduct,
} from '@apis/compareService';
import {
    deleteWishList,
    createWishList,
    getWListByProductAndUser,
} from '@apis/wishlistService';
import { getReviews, getReview } from '@apis/reviewService';
import userImg from '@images/user.jpg';
import { StoreContext } from '@contexts/StoreProvider';

function DetailProduct() {
    const {
        handleGetListProductsCart,
        listProductCart,
        setIsOpen,
        setType,
        handleGetListCompare,
        handleGetListWishList,
    } = useContext(SidebarContext);
    const { toast } = useContext(ToastContext);
    const { userId } = useContext(StoreContext);

    const initialState = {
        menuSelected: 1,
        relatedProduct: [],
        sizeSelected: '',
        colorSelected: '',
        data: {},
        dataDetail: null,
        isLoadingDetail: false,
        isLoadingProducts: false,
        quantity: 1,
        isLoadingCart: false,
        isLoadingCompare: false,
        isLoadingWList: false,
        isWishList: {},
        isCompare: {},
        reviews: [],
        isLoadingReviews: false,
        isReview: {},
    };

    function reducer(state, action) {
        return { ...state, [action.type]: action.payload };
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const param = useParams();

    const productDetailCart = listProductCart?.filter(
        lst => lst.productDetail.id === state.dataDetail?.id
    )[0];

    const sizes = useMemo(() => {
        const sizeSet = _.uniq(_.map(state.data?.productDetails, 'size.name'));
        return sizeSet;
    }, [state.data]);

    const colors = useMemo(() => {
        const colorSet = _.uniqBy(
            state.data?.productDetails?.map(({ color }) => ({
                hex: color.hex,
                name: color.name,
            })),
            'hex'
        );
        return colorSet;
    }, [state.data]);

    const validSizesByColor = useMemo(() => {
        if (!state.colorSelected) return sizes;
        return _.uniq(
            state.data?.productDetails
                ?.filter(pd => pd.color.hex === state.colorSelected.hex)
                .map(pd => pd.size.name)
        );
    }, [state.colorSelected, state.data]);

    const validColorsBySize = useMemo(() => {
        if (!state.sizeSelected) return colors;
        return _.uniqBy(
            state.data?.productDetails
                ?.filter(pd => pd.size.name === state.sizeSelected)
                .map(pd => ({
                    hex: pd.color.hex,
                    name: pd.color.name,
                })),
            'hex'
        );
    }, [state.sizeSelected, state.data]);

    const handleSelectedColor = color => {
        dispatch({ type: 'colorSelected', payload: color });
    };
    const handleSelectedSize = size => {
        dispatch({ type: 'sizeSelected', payload: size });
    };
    const handleClear = () => {
        dispatch({ type: 'sizeSelected', payload: '' });
        dispatch({ type: 'colorSelected', payload: '' });
        dispatch({ type: 'quantity', payload: 1 });
        dispatch({ type: 'dataDetail', payload: null });
    };

    const handleAddToCart = () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập');
            return;
        }
        if (!state.sizeSelected) {
            toast.warning('Vui lòng chọn size');
            return;
        }
        if (!state.colorSelected) {
            toast.warning('Vui lòng chọn màu sắc');
            return;
        }

        const query = {
            orderItems: [
                {
                    productDetail: state.dataDetail,
                    quantity: state.quantity,
                },
            ],
        };
        dispatch({ type: 'isLoadingCart', payload: true });
        addProductToCart(query)
            .then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                    toast.error(res.data.errors['400']);
                    handleGetListProductsCart(userId);
                    dispatch({ type: 'isLoadingCart', payload: false });
                    return;
                }
                setIsOpen(true);
                setType('cart');
                toast.success('Thêm vào giỏ thành công');
                dispatch({ type: 'isLoadingCart', payload: false });
                handleGetListProductsCart(userId);
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'isLoadingCart', payload: false });
            });
    };

    const handleAddToCompare = () => {
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
                    handleGetListCompare(userId);
                    apiIsCompare();
                    dispatch({ type: 'isLoadingCompare', payload: false });
                })
                .catch(err => {
                    dispatch({ type: 'isLoadingCompare', payload: false });
                    console.log(err);
                });
        } else {
            createCompare({ product: state.data })
                .then(res => {
                    setIsOpen(true);
                    setType('compare');
                    toast.success('Thêm sản phẩm vào mục so sánh');
                    dispatch({ type: 'isLoadingCompare', payload: false });
                    handleGetListCompare(userId);
                    apiIsCompare();
                })
                .catch(err => {
                    dispatch({ type: 'isLoadingCompare', payload: false });
                    console.log(err);
                });
        }
    };

    const handleAddToWishList = async () => {
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
                    handleGetListWishList(userId);
                    apiIsWishList();
                    dispatch({ type: 'isLoadingWList', payload: false });
                })
                .catch(err => {
                    console.log(err);
                    dispatch({ type: 'isLoadingWList', payload: false });
                });
        } else {
            const query = {
                product: { id: state.data.id },
            };

            createWishList(query)
                .then(res => {
                    setIsOpen(true);
                    setType('wishlist');
                    toast.success('Thêm sản phẩm vào mục yêu thích');
                    dispatch({ type: 'isLoadingWList', payload: false });
                    handleGetListWishList(userId);
                    apiIsWishList();
                })
                .catch(err => {
                    dispatch({ type: 'isLoadingWList', payload: false });
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        if (param.id) {
            dispatch({ type: 'isLoadingDetail', payload: true });
            getProduct(param.id)
                .then(res => {
                    dispatch({ type: 'data', payload: res.data.data });
                    dispatch({ type: 'isLoadingDetail', payload: false });
                })
                .catch(err => {
                    console.log(err);
                    dispatch({ type: 'isLoadingDetail', payload: false });
                });
        }
    }, [param]);
    useEffect(() => {
        if (Object.keys(state.data).length !== 0) {
            const query = {
                category: state.data?.category,
                limit: 10,
                productId: state.data?.id,
            };
            apiGetReviews();
            dispatch({ type: 'dataDetail', payload: null });
            dispatch({ type: 'isReview', payload: '' });
            getRelatedProducts(query)
                .then(res => {
                    dispatch({
                        type: 'relatedProduct',
                        payload: res.data.data,
                    });
                    dispatch({ type: 'isLoadingProducts', payload: false });
                })
                .catch(err => {
                    dispatch({ type: 'isLoadingProducts', payload: false });
                    console.log(err);
                });
            if (userId) {
                apiIsWishList();
                apiIsCompare();
                apiGetReview();
            }
        }
    }, [state.data, userId]);

    useEffect(() => {
        if (state.colorSelected && state.sizeSelected) {
            let productDetail = state.data?.productDetails?.filter(
                pd =>
                    pd.size.name === state.sizeSelected &&
                    pd.color.hex === state.colorSelected.hex
            )[0];
            getProductDetail(productDetail.id)
                .then(resp => {
                    dispatch({ type: 'dataDetail', payload: resp.data.data });
                    if (userId) handleGetListProductsCart(userId);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [state.sizeSelected, state.colorSelected]);

    const apiIsWishList = () => {
        dispatch({ type: 'isLoadingWList', payload: true });
        getWListByProductAndUser({ product: state.data })
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
        getCompareByProduct({ product: state.data })
            .then(res => {
                dispatch({ type: 'isCompare', payload: res.data });
                dispatch({ type: 'isLoadingCompare', payload: false });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'isLoadingCompare', payload: false });
            });
    };

    const apiGetReviews = () => {
        dispatch({ type: 'isLoadingReviews', payload: true });
        getReviews(state.data.id)
            .then(res => {
                dispatch({ type: 'reviews', payload: res.data });
                dispatch({ type: 'isLoadingReviews', payload: false });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'isLoadingReviews', payload: false });
            });
    };

    const apiGetReview = () => {
        dispatch({ type: 'isLoadingReviews', payload: true });
        getReview(state.data.id)
            .then(res => {
                dispatch({ type: 'isReview', payload: res.data });
                dispatch({ type: 'isLoadingReviews', payload: false });
            })
            .catch(err => {
                dispatch({ type: 'isLoadingReviews', payload: false });
            });
    };

    const dataAccordionMenu = [
        {
            id: 1,
            titleMenu: 'Thông tin chi tiết',
            content: <InformationProduct />,
        },
        {
            id: 2,
            titleMenu: `Đánh giá (${state.reviews.length})`,
            content: (
                <div>
                    <ReviewProduct
                        toast={toast}
                        userId={userId}
                        setIsOpen={setIsOpen}
                        setType={setType}
                        data={state.data}
                        apiGetReviews={apiGetReviews}
                        apiGetReview={apiGetReview}
                        reviews={state.reviews}
                        userImg={userImg}
                        isLoadingReviews={state.isLoadingReviews}
                        isReview={state.isReview}
                    />
                </div>
            ),
        },
    ];
    const handleSetMenuSelected = id => {
        if (state.menuSelected === id) {
            dispatch({ type: 'menuSelected', payload: 0 });
            return;
        }
        dispatch({ type: 'menuSelected', payload: id });
    };
    const handleDecrement = () => {
        if (state.quantity <= 1) {
            return;
        }
        dispatch({ type: 'quantity', payload: state.quantity - 1 });
    };

    const handleIncrement = () => {
        if (!state.sizeSelected) {
            toast.warning('Vui lòng chọn size');
            return;
        }
        if (!state.colorSelected) {
            toast.warning('Vui lòng chọn màu sắc');
            return;
        }
        if (
            state.quantity < state.dataDetail?.amount &&
            (!productDetailCart ||
                state.quantity <
                    +state.dataDetail?.amount - +productDetailCart?.quantity)
        ) {
            dispatch({ type: 'quantity', payload: state.quantity + 1 });
        }
    };
    return (
        <div>
            <Header />
            <MainLayout />
            {!state.isLoadingDetail ? (
                <div className={styles.container}>
                    <MainLayout>
                        <div className={styles.navigateSection}>
                            <div className={styles.breadcrumb}>
                                Trang chủ &gt;{' '}
                                <span style={{ color: '#000' }}>
                                    {state.data.category &&
                                        state.data.category.name}
                                </span>
                            </div>
                            <div
                                className={styles.previousPage}
                                style={{ cursor: 'pointer' }}
                            >
                                {' '}
                                &lt; Quay lại trang trước đó
                            </div>
                        </div>
                        <div className={styles.contentSection}>
                            <div className={styles.imageBox}>
                                {state.data.images?.map(image => {
                                    return (
                                        <ReactImageMagnifier
                                            key={image.id}
                                            width={295}
                                            height={350}
                                            srcPreview={image.url}
                                            srcOriginal={image.url}
                                        />
                                    );
                                })}
                            </div>
                            <div className={styles.sliderCommon}>
                                {state.data.images && (
                                    <SliderCommon data={state.data.images} />
                                )}
                            </div>
                            <div className={styles.infoBox}>
                                <h1>{state.data.name}</h1>
                                <p className={styles.price}>
                                    {state.dataDetail
                                        ? formatPrice(state.dataDetail.price)
                                        : getPriceRange(
                                              state.data.productDetails
                                          )}
                                </p>
                                <p className={styles.des}>
                                    {state.data.description}
                                </p>
                                <p>Size {state.sizeSelected}</p>
                                <Size
                                    isViewProduct={true}
                                    handleChooseSize={handleSelectedSize}
                                    sizes={sizes}
                                    sizeChoose={state.sizeSelected}
                                    disabledSizes={
                                        state.colorSelected
                                            ? sizes.filter(
                                                  size =>
                                                      !validSizesByColor.includes(
                                                          size
                                                      )
                                              )
                                            : []
                                    }
                                />
                                <p>Màu sắc {state.colorSelected.name}</p>
                                <Color
                                    colors={colors}
                                    colorChoose={state.colorSelected}
                                    style={{ justifyContent: 'flex-start' }}
                                    handleChooseColor={handleSelectedColor}
                                    disabledColors={
                                        state.sizeSelected
                                            ? colors.filter(
                                                  color =>
                                                      !validColorsBySize.find(
                                                          c =>
                                                              c.hex ===
                                                              color.hex
                                                      )
                                              )
                                            : []
                                    }
                                />
                                {state.sizeSelected || state.colorSelected ? (
                                    <div
                                        className={styles.btnClear}
                                        onClick={() => handleClear()}
                                    >
                                        chọn lại
                                    </div>
                                ) : (
                                    ''
                                )}
                                <div className={styles.functionInfo}>
                                    <div>
                                        <QuantitySelector
                                            item={state.data}
                                            quantity={state.quantity}
                                            increment={handleIncrement}
                                            decrement={handleDecrement}
                                            productDetail={state.dataDetail}
                                            productDetailCart={
                                                productDetailCart
                                            }
                                        />
                                    </div>
                                    <div className={styles.boxBtn}>
                                        <Button
                                            content={
                                                <>
                                                    {state.isLoadingCart && (
                                                        <LoadMore />
                                                    )}
                                                    <BsCart3 />{' '}
                                                    <div>Thêm vào giỏ</div>
                                                </>
                                            }
                                            disabled={
                                                !state.sizeSelected ||
                                                !state.colorSelected ||
                                                +state.dataDetail?.amount -
                                                    +productDetailCart?.quantity ===
                                                    0 ||
                                                state.isLoadingCart
                                            }
                                            onClick={() => handleAddToCart()}
                                        />
                                    </div>
                                </div>
                                {state.dataDetail && (
                                    <div className={styles.labelQty}>
                                        Số lượng tồn kho:{' '}
                                        {state.dataDetail.amount}
                                    </div>
                                )}
                                <div className={styles.boxOr}>
                                    <div className={styles.line} />
                                    <div>OR</div>
                                    <div className={styles.line} />
                                </div>
                                <div>
                                    <Button
                                        content={
                                            <>
                                                <BsCart3 /> <div>Mua ngay</div>
                                            </>
                                        }
                                        disabled={
                                            !state.sizeSelected ||
                                            !state.colorSelected ||
                                            +state.dataDetail?.amount -
                                                +productDetailCart?.quantity ===
                                                0
                                        }
                                    />
                                </div>
                                <div className={styles.addFunction}>
                                    <div onClick={() => handleAddToWishList()}>
                                        {state.isLoadingWList ? (
                                            <LoadMore />
                                        ) : state.isWishList.status === 1 ? (
                                            <BsHeartFill />
                                        ) : (
                                            <BsHeart />
                                        )}
                                    </div>
                                    <div onClick={() => handleAddToCompare()}>
                                        {state.isLoadingCompare ? (
                                            <LoadMore />
                                        ) : (
                                            <TfiReload />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <PaymentMethods />
                                </div>
                                <div className={styles.info}>
                                    <div>
                                        Thương hiệu:{' '}
                                        <span>{state.data.brand?.name}</span>
                                    </div>
                                    <div>
                                        SKU: <span>{state.data.sku}</span>
                                    </div>
                                    <div>
                                        Thể loại:
                                        <span>
                                            {' '}
                                            {state.data.category?.name}
                                        </span>
                                    </div>
                                </div>
                                {dataAccordionMenu.map((item, index) => {
                                    return (
                                        <AccordionMenu
                                            key={index}
                                            titleMenu={item.titleMenu}
                                            contentJsx={item.content}
                                            onClick={() =>
                                                handleSetMenuSelected(item.id)
                                            }
                                            isSelected={
                                                state.menuSelected === item.id
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.containerRelatedProduct}>
                            <h2 className={styles.lableRelatedProduct}>
                                Sản phẩm tương tự
                            </h2>
                            {!state.isLoadingProducts ? (
                                state.relatedProduct.length > 0 ? (
                                    <SliderCommon
                                        data={state.relatedProduct}
                                        isProductItem
                                        showItem={4}
                                    />
                                ) : (
                                    <div className={styles.noRelatedProducts}>
                                        Không có sản phẩm tương tự nào.
                                    </div>
                                )
                            ) : (
                                <div>...Loading</div>
                            )}
                        </div>
                    </MainLayout>
                </div>
            ) : (
                <div>...Loading</div>
            )}
            <MyFooter />
        </div>
    );
}

export default DetailProduct;
