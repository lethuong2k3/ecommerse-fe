import * as Yup from 'yup';
import 'react-select-search/style.css';
import './style.css';
import Header from '@components/Header/Header';
import styles from './styles.module.scss';
import MainLayout from '@components/Layout/Layout';
import MyFooter from '@components/Footer/Footer';
import Contents from '@pages/CheckOut/components/Contents';
import Steps from '@components/Steps/Steps';
import useScript from 'react-script-hook';

import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { updateItem } from '@apis/cartService';
import { SidebarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';
import Cookies from 'js-cookie';
import { deleteItem } from '@apis/cartService';
import { useNavigate } from 'react-router-dom';
import { getAllPaymentTypes } from '@apis/paymentTypeService';
import { saveOrder } from '@apis/orderService';
import { getProvince, getDistrict, getWard, getFee } from '@apis/GHNService';
import { StoreContext } from '@contexts/StoreProvider';
import { cancelOrder } from '@apis/payOSService';

function CheckOut() {
    const { listProductCart, handleGetListProductsCart } =
        useContext(SidebarContext);
    const { toast } = useContext(ToastContext);
    const { userInfo } = useContext(StoreContext);
    const [listMethods, setListMethods] = useState([]);
    const [payment, setPayment] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [isLoadingMethods, setIsLoadingMethods] = useState(false);
    const [province, setProvince] = useState([]);
    const [provinceName, setProvinceName] = useState('');
    const [district, setDistrict] = useState([]);
    const [districName, setDistrictName] = useState('');
    const [ward, setWard] = useState([]);
    const [wardName, setWardName] = useState('');
    const [fee, setFee] = useState(0);

    const phoneRegExp = /^(0[3|5|7|8|9][0-9]{8}|(\+84)[3|5|7|8|9][0-9]{8})$/;
    const userId = Cookies.get('id');
    const navigate = useNavigate();
    const subTotal = listProductCart?.reduce((acc, item) => {
        return acc + item.totalPrice;
    }, 0);
    const [loading, error] = useScript({
        src: import.meta.env.VITE_PAYOS_SCRIPT,
        checkForExisting: true,
    });
    const RETURN_URL = `${window.location.href}/ket-qua`;

    const errSelect = idSelect => {
        switch (idSelect) {
            case 'provinceID':
                return formik.touched.provinceID && formik.errors.provinceID;
            case 'districtID':
                return formik.touched.districtID && formik.errors.districtID;
            case 'wardID':
                return formik.touched.wardID && formik.errors.wardID;
        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            provinceID: '',
            provinceName: '',
            districtID: '',
            districtName: '',
            wardID: '',
            wardName:'',
            streetAddress: '',
            phone: '',
            email: '',
            orderComment: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            streetAddress: Yup.string().required(),
            provinceID: Yup.string().required(),
            districtID: Yup.string().required(),
            wardID: Yup.string().required(),
            phone: Yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ").required(),
            email: Yup.string().email().required(),
        }),
        onSubmit: async values => {
            if (loadingSubmit) return;
            const {
                firstName,
                lastName,
                streetAddress,
                provinceID,
                districtID,
                wardID,
                phone,
                email,
                orderComment,
            } = values;
            let body = {
                shipmentRequest: {
                    firstName: firstName,
                    lastName: lastName,
                    address: `${streetAddress}, ${wardName}, ${districName}, ${provinceName}`,
                    idAddress: `${provinceID}, ${districtID}, ${wardID}`,
                    phone: phone,
                    email: email,
                    notes: orderComment,
                },
                paymentTypeId: payment,
                shippingFee: fee,
            };
            setLoadingSubmit(true);
            saveOrder(body)
                .then(res => {
                    let order = res.data;
                    setLoadingSubmit(false);
                    if (payment === 1) {
                        navigate(`/thanh-toan/ket-qua?orderCode=${order.orderCode}`)
                    } else if (payment === 2) {
                        openPaymentDialog(order.data);
                    }
                })
                .catch(err => {
                    setLoadingSubmit(false);
                    console.log(err);
                });
        },
    });

    const handleCancelOrder = orderCode => {
        cancelOrder(orderCode)
            .then(res => {
                navigate(`/thanh-toan/ket-qua?orderCode=${orderCode}`)
            })
            .catch(err => {
                console.log(err);
            });
    };

    const openPaymentDialog = async function (checkoutResponse) {
        if (checkoutResponse) {
            let url = checkoutResponse.checkoutUrl;

            let { open } = window.PayOSCheckout.usePayOS({
                RETURN_URL: RETURN_URL,
                ELEMENT_ID: 'config_root',
                CHECKOUT_URL: url,
                embedded: false,
                onExit: async event => {
                    console.log(event);
                },
                onSuccess: async event => {
                    navigate(`/thanh-toan/ket-qua?orderCode=${event.orderCode}`)
                },
                onCancel: async event => {
                    handleCancelOrder(event.orderCode);
                },
            });
            open();
        }
    };

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

    const handleProvinceChange = provinceID => {
        const provinceName = province.find(p => p.ProvinceID === Number(provinceID)).ProvinceName;
        formik.setFieldValue('provinceID', provinceID);
        setProvinceName(provinceName);
        setDistrictName('');
        setWardName('');
        getDistrict(provinceID)
            .then(res => {
                setDistrict(res.data.data);
                setWard([]);
                setFee(0);
            })
            .catch(err => {
                console.log(err);
                setWard([]);
                setFee(0);
            });
    };

    const handleDistrictChange = districtID => {
        const districtName = district.find(d => d.DistrictID === Number(districtID)).DistrictName;
        formik.setFieldValue('districtID', districtID);
        setDistrictName(districtName);
        setWardName('');
        getWard(districtID)
            .then(res => {
                setWard(res.data.data);
                setFee(0);
            })
            .catch(err => {
                console.log(err);
                setFee(0);
            });
    };

    const handleWardChange = wardID => {
        const wardName = ward.find(w => w.WardCode == wardID).WardName;
        formik.setFieldValue('wardID', wardID);
        setWardName(wardName);
        let body = {
            service_type_id: 2,
            insurance_value: subTotal,
            from_district_id: 3695,
            to_district_id: formik.values.districtID,
            to_ward_code: String(wardID),
            height: 15,
            length: 15,
            weight: 1000,
            width: 15,
        };
        getFee(body)
            .then(res => {
                setFee(res.data.data.total);
            })
            .catch(err => {
                setFee(0);
                console.log(err);
            });
    };

    useEffect(() => {
         const timer = setTimeout(() => {
            if (listProductCart?.length === 0) {
                navigate('/gio-hang');
            }
        }, 1000);
       
        return () => clearTimeout(timer);
    }, [listProductCart]);

    useEffect(() => {
        if (userInfo) formik.setFieldValue('email', userInfo.email);
        setIsLoadingMethods(true);
        getAllPaymentTypes()
            .then(res => {
                setListMethods(res.data.data);
                setIsLoadingMethods(false);
            })
            .catch(err => {
                console.log(err);
            });
        getProvince()
            .then(res => {
                setProvince(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div
            id='config_root'
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            {listProductCart?.length == 0 || isLoadingMethods || !province ? (
                <div>...Loading</div>
            ) : (
                <div>
                    <Header />
                    <Steps className={styles.resPhoneTablet} step={2} />
                    <div className={styles.container}>
                        <MainLayout>
                            <Contents
                                payment={payment}
                                setPayment={setPayment}
                                listProductCart={listProductCart}
                                formik={formik}
                                getData={handleQuantityChange}
                                deleteItem={handleDeleteItemCart}
                                isLoadingCart={isLoading}
                                listMethods={listMethods}
                                province={province}
                                district={district}
                                ward={ward}
                                handleProvinceChange={handleProvinceChange}
                                handleDistrictChange={handleDistrictChange}
                                handleWardChange={handleWardChange}
                                subTotal={subTotal}
                                fee={fee}
                                errSelect={errSelect}
                            />
                        </MainLayout>
                    </div>
                    <MyFooter />
                </div>
            )}
        </div>
    );
}

export default CheckOut;
