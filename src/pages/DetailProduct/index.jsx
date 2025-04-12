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

import { useContext, useEffect, useMemo, useState } from 'react';
import { TfiReload } from 'react-icons/tfi';
import { BsHeart } from 'react-icons/bs';
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
import getPriceRange from '@hooks/useFomatPrice';

function DetailProduct() {
    const { handleGetListProductsCart, listProductCart, setIsOpen, setType } =
        useContext(SidebarContext);
    const { toast } = useContext(ToastContext);

    const [menuSelected, setMenuSelected] = useState(1);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [sizeSelected, setSizeSelected] = useState('');
    const [colorSelected, setColorSelected] = useState('');
    const [data, setData] = useState([]);
    const [dataDetail, setDataDetail] = useState(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isLoadingCart, setIsLoadingCart] = useState(false);

    const productDetailCart = listProductCart.filter(
        lst => lst.productDetail.id === dataDetail?.id
    )[0];
    const userId = Cookies.get('id');
    const sizes = useMemo(() => {
        const sizeSet = _.uniq(_.map(data?.productDetails, 'size.name'));
        return sizeSet;
    }, [data]);
    const colors = useMemo(() => {
        const colorSet = _.uniqBy(
            data?.productDetails?.map(({ color }) => ({
                hex: color.hex,
                name: color.name,
            })),
            'hex'
        );
        return colorSet;
    }, [data]);
    const param = useParams();
    const handleSelectedColor = color => {
        setColorSelected(color);
    };
    const handleSelectedSize = size => {
        setSizeSelected(size);
    };
    const handleClear = () => {
        setSizeSelected('');
        setColorSelected('');
        setQuantity(1);
        setDataDetail(null);
    };

    const handleAddToCart = () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Please login to add product to cart');
            return;
        }
        if (!sizeSelected) {
            toast.warning('Please choose size!');
            return;
        }
        if (!colorSelected) {
            toast.warning('Please choose color!');
            return;
        }

        const query = {
            orderItems: [
                {
                    productDetail: dataDetail,
                    quantity: quantity,
                },
            ],
        };
        setIsLoadingCart(true);
        addProductToCart(query)
            .then(res => {
                if (res.data.errors) {
                    toast.error(res.data.errors['400']);
                    handleGetListProductsCart(userId);
                    setIsLoadingCart(false);
                    return;
                }
                setIsOpen(true);
                setType('cart');
                toast.success('Add product to cart successfully!');
                setIsLoadingCart(false);
                handleGetListProductsCart(userId);
            })
            .catch(err => {
                console.log(err);
                setIsLoadingCart(false);
            });
    };

    useEffect(() => {
        if (param.id) {
            setIsLoadingDetail(true);
            getProduct(param.id)
                .then(res => {
                    setData(res.data.data);
                    setIsLoadingDetail(false);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoadingDetail(false);
                });
        }
    }, [param]);
    useEffect(() => {
        const query = {
            category: data?.category,
            limit: 10,
            productId: data?.id,
        };
        setIsLoadingProducts(true);
        getRelatedProducts(query)
            .then(res => {
                setRelatedProduct(res.data.data);
                setIsLoadingProducts(false);
            })
            .catch(err => {
                setIsLoadingProducts(false);

                console.log(err);
            });
    }, [data]);

    useEffect(() => {
        if (colorSelected && sizeSelected) {
            let productDetail = data?.productDetails?.filter(
                pd =>
                    pd.size.name === sizeSelected &&
                    pd.color.hex === colorSelected.hex
            )[0];
            getProductDetail(productDetail.id)
                .then(resp => {
                    setDataDetail(resp.data.data);
                    if (userId) handleGetListProductsCart(userId);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [sizeSelected, colorSelected]);

    const dataAccordionMenu = [
        {
            id: 1,
            titleMenu: 'ADDITIONAL INFORMATION',
            content: <InformationProduct />,
        },
        {
            id: 2,
            titleMenu: 'REVIEW (0)',
            content: (
                <div>
                    {' '}
                    <ReviewProduct />{' '}
                </div>
            ),
        },
    ];
    const handleSetMenuSelected = id => {
        if (menuSelected === id) {
            setMenuSelected(0);
            return;
        }
        setMenuSelected(id);
    };
    const handleDecrement = () => {
        if (quantity <= 1) {
            return;
        }
        setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        if (!sizeSelected) {
            toast.warning('Please choose size!');
            return;
        }
        if (!colorSelected) {
            toast.warning('Please choose color!');
            return;
        }
        if (
            quantity < dataDetail?.amount &&
            (!productDetailCart ||
                quantity < +dataDetail?.amount - +productDetailCart?.quantity)
        ) {
            setQuantity(quantity + 1);
        }
    };
    return (
        <div>
            <Header />
            <MainLayout />
            {!isLoadingDetail ? (
                <div className={styles.container}>
                    <MainLayout>
                        <div className={styles.navigateSection}>
                            <div className={styles.breadcrumb}>
                                Home &gt;{' '}
                                <span style={{ color: '#000' }}>Men</span>
                            </div>
                            <div
                                className={styles.previousPage}
                                style={{ cursor: 'pointer' }}
                            >
                                {' '}
                                &lt; Return to previous page
                            </div>
                        </div>
                        <div className={styles.contentSection}>
                            <div className={styles.imageBox}>
                                {data.images?.map(image => {
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
                                {data.images && (
                                    <SliderCommon data={data.images} />
                                )}
                            </div>
                            <div className={styles.infoBox}>
                                <h1>{data.name}</h1>
                                <p className={styles.price}>
                                    {dataDetail
                                        ? dataDetail.price
                                        : getPriceRange(data.productDetails)}
                                </p>
                                <p className={styles.des}>{data.description}</p>
                                <p>Size {sizeSelected}</p>
                                <Size
                                    isViewProduct={true}
                                    handleChooseSize={handleSelectedSize}
                                    sizes={sizes}
                                    sizeChoose={sizeSelected}
                                />
                                <p>Color {colorSelected.name}</p>
                                <Color
                                    colors={colors}
                                    colorChoose={colorSelected}
                                    style={{ justifyContent: 'flex-start' }}
                                    handleChooseColor={handleSelectedColor}
                                />
                                {sizeSelected || colorSelected ? (
                                    <div
                                        className={styles.btnClear}
                                        onClick={() => handleClear()}
                                    >
                                        Clear
                                    </div>
                                ) : (
                                    ''
                                )}
                                <div className={styles.functionInfo}>
                                    <div>
                                        <QuantitySelector
                                            item={data}
                                            quantity={quantity}
                                            increment={handleIncrement}
                                            decrement={handleDecrement}
                                            productDetail={dataDetail}
                                            productDetailCart={
                                                productDetailCart
                                            }
                                        />
                                    </div>
                                    <div className={styles.boxBtn}>
                                        <Button
                                            content={
                                                <>
                                                    {isLoadingCart && (
                                                        <LoadMore />
                                                    )}
                                                    <BsCart3 />{' '}
                                                    <div>ADD TO CART</div>
                                                </>
                                            }
                                            disabled={
                                                !sizeSelected ||
                                                !colorSelected ||
                                                +dataDetail?.amount -
                                                    +productDetailCart?.quantity ===
                                                    0 ||
                                                isLoadingCart
                                            }
                                            onClick={() => handleAddToCart()}
                                        />
                                    </div>
                                </div>
                                {dataDetail && (
                                    <div className={styles.labelQty}>
                                        Current quantity: {dataDetail.amount}
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
                                                <BsCart3 /> <div>BUY NOW</div>
                                            </>
                                        }
                                        disabled={
                                            !sizeSelected ||
                                            !colorSelected ||
                                            +dataDetail?.amount -
                                                +productDetailCart?.quantity ===
                                                0
                                        }
                                    />
                                </div>
                                <div className={styles.addFunction}>
                                    <div>
                                        <BsHeart />
                                    </div>
                                    <div>
                                        <TfiReload />
                                    </div>
                                </div>
                                <div>
                                    <PaymentMethods />
                                </div>
                                <div className={styles.info}>
                                    <div>
                                        Brand: <span>{data.brand?.name}</span>
                                    </div>
                                    <div>
                                        SKU: <span>{data.sku}</span>
                                    </div>
                                    <div>
                                        Category:
                                        <span> {data.category?.name}</span>
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
                                                menuSelected === item.id
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.containerRelatedProduct}>
                            <h2 className={styles.lableRelatedProduct}>
                                Related Products
                            </h2>
                            {!isLoadingProducts ? (
                                relatedProduct.length > 0 ? (
                                    <SliderCommon
                                        data={relatedProduct}
                                        isProductItem
                                        showItem={4}
                                    />
                                ) : (
                                    <div className={styles.noRelatedProducts}>
                                        No Related Products
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
