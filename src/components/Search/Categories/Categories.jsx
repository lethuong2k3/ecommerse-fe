import Button from '@components/Button/Button';
import styles from '../styles.module.scss';

function Categories({ categories, handleNavigateToShop }) {
    const totalProducts = categories?.reduce(
        (total, category) => total + category.countProducts,
        0
    );
    return (
        <div className={styles.containerContent}>
            <h2 className={styles.titleContent}>Thể Loại Phổ Biến</h2>
            <div className={styles.sliderContent}>
                <div className={styles.productCategory}>
                    <img
                        src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-17.1-min.jpg'
                        alt='image-all'
                        onClick={() => handleNavigateToShop('all')}
                    />
                    <div className={styles.categoriesMask}>
                        <p>ALL</p>
                        <span>{totalProducts} products</span>
                    </div>
                </div>
                {categories.map(item => {
                    return (
                        <div key={item.id} className={styles.productCategory}>
                            <img
                                src={item.imageUrl}
                                onClick={() => handleNavigateToShop(item.name)}
                            />
                            <div className={styles.categoriesMask}>
                                <p>{item.name}</p>
                                <span>{item.countProducts} products</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.btnViewAll}>
                <Button
                    onClick={() => handleNavigateToShop('all')}
                    content={'Xem nhiều thể loại'}
                />
            </div>
        </div>
    );
}

export default Categories;
