import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import LoginPage from '@pages/Login/LoginPage';

export default function LoginRoute() {
    const token = Cookies.get('token');
    return token ? <Navigate to={'/'} /> : <LoginPage />;
}
