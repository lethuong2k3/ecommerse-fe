import { lazy } from 'react';

const publicRouters = [
    {
        path: '/',
        component: lazy(() => import('@/components/home-page/home-page')),
    },
    {
        path: '/shop',
        component: lazy(() => import('@/pages/our-shop/our-shop')),
    },
    {
        path: '/shop/:categoryName',
        component: lazy(() => import('@/pages/our-shop/our-shop')),
    },
    {
        path: '/shop/:categoryName/:keyword',
        component: lazy(() => import('@/pages/our-shop/our-shop')),
    },
    {
        path: '/gio-hang',
        component: lazy(() => import('@/pages/cart/cart')),
    },
    {
        path: '/san-pham-chi-tiet/:id',
        component: lazy(() => import('@/pages/detail-product')),
    },
    {
        path: '/yeu-thich',
        component: lazy(() => import('@/pages/wish-list/wish-list')),
    },
    {
        path: '/so-sanh',
        component: lazy(() => import('@/pages/compare/compare')),
    },
    {
        path: '/gioi-thieu',
        component: lazy(() => import('@/pages/about-us/about-us')),
    },
    {
        path: '/lien-he',
        component: lazy(() => import('@/pages/contact/contact')),
    },
];

const privateRouters = [
    {
        path: '/thanh-toan',
        component: lazy(() => import('@/pages/check-out/check-out')),
    },
    {
        path: '/thanh-toan/ket-qua',
        component: lazy(() => import('@/pages/order-status')),
    },
    {
        path: '/danh-sach-don-hang',
        component: lazy(() =>
            import('@/pages/check-out-tracking/check-out-tracking')
        ),
    },
    {
        path: '/danh-sach-don-hang/:orderCode',
        component: lazy(() =>
            import('@/pages/check-out-tracking/check-out-details')
        ),
    },
];

export { privateRouters, publicRouters };
