import { createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const value = { toast };
    return (
        <ToastContext.Provider value={value}>
            {children}{' '}
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
                closeButton={false}
                draggablePercent={60}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    fontSize: '14px',
                    padding: '0 10px',
                    boxSizing: 'border-box',
                }}
                toastStyle={{
                    margin: '8px 0',
                    borderRadius: '12px',
                }}
            />
        </ToastContext.Provider>
    );
};
