import { useContext } from 'react';
import styles from './styles.module.scss';
import { SidebarContext } from '@/contexts/sidebar-provider';
import classNames from 'classnames';

import Login from '@/components/content-side-bar/login/login';
import Compare from '@/components/content-side-bar/compare/compare';
import { MdClose } from 'react-icons/md';
import WishList from '@/components/content-side-bar/wish-list/wish-list';
import Cart from '@/components/content-side-bar/cart/cart';
import DetailProduct from '@/components/content-side-bar/view-product/view-product';

function Sidebar() {
    const { isOpen, setIsOpen, type } = useContext(SidebarContext);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleRenderContent = () => {
        switch (type) {
            case 'login':
                return <Login />;
            case 'compare':
                return <Compare />;
            case 'wishlist':
                return <WishList />;
            case 'cart':
                return <Cart />;
            case 'detail':
                return <DetailProduct />;
        }
    };

    return (
        <div className={styles.container}>
            <div
                className={classNames({
                    [styles.overlay]: isOpen,
                })}
                onClick={handleToggle}
            />
            <div
                className={classNames(styles.sideBar, {
                    [styles.sideSideBar]: isOpen,
                })}
            >
                {isOpen && (
                    <div className={styles.boxIcon} onClick={handleToggle}>
                        <MdClose />
                    </div>
                )}
                {handleRenderContent()}
            </div>
        </div>
    );
}

export default Sidebar;
