import * as Yup from 'yup';
import 'react-select-search/style.css';
import './style.css';
import Header from '@components/Header/Header';
import Steps from '@pages/Cart/components/steps/Steps';
import styles from './styles.module.scss';
import MainLayout from '@components/Layout/Layout';
import MyFooter from '@components/Footer/Footer';
import Contents from '@pages/CheckOut/components/Contents';

import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { dataCountry } from '@pages/CheckOut/constants';
import { updateItem } from '@apis/cartService';
import { SidebarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';
import Cookies from 'js-cookie';
import { deleteItem } from '@apis/cartService';
import { useNavigate } from 'react-router-dom';
import { getAllPaymentTypes } from '@apis/paymentTypeService';

function CheckOut() {
    const { listProductCart, handleGetListProductsCart } =
        useContext(SidebarContext);
    const { toast } = useContext(ToastContext);

    const [listMethods, setListMethods] = useState([]);
    const [payment, setPayment] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMethods, setIsLoadingMethods] = useState(false);
    const userId = Cookies.get('id');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            companyName: '',
            country: '',
            streetAddress: '',
            billingAddress: '',
            billingCity: '',
            phone: '',
            email: '',
            orderComment: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            country: Yup.string().required(),
            streetAddress: Yup.string().required(),
            billingCity: Yup.string().required(),
            phone: Yup.number().required(),
            email: Yup.string().email().required(),
        }),
    });

    const handleQuantityChange = (orderItemId, data) => {
        setIsLoading(true);
        updateItem(orderItemId, data)
            .then(resp => {
                if (resp.data.errors) {
                    toast.error(resp.data.errors['400']);
                    setIsLoading(false);
                    return;
                }
                handleGetListProductsCart(userId);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    };

    const handleDeleteItemCart = orderItemId => {
        setIsLoading(true);
        deleteItem(orderItemId)
            .then(resp => {
                if (listProductCart.legth === 1) {
                }
                handleGetListProductsCart(userId);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        if (listProductCart.length == 0) {
            navigate('/cart');
            return;
        }
    }, [listProductCart]);

    useEffect(() => {
        setIsLoadingMethods(true);
        getAllPaymentTypes()
            .then(res => {
                setListMethods(res.data.data);
                setIsLoadingMethods(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {(listProductCart.length == 0) | isLoadingMethods ? (
                <div>...Loading</div>
            ) : (
                <>
                    <Header />
                    <div className={styles.container}>
                        <Steps step={2} />
                        <MainLayout>
                            <div className={styles.info}>
                                Have a coupon? <span>Click here to enter</span>
                            </div>
                            <Contents
                                payment={payment}
                                setPayment={setPayment}
                                listProductCart={listProductCart}
                                formik={formik}
                                dataCountry={dataCountry}
                                getData={handleQuantityChange}
                                deleteItem={handleDeleteItemCart}
                                isLoadingCart={isLoading}
                                listMethods={listMethods}
                            />
                        </MainLayout>
                        <MyFooter />
                    </div>
                </>
            )}
        </>
    );
}

export default CheckOut;
