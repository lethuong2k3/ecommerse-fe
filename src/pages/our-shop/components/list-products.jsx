import MainLayout from '@/components/layout/layout';
import { useContext } from 'react';
import { OurShopContext } from '@/contexts/our-shop-provider';
import ProductItem from '@/components/product-item/product-item';
import styles from '../styles.module.scss';
import Button from '@/components/button/button';
import Loading from '@/components/loading/loading';
import LoadMore from '@/components/loading/load-more';

function ListProducts() {
    const {
        products,
        isShowGrid,
        isLoading,
        handleLoadMore,
        total,
        isLoadMore,
    } = useContext(OurShopContext);

    return (
        <div className={styles.sectionListProduct}>
            <MainLayout>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <div
                            className={
                                isShowGrid ? styles.containerProduct : ''
                            }
                        >
                            {' '}
                            {!products.length && (
                                <span
                                    style={{
                                        textAlign: 'center',
                                        width: '100%',
                                    }}
                                >
                                    Không tìm thấy sản phẩm nào
                                </span>
                            )}
                            {products.map(item => (
                                <ProductItem
                                    key={item.id}
                                    src={item.images[0].url}
                                    prevSrc={item.images[1].url}
                                    name={item.name}
                                    item={item}
                                    isHomePage={false}
                                />
                            ))}
                        </div>
                        {products.length < total && (
                            <div
                                style={{ width: '180px', margin: '50px auto' }}
                            >
                                <Button
                                    onClick={handleLoadMore}
                                    isPrimary={false}
                                    content={
                                        isLoadMore ? (
                                            <LoadMore />
                                        ) : (
                                            'Hiển thị thêm'
                                        )
                                    }
                                />
                            </div>
                        )}
                    </>
                )}
            </MainLayout>
        </div>
    );
}

export default ListProducts;
