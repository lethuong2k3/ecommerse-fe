import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const token = Cookies.get('token');
    return token ? <Outlet /> : <Navigate to={'/dang-nhap'} />;
}
