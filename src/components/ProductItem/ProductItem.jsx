import styles from './styles.module.scss';
import { BsBag, BsHeart, BsEye } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';
import _ from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import Button from '@components/Button/Button';
import { OurShopContext } from '@contexts/OurShopProvider';

function ProductItem({ src, prevSrc, name, item, isHomePage = true }) {
    const getPriceRange = obj => {
        const prices = obj.map(product => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        return { minPrice, maxPrice };
    };
    const { minPrice, maxPrice } = getPriceRange(item.productDetails);
    const isSamePrice = minPrice === maxPrice;
    const sizes = useMemo(() => {
        const sizeSet = _.uniq(_.map(item?.productDetails, 'size.name'));
        return sizeSet;
    }, [item]);
    const ourShopStore = useContext(OurShopContext);
    const [isShowGrid, setIsShowGrid] = useState(ourShopStore?.isShowGrid);
    const [sizeChoose, setSizeChoose] = useState('');
    const handleChooseSize = size => {
        setSizeChoose(size);
    };
    const handleClearSize = () => {
        setSizeChoose('');
    };
    useEffect(() => {
        isHomePage
            ? setIsShowGrid(true)
            : setIsShowGrid(ourShopStore?.isShowGrid);
    }, [isHomePage, ourShopStore?.isShowGrid]);
    return (
        <div className={isShowGrid ? '' : styles.containerItem}>
            <div
                className={cls(styles.boxImg, {
                    [styles.largImg]: !isShowGrid,
                })}
            >
                <img src={src} alt='' />
                <img src={prevSrc} alt='' className={styles.showImgWhenHover} />
                <div className={styles.showFncWhenHover}>
                    <div className={styles.boxIcon}>
                        <BsBag />
                    </div>
                    <div className={styles.boxIcon}>
                        <BsHeart />
                    </div>
                    <div className={styles.boxIcon}>
                        <TfiReload />
                    </div>
                    <div className={styles.boxIcon}>
                        <BsEye />
                    </div>
                </div>
            </div>
            <div
                className={isShowGrid ? '' : styles.content}
                style={{ marginTop: '10px' }}
            >
                {!isHomePage && (
                    <div className={styles.boxSize}>
                        {sizes?.map((size, index) => (
                            <div
                                className={cls(styles.sizes, {
                                    [styles.isActiveSize]: sizeChoose === size,
                                })}
                                key={index}
                                onClick={() => handleChooseSize(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                )}
                {sizeChoose && (
                    <div
                        className={styles.btnClear}
                        onClick={() => handleClearSize()}
                    >
                        clear
                    </div>
                )}
                <div
                    className={cls(styles.title, {
                        [styles.textCenter]: !isHomePage,
                    })}
                >
                    {name}
                </div>
                {!isHomePage && (
                    <div
                        className={styles.textCenter}
                        style={{ color: '#888', fontSize: '14px' }}
                    >
                        {item.brand.name}
                    </div>
                )}
                <div
                    className={cls(styles.price, {
                        [styles.textCenter]: !isHomePage,
                    })}
                    style={{ color: isHomePage ? '#333' : '#888' }}
                >
                    {isSamePrice ? (
                        <p>${minPrice}</p>
                    ) : (
                        <>
                            <p>Min Price: ${minPrice}</p>
                            <p>Max Price: ${maxPrice}</p>
                        </>
                    )}
                </div>
                {!isHomePage && (
                    <div
                        className={cls(styles.boxBtn, {
                            [styles.leftBtn]: !isShowGrid,
                        })}
                    >
                        <Button content={'ADD TO CART'} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductItem;
