import styles from '../styles.module.scss';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

function BoxIcon({ type, href }) {
    const { boxIcon } = styles;
    const handleRenderIcon = type => {
        switch (type) {
            case 'fb':
                return <FaFacebookF />;
            case 'ins':
                return <FaInstagram />;
            case 'ytb':
                return <FaYoutube />;
        }
    };
    return (
        <div className={boxIcon}>
            <i style={{ width: '15px', height: '15px', color: '#fff' }}>
                {handleRenderIcon(type)}
            </i>
        </div>
    );
}

export default BoxIcon;
