import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import Header from '@components/Header/Header';
import styles from './styles.module.scss';
import MainLayout from '@components/Layout/Layout';
import CheckOutTable from '@pages/CheckOutTracking/components/CheckOutTable';
import Button from '@components/Button/Button';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import '@pages/CheckOutTracking/style.css';
import { useEffect, useState } from 'react';
import { orderTrackings } from '@apis/orderService';
import { getPriceRange } from '@hooks/useFomatPrice';
import { BsEye } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function CheckOutTracking() {
    const [checkOutTrackings, setCheckOutTrackings] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(7);
    const navigate = useNavigate();
    const columns = [
        { field: 'id', headerName: 'Order', flex: 1 },
        {
            field: 'orderDate',
            headerName: 'Date',
            flex: 2,

            valueGetter: params => {
                return moment(params.value).format('LLL');
            },
        },
        { field: 'orderStatus', headerName: 'Payment Status', flex: 1 },
        {
            field: 'payment',
            headerName: 'Payment Method',
            valueGetter: params => params?.paymentType?.value || 'N/A',
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: params => (
                <div className={styles.boxBtn}>
                    <Button
                        content={
                            <>
                                {' '}
                                <BsEye /> View{' '}
                            </>
                        }
                        isPrimary={false}
                    />
                </div>
            ),
            flex: 0.7,
        },
    ];
    const handlePageClick = event => {
        setCurrentPage(event.selected);
    };
    const handleNavigateToDetail = id => {
        const path = `/product/${id}`;
        navigate(path);
    };
    const fetchData = (page = 0) => {
        const request = {
            size: pageSize,
            page: page,
            type: 'desc',
            sortBy: 'id',
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
        fetchData(currentPage);
    }, [currentPage]);

    return (
        <>
            <Header />
            <MainLayout>
                <div className={styles.container}>
                    <Breadcrumbs title={'Check out tracking'} />
                    <CheckOutTable
                        checkOutTrackings={checkOutTrackings}
                        handleNavigateToDetail={handleNavigateToDetail}
                        getPriceRange={getPriceRange}
                        columns={columns}
                    />
                    <ReactPaginate
                        breakLabel='...'
                        nextLabel='Next >'
                        onPageChange={handlePageClick}
                        forcePage={currentPage}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel='< Prev'
                        renderOnZeroPageCount={null}
                        className='react-paginate'
                    />
                </div>
            </MainLayout>
        </>
    );
}

export default CheckOutTracking;
