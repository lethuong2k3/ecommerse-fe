import { lazy } from 'react';

const publicRouters = [
    {
        path: '/',
        component: lazy(() => import('@/components/HomePage/home-page')),
    },
    {
        path: '/shop',
        component: lazy(() => import('@/pages/OurShop/our-shop')),
    },
    {
        path: '/shop/:categoryName',
        component: lazy(() => import('@/pages/OurShop/our-shop')),
    },
    {
        path: '/shop/:categoryName/:keyword',
        component: lazy(() => import('@/pages/OurShop/our-shop')),
    },
    {
        path: '/gio-hang',
        component: lazy(() => import('@/pages/Cart/cart')),
    },
    {
        path: '/san-pham-chi-tiet/:id',
        component: lazy(() => import('@pages/DetailProduct')),
    },
    {
        path: '/yeu-thich',
        component: lazy(() => import('@/pages/WishList/wish-list')),
    },
    {
        path: '/so-sanh',
        component: lazy(() => import('@/pages/Compare/compare')),
    },
    {
        path: '/gioi-thieu',
        component: lazy(() => import('@/pages/AboutUs/about-us')),
    },
    {
        path: '/lien-he',
        component: lazy(() => import('@/pages/Contact/contact')),
    },
];

const privateRouters = [
    {
        path: '/thanh-toan',
        component: lazy(() => import('@/pages/CheckOut/check-out')),
    },
    {
        path: '/thanh-toan/ket-qua',
        component: lazy(() => import('@pages/OrderStatus')),
    },
    {
        path: '/danh-sach-don-hang',
        component: lazy(() =>
            import('@/pages/CheckOutTracking/check-out-tracking')
        ),
    },
    {
        path: '/danh-sach-don-hang/:orderCode',
        component: lazy(() =>
            import('@/pages/CheckOutTracking/check-out-details')
        ),
    },
];

export { privateRouters, publicRouters };
