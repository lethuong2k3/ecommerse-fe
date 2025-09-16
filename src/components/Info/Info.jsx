import { dataInfo } from '@components/Info/constants';
import InfoCard from '@components/Info/InfoCard/InfoCard';
import styles from './styles.module.scss';

function Info() {
    return (
        <div className={styles.container}>
            {dataInfo.map((item, key) => {
                return <InfoCard key={key} item={item} />;
            })}
        </div>
    );
}

export default Info;
