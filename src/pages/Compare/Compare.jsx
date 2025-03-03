import Header from '@components/Header/Header';
import styles from './styles.module.scss';
import PageHeader from '@components/PageHeader/PageHeader';
import MainLayout from '@components/Layout/Layout';
import Button from '@components/Button/Button';
import MyFooter from '@components/Footer/Footer';
import EmptyItem from '@components/EmptyItem/EmptyItem';

import { useContext, useEffect, useRef, useState } from 'react';
import { TfiReload } from 'react-icons/tfi';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { FaRegTrashCan } from 'react-icons/fa6';
import { SidebarContext } from '@contexts/SideBarProvider';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { deleteCompare, deleteAllCompare } from '@apis/compareService';
import LoadMore from '@components/Loading/LoadMore';
import Cookies from 'js-cookie';
import CheckBox from '@components/CheckBox/CheckBox';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { IoWarningOutline } from 'react-icons/io5';
import { ToastContext } from '@contexts/ToastProvider';

function Compare() {
    const { compareList, handleGetListCompare } = useContext(SidebarContext);
    const { toast } = useContext(ToastContext);
    const [compares, setCompares] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [visible, setVisible] = useState(false);
    const userId = Cookies.get('id');
    useEffect(() => {
        setCompares([...compareList]);
    }, [compareList]);
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);
    const getPriceRange = obj => {
        const prices = obj.map(product => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        if (minPrice === maxPrice) return <>${maxPrice}</>;
        return (
            <>
                ${minPrice} - ${maxPrice}
            </>
        );
    };
    while (compares?.length < 4 && compares?.length > 0) {
        compares.push({
            product: [
                {
                    id: '',
                    name: '',
                    description: '',
                    productDetails: [],
                    images: [],
                    sku: '',
                    status: undefined,
                    brand: undefined,
                },
            ],
        });
    }
    const handleScroll = direction => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            if (direction === 'left') {
                scrollContainerRef.current.scrollLeft -= scrollAmount;
            } else {
                scrollContainerRef.current.scrollLeft += scrollAmount;
            }
        }
    };

    const handleNavigateToShop = () => {
        navigate('/shop');
    };

    const handleSelect = (value, name) => {
        if (value) {
            setSelected([...selected, name]);
        } else {
            setSelected(selected.filter(item => item !== name));
        }
    };

    const handleSelectAll = value => {
        if (value) {
            setSelected(compareList);
        } else {
            setSelected([]);
        }
    };

    const handleRemoveCompare = (idCompare, product) => {
        setIsLoading(true);
        deleteCompare({ id: idCompare, product: product })
            .then(res => {
                handleGetListCompare(userId);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    };

    const handleRemoveAllCompare = () => {
        if (!selected.length) {
            toast.warning('Please, choose any product by clicking checkbox');
            return;
        }
        setVisible(true);
    };

    const acceptRemoveAllCompare = () => {
        setIsLoading(true);
        deleteAllCompare(selected)
            .then(res => {
                setSelected([]);
                handleGetListCompare(userId);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <PageHeader
                    icon={<TfiReload />}
                    size={17}
                    title={'COMPARE'}
                    style={{ marginTop: '83px' }}
                />
                <MainLayout style={{ position: 'relative' }}>
                    {compares.length ? (
                        <>
                            {compares.length > 4 && (
                                <div
                                    className={styles.previous}
                                    onClick={() => handleScroll('left')}
                                >
                                    <GrPrevious size={25} />
                                </div>
                            )}
                            <div
                                className={styles.productComparison}
                                ref={scrollContainerRef}
                            >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Action</td>
                                            {compares.map(compare => (
                                                <th key={compare.product.id}>
                                                    {compare.product.id && (
                                                        <button
                                                            className={
                                                                styles.delete
                                                            }
                                                            onClick={() =>
                                                                handleRemoveCompare(
                                                                    compare.id,
                                                                    compare.product
                                                                )
                                                            }
                                                        >
                                                            <FaRegTrashCan />{' '}
                                                            Delete
                                                        </button>
                                                    )}
                                                </th>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Image</td>
                                            {compares.map(compare => (
                                                <td key={compare.product.id}>
                                                    {compare.product.images && (
                                                        <img
                                                            className={
                                                                styles.image
                                                            }
                                                            src={
                                                                compare.product
                                                                    .images[0]
                                                                    .url
                                                            }
                                                            alt={
                                                                compare.product
                                                                    .images[0]
                                                                    .filename
                                                            }
                                                        />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Title</td>
                                            {compares.map(compare => (
                                                <td key={compare.product.id}>
                                                    {compare.product.name}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            {compares.map(compare => (
                                                <td key={compare.product.id}>
                                                    {compare.product
                                                        .productDetails &&
                                                        getPriceRange(
                                                            compare.product
                                                                .productDetails
                                                        )}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Button</td>
                                            {compares.map(compare => (
                                                <td key={compare.product.id}>
                                                    {compare.product.id && (
                                                        <Button
                                                            content={
                                                                'Select Options'
                                                            }
                                                        />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Stock Status</td>
                                            {compares.map(compare => (
                                                <td
                                                    key={compare.product.id}
                                                    className={
                                                        styles.stockStatus
                                                    }
                                                >
                                                    {compare.product.status ==
                                                    1 ? (
                                                        <div
                                                            className={
                                                                styles.inStock
                                                            }
                                                        >
                                                            <span>
                                                                <FaCheck /> In
                                                                stock
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {compare.product.status ==
                                                    0 ? (
                                                        <div
                                                            className={
                                                                styles.outOfStock
                                                            }
                                                        >
                                                            <span>
                                                                {' '}
                                                                <IoMdClose />{' '}
                                                                Out of stock
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Brand</td>
                                            {compares.map(compare => (
                                                <td key={compare.product.id}>
                                                    {compare.product.brand && (
                                                        <img
                                                            src={
                                                                compare.product
                                                                    .brand
                                                                    .imageUrl
                                                            }
                                                            alt={
                                                                compare.product
                                                                    .brand.name
                                                            }
                                                        />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>SKU</td>
                                            {compares.map(compare => (
                                                <td key={compare.product.id}>
                                                    {compare.product.sku}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>
                                                <div
                                                    className={styles.checkbox}
                                                >
                                                    <CheckBox
                                                        name='all'
                                                        value={
                                                            selected.length ===
                                                            compareList.length
                                                        }
                                                        updateValue={
                                                            handleSelectAll
                                                        }
                                                    />
                                                    Select all
                                                </div>
                                            </td>
                                            {compares.map(compare => (
                                                <td key={compare.product.id}>
                                                    {compare.product.id && (
                                                        <CheckBox
                                                            name={compare}
                                                            value={selected.includes(
                                                                compare
                                                            )}
                                                            updateValue={
                                                                handleSelect
                                                            }
                                                        />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {compares.length > 4 && (
                                <div
                                    className={styles.next}
                                    onClick={() => handleScroll('right')}
                                >
                                    <GrNext size={25} />
                                </div>
                            )}
                            <div className={styles.boxBtn}>
                                <Button
                                    onClick={() => handleRemoveAllCompare()}
                                    content={
                                        <>
                                            {' '}
                                            <FaRegTrashCan /> CLEAR COMPARE
                                        </>
                                    }
                                    isPrimary={false}
                                ></Button>
                                <Button
                                    onClick={() => handleNavigateToShop()}
                                    content={'COMPARE MORE PRODUCTS'}
                                    style={{ width: '213px' }}
                                ></Button>
                            </div>
                            {isLoading && (
                                <div className={styles.loading}>
                                    <LoadMore size={25} />
                                </div>
                            )}
                            <ConfirmDialog
                                group='declarative'
                                visible={visible}
                                onHide={() => setVisible(false)}
                                message='Are you sure you want to proceed?'
                                header='Confirmation'
                                style={{ width: '50vw' }}
                                breakpoints={{
                                    '1100px': '75vw',
                                    '960px': '100vw',
                                }}
                                icon={<IoWarningOutline size={30} />}
                                accept={acceptRemoveAllCompare}
                            />
                        </>
                    ) : (
                        <EmptyItem
                            icon={<TfiReload size={40} />}
                            handleNavigateToShop={handleNavigateToShop}
                            title={'COMPARE'}
                        />
                    )}
                </MainLayout>
                <MyFooter />
            </div>
        </>
    );
}

export default Compare;
