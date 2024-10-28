import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getInfo } from '@apis/authService';
import { ToastContext } from '@contexts/ToastProvider';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const { toast } = useContext(ToastContext);

    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(Cookies.get('userId'));
    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        Cookies.remove('userId');
        setUserInfo(null);
        setUserId(null);
        toast.success('Log out successfully!');
    };
    useEffect(() => {
        if (userId) {
            getInfo(userId)
                .then(res => {
                    setUserInfo(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [userId]);

    return (
        <StoreContext.Provider value={{ userInfo, handleLogout, setUserId }}>
            {children}
        </StoreContext.Provider>
    );
};