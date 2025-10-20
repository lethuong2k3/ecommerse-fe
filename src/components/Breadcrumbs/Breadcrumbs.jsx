import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

function Breadcrumbs({ items }) {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        if (path) {
            navigate(path);
        }
    };

    const handleBackPreviosPage = () => {
        navigate(-1);
    };

    return (
        <div className={styles.functionBox}>
            <div>
                {items.map((item, index) => (
                    <span key={index}>
                        <span
                            className={
                                item.path ? styles.breadcrumb : styles.specialText
                            }
                            onClick={() => item.path && handleNavigate(item.path)}
                        >
                            {item.label}
                        </span>
                        {index < items.length - 1 && ' > '}
                    </span>
                ))}
            </div>
            <div className={styles.functionBox}>
                <div
                    className={styles.btnBack}
                    onClick={handleBackPreviosPage}
                >
                    &lt; Quay lại trang trước đó
                </div>
            </div>
        </div>
    );
}

export default Breadcrumbs;
