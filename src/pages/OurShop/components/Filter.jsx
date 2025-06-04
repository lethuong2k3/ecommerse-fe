import { TfiLayoutGrid4 } from 'react-icons/tfi';
import { CiCircleList } from 'react-icons/ci';
import styles from '../styles.module.scss';
import { useContext } from 'react';
import { OurShopContext } from '@contexts/OurShopProvider';
import SelectBox from '@pages/OurShop/components/SelectBox';

function Filter() {
    const { sortOptions, showOptions, setSortId, setShowId, setIsShowGrid } =
        useContext(OurShopContext);
    const getValueSelect = (value, type) => {
        type === 'sort' ? setSortId(value) : setShowId(value);
    };
    const handleGetShowGrid = type => {
        setIsShowGrid(type === 'grid');
    };
    return (
        <div className={styles.containerFilter}>
            <div className={styles.boxLeft}>
                <SelectBox
                    options={sortOptions}
                    getValue={getValueSelect}
                    type='sort'
                />
                <div className={styles.boxIcon}>
                    <TfiLayoutGrid4
                        size='20'
                        color='#222'
                        cursor={'pointer'}
                        onClick={() => handleGetShowGrid('grid')}
                    />
                    <div
                        style={{
                            height: '20px',
                            width: '1px',
                            backgroundColor: '#e1e1e1',
                        }}
                    />
                    <CiCircleList
                        size='24'
                        color='#222'
                        cursor={'pointer'}
                        onClick={() => handleGetShowGrid('list')}
                    />
                </div>
            </div>
            <div className={styles.boxLeft}>
                <div
                    className={styles.labelShow}
                    style={{ fontSize: '14px', color: '#555' }}
                >
                    Hiển thị
                </div>
                <SelectBox
                    options={showOptions}
                    getValue={getValueSelect}
                    type='show'
                />
            </div>
        </div>
    );
}

export default Filter;
