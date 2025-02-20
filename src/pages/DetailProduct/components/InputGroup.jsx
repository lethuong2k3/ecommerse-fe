import { IoMdStar } from 'react-icons/io';
import styles from '../styles.module.scss';

function InputGroup({ label, typeChildren, isRequired }) {
    const renderStar = value => {
        return Array.from({ length: value }, (_, index) => (
            <IoMdStar size={20} key={index} />
        ));
    };
    const renderChildren = () => {
        switch (typeChildren) {
            case 'rating':
                return (
                    <div className={styles.boxItemStar}>
                        {Array.from({ length: 6 }, (_, index) => (
                            <div key={index}>{renderStar(index)}</div>
                        ))}
                    </div>
                );
            case 'input':
                return <input type='text' />;
            case 'textarea':
                return <textarea rows={10} />;
        }
    };
    return (
        <div className={styles.inputGroup}>
            <label>
                {label} {isRequired && <span>*</span>}{' '}
            </label>
            {renderChildren()}
        </div>
    );
}

export default InputGroup;
