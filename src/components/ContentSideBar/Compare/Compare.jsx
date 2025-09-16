import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { TfiReload } from 'react-icons/tfi';
import styles from './styles.module.scss';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import LoadMore from '@components/Loading/LoadMore';
import { useNavigate } from 'react-router-dom';

function Compare() {
    const { compareList, isLoading, setIsOpen } = useContext(SidebarContext);
    const navigate = useNavigate();
    const handleNavigateToCompare = () => {
        const path = '/so-sanh';
        setIsOpen(false);
        navigate(path);
    };
    return (
        <>
            <div className={styles.header}>
                <HeaderSideBar
                    icon={<TfiReload size='24px' />}
                    title='SO SÁNH'
                    handleNavigate={handleNavigateToCompare}
                />
            </div>
            <div className={styles.container}>
                {compareList.length ? (
                    <>
                        <div>
                            {compareList?.map(item => {
                                return (
                                    <ItemProduct
                                        key={item.product.id}
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

                        <div className={styles.boxBtn}>
                            <Button
                                content={'XEM CHI TIẾT'}
                                onClick={() => handleNavigateToCompare()}
                            />
                        </div>
                    </>
                ) : (
                    <div>Không có sản phẩm nào trong mục so sánh.</div>
                )}
            </div>
        </>
    );
}

export default Compare;
