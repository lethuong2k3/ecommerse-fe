import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { TfiReload } from 'react-icons/tfi';
import styles from './styles.module.scss';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';

function Compare() {
    return (
        <div className={styles.container}>
            <HeaderSideBar icon={<TfiReload size='24px' />} title='COMPARE' />
            <ItemProduct />
        </div>
    );
}

export default Compare;
