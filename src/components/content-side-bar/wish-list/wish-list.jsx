import HeaderSideBar from '@/components/content-side-bar/components/header-side-bar/header-side-bar';
import { BsHeart } from 'react-icons/bs';
import styles from './styles.module.scss';
import ItemProduct from '@/components/content-side-bar/components/item-product/item-product';
import Button from '@/components/button/button';
import { useContext } from 'react';
import { SidebarContext } from '@/contexts/sidebar-provider';
import LoadMore from '@/components/loading/load-more';
import { useNavigate } from 'react-router-dom';

function WishList() {
    const { listWList, isLoading, setIsOpen } = useContext(SidebarContext);
    const navigate = useNavigate();
    const handleNavToWishList = () => {
        setIsOpen(false);
        navigate('/yeu-thich');
    };
    return (
        <>
            <div className={styles.header}>
                <HeaderSideBar
                    icon={<BsHeart size='24px' />}
                    title='YÊU THÍCH'
                    handleNavigate={handleNavToWishList}
                />
            </div>

            <div className={styles.container}>
                {listWList.length ? (
                    <>
                        <div>
                            {listWList?.map(item => {
                                return (
                                    <ItemProduct
                                        key={item.id}
                                        src={item.product.images[0].url}
                                        name={item.product.name}
                                        sku={item.product.sku}
                                        item={item}
                                    />
                                );
                            })}

                            {isLoading && (
                                <div className={styles.overlayLoading}>
                                    <LoadMore />
                                </div>
                            )}
                        </div>
                        <div
                            className={styles.boxBtn}
                            onClick={() => handleNavToWishList()}
                        >
                            <Button content={'XEM CHI TIẾT'} />
                        </div>
                    </>
                ) : (
                    <div>Không có sản phẩm nào trong mục yêu thích.</div>
                )}
            </div>
        </>
    );
}

export default WishList;
