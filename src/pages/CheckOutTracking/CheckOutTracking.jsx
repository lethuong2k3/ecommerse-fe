import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import Header from '@components/Header/Header';
import styles from './styles.module.scss';
import MainLayout from '@components/Layout/Layout';
import CheckOutTable from '@pages/CheckOutTracking/components/CheckOutTable';
import '@pages/CheckOutTracking/style.css';
import LoadMore from '@components/Loading/LoadMore';
import useOrderStatus from '@hooks/useOrderStatus';
import useDebounce from '@hooks/useDebounce';

import { useEffect, useState, useRef } from 'react';
import { orderTrackings } from '@apis/orderService';
import { formatPrice } from '@hooks/useFomatPrice';
import { useNavigate } from 'react-router-dom';
import { MdClear } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MyFooter from '@components/Footer/Footer';

function CheckOutTracking() {
    const [checkOutTrackings, setCheckOutTrackings] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(7);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 1000);

    const navigate = useNavigate();

    const handleNavigateToDetail = id => {
        const path = `/product/${id}`;
        navigate(path);
    };

    const inputRef = useRef();
    const handleChangeSearch = e => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const handleClearInput = () => {
        setSearchValue('');
        setCheckOutTrackings([]);
        inputRef.current.focus();
    };

    const handleNavCheckoutDT = orderCode => {
        const path = `/danh-sach-don-hang/${orderCode}`;
        navigate(path);
    };

    const fetchData = () => {
        const request = {
            size: pageSize,
            page: currentPage,
            type: 'desc',
            sortBy: 'orderCode',
            keyword: debouncedValue,
        };

        orderTrackings(request)
            .then(res => {
                const data = res.data;
                setCheckOutTrackings(data.content);
                setPageCount(data.page.totalPages);
                setCurrentPage(data.page.number);
            })
            .catch(err => {
                console.error(err);
            });
    };
    useEffect(() => {
        fetchData();
    }, [currentPage, debouncedValue]);

    return (
        <>
            <Header />
            <MainLayout>
                <div className={styles.container}>
                    <Breadcrumbs title={'Danh sách đơn hàng'} />
                    <div className={styles.containerSearch}>
                        <div className={styles.searchInput}>
                            <input
                                type='text'
                                placeholder='Tìm kiếm đơn hàng.'
                                value={searchValue}
                                onChange={handleChangeSearch}
                                ref={inputRef}
                                spellCheck={false}
                            />
                            <span className={styles.boxClear}>
                                {isLoading && <LoadMore size={12} />}
                                {!!searchValue && (
                                    <MdClear
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleClearInput()}
                                    />
                                )}
                            </span>
                            <div className={styles.boxBtn}>
                                <IoIosSearch size={20} />
                            </div>
                        </div>
                        <div className={styles.containerDate}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={['DatePicker', 'DatePicker']}
                                    sx={{
                                        minWidth: '90%',
                                        margin: '0 auto',
                                    }}
                                >
                                    <DatePicker
                                        label='Ngày bắt đầu'
                                        sx={{
                                            width: '100%',
                                        }}
                                    />
                                    <DatePicker
                                        label='Ngày kết thúc'
                                        sx={{
                                            width: '100%',
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={styles.containerStatus}></div>
                    <CheckOutTable
                        checkOutTrackings={checkOutTrackings}
                        handleNavigateToDetail={handleNavigateToDetail}
                        formatPrice={formatPrice}
                        useOrderStatus={useOrderStatus}
                        handleNavCheckoutDT={handleNavCheckoutDT}
                    />
                    {checkOutTrackings.length > 0 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() =>
                                    setCurrentPage(prev =>
                                        Math.max(prev - 1, 0)
                                    )
                                }
                                disabled={currentPage === 0}
                            >
                                ⬅ Trước
                            </button>

                            {Array.from({ length: pageCount }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={
                                        currentPage === i ? styles.active : ''
                                    }
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() =>
                                    setCurrentPage(prev =>
                                        Math.min(prev + 1, pageCount - 1)
                                    )
                                }
                                disabled={currentPage === pageCount - 1}
                            >
                                Sau ➡
                            </button>
                        </div>
                    )}
                </div>
            </MainLayout>
            <MyFooter />
        </>
    );
}

export default CheckOutTracking;
