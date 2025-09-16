import { getPriceRange } from '@hooks/useFomatPrice';
import styles from '../styles.module.scss';
import { BsCart3 } from 'react-icons/bs';
import highlightText from '@hooks/useHighlightText';

function Products({ data, searchValue, handleNavigateToDetail }) {
    return (
        <div className={styles.containerProducts}>
            <h2 className={styles.titleContent}>
                {data.length} Products found
            </h2>
            <div className={styles.sliderContent}>
                {data.map(item => {
                    return (
                        <div className={styles.productItem} key={item.id}>
                            <div className={styles.boxImg}>
                                <img
                                    src={item.images[0].url}
                                    onClick={() =>
                                        handleNavigateToDetail(item.id)
                                    }
                                />
                                <button
                                    type='button'
                                    className={styles.btnCart}
                                    onClick={() =>
                                        handleNavigateToDetail(item.id)
                                    }
                                >
                                    <BsCart3 size={16} /> SELECT OPTIONS
                                </button>
                            </div>
                            <div className={styles.productMask}>
                                <span className={styles.categoryName}>
                                    {item.category.name}
                                </span>
                                <p
                                    className={styles.productName}
                                    onClick={() =>
                                        handleNavigateToDetail(item.id)
                                    }
                                >
                                    {highlightText(item.name, searchValue)}
                                </p>
                                <div className={styles.productPrice}>
                                    {getPriceRange(item.productDetails)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;
