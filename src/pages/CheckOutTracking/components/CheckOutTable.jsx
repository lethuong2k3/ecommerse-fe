import styles from '../styles.module.scss';
import { useRef, useState } from 'react';
import LoadMore from '@components/Loading/LoadMore';
import { MdClear } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

function CheckOutTable({ checkOutTrackings, columns }) {
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef();
    const handleChangeSearch = e => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const handleClearInput = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    return (
        <div className={styles.checkoutTable}>
            <div className={styles.containerSearch}>
                <div className={styles.searchInput}>
                    <input
                        type='text'
                        placeholder='Search orders.'
                        value={searchValue}
                        onChange={handleChangeSearch}
                        ref={inputRef}
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
                        >
                            <DatePicker label='Start Date' />
                            <DatePicker label='End Date' />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>
            <Paper sx={{ height: 422, width: '100%' }}>
                <DataGrid
                    rows={checkOutTrackings}
                    columns={columns}
                    hideFooter
                    disableColumnResize
                />
            </Paper>
        </div>
    );
}

export default CheckOutTable;
