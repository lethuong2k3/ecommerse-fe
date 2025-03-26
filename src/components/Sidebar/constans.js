import { FaRegUser } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';

const dataMenu = [
    { content: 'Home', href: '/' },
    { content: 'Shop', href: '/shop' },
    { content: 'About us', href: '/about-us' },
    { content: 'Contacts', href: '/contact-us' },
    { content: 'Account', href: '#', icon: FaRegUser },
    { content: 'Cart', href: '/cart', icon: BsCart3 },
    { content: 'Wishlist', href: '/wishlist', icon: BsHeart },
    { content: 'Compare', href: '/compare', icon: TfiReload },
];

export default dataMenu;
