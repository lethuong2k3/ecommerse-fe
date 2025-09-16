import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import LoginPage from '@/pages/login/login-page';

export default function LoginRoute() {
    const token = Cookies.get('token');
    return token ? <Navigate to={'/'} /> : <LoginPage />;
}
