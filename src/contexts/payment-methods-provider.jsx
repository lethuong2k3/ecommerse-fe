import { createContext, useEffect, useState } from 'react';
import { getAllPaymentTypes } from '@/apis/payment-type-service';

export const PaymentMethodsContext = createContext();

export const PaymentMethodsProvider = ({ children }) => {
    const [listMethod, setListMethod] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        getAllPaymentTypes()
            .then(res => {
                setListMethod(res.data.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);
    const values = {
        listMethod,
        isLoading,
    };
    return (
        <PaymentMethodsContext.Provider value={values}>
            {children}
        </PaymentMethodsContext.Provider>
    );
};
