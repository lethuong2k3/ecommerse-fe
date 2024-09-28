import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles.module.scss';
import {
    faFacebookF,
    faInstagram,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

function BoxIcon({ type, href }) {
    const { boxIcon } = styles;
    const handleRenderIcon = type => {
        switch (type) {
            case 'fb':
                return faFacebookF;
            case 'ins':
                return faInstagram;
            case 'ytb':
                return faYoutube;
        }
    };
    return (
        <div className={boxIcon}>
            <FontAwesomeIcon
                width={15}
                height={15}
                color='#fff'
                icon={handleRenderIcon(type)}
            />
        </div>
    );
}

export default BoxIcon;
