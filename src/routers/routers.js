import { lazy } from 'react';

const publicRouters = [
    {
        path: '/',
        component: lazy(() => import('@components/HomePage/HomePage')),
    },
    {
        path: '/shop',
        component: lazy(() => import('@pages/OurShop/OurShop')),
    },
    {
        path: '/shop/:categoryName',
        component: lazy(() => import('@pages/OurShop/OurShop')),
    },
    {
        path: '/shop/:categoryName/:keyword',
        component: lazy(() => import('@pages/OurShop/OurShop')),
    },
    {
        path: '/gio-hang',
        component: lazy(() => import('@pages/Cart/Cart')),
    },
    {
        path: '/san-pham-chi-tiet/:id',
        component: lazy(() => import('@pages/DetailProduct')),
    },
    {
        path: '/yeu-thich',
        component: lazy(() => import('@pages/WishList/WishList')),
    },
    {
        path: '/so-sanh',
        component: lazy(() => import('@pages/Compare/Compare')),
    },
    {
        path: '/gioi-thieu',
        component: lazy(() => import('@pages/AboutUs/AboutUs')),
    },
    {
        path: '/lien-he',
        component: lazy(() => import('@pages/Contact/Contact')),
    },
];

const privateRouters = [
    {
        path: '/thanh-toan',
        component: lazy(() => import('@pages/CheckOut/CheckOut')),
    },
    {
        path: '/thanh-toan/ket-qua',
        component: lazy(() => import('@pages/OrderStatus')),
    },
    {
        path: '/danh-sach-don-hang',
        component: lazy(() =>
            import('@pages/CheckOutTracking/CheckOutTracking')
        ),
    },
    {
        path: '/danh-sach-don-hang/:orderCode',
        component: lazy(() =>
            import('@pages/CheckOutTracking/CheckOutDetails')
        ),
    },
];

export { privateRouters, publicRouters };
