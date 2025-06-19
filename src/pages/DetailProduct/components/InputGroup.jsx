import { IoMdStar } from 'react-icons/io';
import styles from '../styles.module.scss';
import { useState } from 'react';
import cls from 'classnames';
import InputCommon from '@components/InputCommon/InputCommon';

function InputGroup({
    label,
    typeChildren,
    isRequired,
    handleChooseStar,
    selectedStar,
    formik,
}) {
    const [hoverStar, setHoverStar] = useState(null);

    const renderChildren = () => {
        switch (typeChildren) {
            case 'rating':
                return (
                    <div className={styles.boxItemStar}>
                        {Array.from({ length: 5 }, (_, index) => {
                            const isActive =
                                hoverStar !== null
                                    ? index < hoverStar
                                    : index < selectedStar;

                            return (
                                <IoMdStar
                                    key={index}
                                    size={20}
                                    className={cls(styles.starIcon, {
                                        [styles.active]: isActive,
                                    })}
                                    onMouseEnter={() => setHoverStar(index + 1)}
                                    onMouseLeave={() => setHoverStar(null)}
                                    onClick={() => handleChooseStar(index)}
                                />
                            );
                        })}
                    </div>
                );
            case 'textarea':
                return (
                    <InputCommon
                        id='comment'
                        type='textarea'
                        rows={5}
                        formik={formik}
                    />
                );
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
