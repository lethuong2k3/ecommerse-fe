import { dataInfo } from '@components/Info/constants';
import InfoCard from '@components/Info/InfoCard/InfoCard';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';

function Info() {
    return (
        <div>
            <MainLayout>
                <div className={styles.container}>
                    {dataInfo.map((item, key) => {
                        return <InfoCard key={key} item={item} />;
                    })}
                </div>
            </MainLayout>
        </div>
    );
}

export default Info;
