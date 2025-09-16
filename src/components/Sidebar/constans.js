import { FaRegUser } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';
import { VscArchive } from 'react-icons/vsc';

const dataMenu = [
    { content: 'Trang chủ', href: '/' },
    { content: 'Shop', href: '/shop' },
    { content: 'Giới thiệu', href: '/gioi-thieu' },
    { content: 'Liên hệ', href: '/lien-he' },
    { content: 'Đăng nhập', href: '/dang-nhap', icon: FaRegUser },
    { content: 'Giỏ hàng', href: '/gio-hang', icon: BsCart3 },
    { content: 'Yêu thích', href: '/yeu-thich', icon: BsHeart },
    { content: 'So sánh', href: '/so-sanh', icon: TfiReload },
    {
        content: 'Danh sách đơn hàng',
        href: '/danh-sach-don-hang',
        icon: VscArchive,
        private: true,
    },
];

export default dataMenu;
