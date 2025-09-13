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
import { getPriceRange } from '@hooks/useFomatPrice';

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
            const scrollAmount = 237;
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

    const handleRemoveCompare = idCompare => {
        setIsLoading(true);
        deleteCompare(idCompare)
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
            toast.warning('Vui lòng đánh dấu vào ô chọn sản phẩm');
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
                    title={'SO SÁNH'}
                    style={{ marginTop: '83px' }}
                />
                <MainLayout style={{ position: 'relative' }}>
                    {compares.length ? (
                        <>
                            <div
                                className={styles.previous}
                                onClick={() => handleScroll('left')}
                            >
                                <GrPrevious size={25} />
                            </div>
                            <div
                                className={styles.productComparison}
                                ref={scrollContainerRef}
                            >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            {compares.map(compare => (
                                                <th key={compare.product.id}>
                                                    {compare.product.id && (
                                                        <button
                                                            className={
                                                                styles.delete
                                                            }
                                                            onClick={() =>
                                                                handleRemoveCompare(
                                                                    compare.id
                                                                )
                                                            }
                                                        >
                                                            <FaRegTrashCan />{' '}
                                                            Xóa
                                                        </button>
                                                    )}
                                                </th>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Hình ảnh</td>
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
                                            <td>Sản Phẩm</td>
                                            {compares.map(compare => (
                                                <td key={compare.product.id}>
                                                    {compare.product.name}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Giá</td>
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
                                            <td>Chi tiết</td>
                                            {compares.map(compare => (
                                                <td key={compare.product.id}>
                                                    {compare.product.id && (
                                                        <Button
                                                            content={
                                                                'Xem chi tiết'
                                                            }
                                                        />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Trạng Thái</td>
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
                                                                <FaCheck /> Còn
                                                                hàng
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
                                                                <IoMdClose />
                                                                Hết hàng
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Thương Hiệu</td>
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
                                                    Chọn Tất Cả
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
                            <div
                                className={styles.next}
                                onClick={() => handleScroll('right')}
                            >
                                <GrNext size={25} />
                            </div>
                            <div className={styles.boxBtn}>
                                <Button
                                    onClick={() => handleRemoveAllCompare()}
                                    content={
                                        <>
                                            {' '}
                                            <FaRegTrashCan /> Xóa tất cả
                                        </>
                                    }
                                    isPrimary={false}
                                ></Button>
                                <Button
                                    onClick={() => handleNavigateToShop()}
                                    content={'So sánh thêm sản phảm'}
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
                                message='Bạn có chắc muốn xóa sản phẩm so sánh không?'
                                header='Xác nhận'
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
