import { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getCategories } from '@apis/categoryService';
import { MdClear } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { TfiClose } from 'react-icons/tfi';
import LoadMore from '@components/Loading/LoadMore';
import Button from '@components/Button/Button';
import { SearchContext } from '@contexts/SearchProvider';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [categories, setCategories] = useState([]);
    const { showSearch, setShowSearch } = useContext(SearchContext);
    const navigate = useNavigate();
    const trendingSearches = [
        {
            title: 'Shirt',
            href: '/#',
        },
        {
            title: 'Shoes',
            href: '/#',
        },
        {
            title: 'Cap',
            href: '/#',
        },
        {
            title: 'Skirt',
            href: '/#',
        },
    ];
    const totalProducts = categories?.reduce(
        (total, category) => total + category.countProducts,
        0
    );

    const handleClose = () => {
        setShowSearch(false);
    };

    const handleNavigateToShop = categoryName => {
        var path = `/shop/${categoryName}`;
        setShowSearch(false);
        navigate(path);
    };

    useEffect(() => {
        getCategories()
            .then(res => {
                setCategories(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div
            className={cls(styles.container, {
                [styles.showSearch]: showSearch,
            })}
        >
            <div className={styles.containerForm}>
                <form>
                    <div>
                        <div className={styles.title}>
                            What Are You Looking For?
                        </div>
                        <div className={styles.formInput}>
                            <select className={styles.formSelect}>
                                <option value={0} key={0}>
                                    All Categories
                                </option>
                                {categories?.map(item => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className={styles.inputSearch}>
                                <input
                                    type='text'
                                    placeholder='Search for products'
                                />
                                <span>
                                    <LoadMore size={13} />
                                    <MdClear style={{ cursor: 'pointer' }} />
                                </span>
                            </div>
                            <div className={styles.boxBtn}>
                                <button type='submit'>
                                    <IoIosSearch size={16} />
                                    SEARCH
                                </button>
                            </div>
                        </div>
                        <div className={styles.tags}>
                            <span className={styles.tagsTitle}>
                                Trending searches:{' '}
                            </span>
                            {trendingSearches.map((item, index) => {
                                return (
                                    <a key={index} href={item.href}>
                                        {item.title}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.containerContent}>
                        <h2 className={styles.titleContent}>
                            Popular Categories
                        </h2>
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
                                    <div
                                        key={item.id}
                                        className={styles.productCategory}
                                    >
                                        <img
                                            src={item.imageUrl}
                                            onClick={() =>
                                                handleNavigateToShop(item.name)
                                            }
                                        />
                                        <div className={styles.categoriesMask}>
                                            <p>{item.name}</p>
                                            <span>
                                                {item.countProducts} products
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.btnViewAll}>
                            <Button content={'VIEW ALL CATEGORIES'} />
                        </div>
                    </div>
                </form>
            </div>
            <span className={styles.btnClose} onClick={() => handleClose()}>
                <TfiClose size={26} />
            </span>
        </div>
    );
}

export default Search;
