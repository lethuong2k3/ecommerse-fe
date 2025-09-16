import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getInfo } from '@/apis/auth-service';
import { ToastContext } from '@/contexts/toast-provider';
import { logOut } from '@/apis/auth-service';
import { SidebarContext } from '@/contexts/sidebar-provider';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const { toast } = useContext(ToastContext);
    const {
        handleGetListProductsCart,
        handleGetListWishList,
        handleGetListCompare,
        setListWList,
        setListProductCart,
        setCompareList,
    } = useContext(SidebarContext);

    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(Cookies.get('id'));
    const [isVerify, setIsVerify] = useState(false);
    const handleLogout = async () => {
        await logOut().then(() => {
            Cookies.remove('token');
            Cookies.remove('refreshToken');
            Cookies.remove('id');
            setUserInfo(null);
            setUserId(null);
            setListWList([]);
            setListProductCart([]);
            setCompareList([]);
            toast.success('Log out successfully!');
        });
    };
    useEffect(() => {
        if (userId) {
            getInfo(userId)
                .then(res => {
                    setUserInfo(res.data.data);
                    handleGetListProductsCart(userId);
                    handleGetListWishList(userId);
                    handleGetListCompare(userId);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [userId]);

    return (
        <StoreContext.Provider
            value={{
                userInfo,
                handleLogout,
                setUserId,
                isVerify,
                setIsVerify,
                userId,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
