import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

function Breadcrumbs({ title }) {
    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate('/');
    };
    const handleBackPreviosPage = () => {
        navigate(-1);
    };
    return (
        <div className={styles.functionBox}>
            <div>
                <div
                    className={styles.breadcrumb}
                    onClick={() => handleBackHome()}
                >
                    Trang chủ
                </div>{' '}
                &gt; <span className={styles.specialText}>{title}</span>{' '}
            </div>
            <div className={styles.functionBox}>
                <div
                    className={styles.btnBack}
                    onClick={() => handleBackPreviosPage()}
                >
                    &lt; Quay lại trang trước đó
                </div>
            </div>
        </div>
    );
}

export default Breadcrumbs;
