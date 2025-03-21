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
        path: '/cart',
        component: lazy(() => import('@pages/Cart/Cart')),
    },
    {
        path: '/product/:id',
        component: lazy(() => import('@pages/DetailProduct')),
    },
    {
        path: '/wishlist',
        component: lazy(() => import('@pages/WishList/WishList')),
    },
    {
        path: '/compare',
        component: lazy(() => import('@pages/Compare/Compare')),
    },
    {
        path: '/about-us',
        component: lazy(() => import('@pages/AboutUs/AboutUs')),
    },
    {
        path: '/contact-us',
        component: lazy(() => import('@pages/Contact/Contact')),
    },
];

const privateRouters = [
    {
        path: '/checkout',
        component: lazy(() => import('@pages/CheckOut/CheckOut')),
    },
];

export { privateRouters, publicRouters };
