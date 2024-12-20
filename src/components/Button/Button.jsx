import styles from './styles.module.scss';
import classNames from 'classnames';

function Button({ content, isPrimary = true, ...props }) {
    return (
        <button
            className={classNames(styles.btn, {
                [styles.primaryBtn]: isPrimary,
                [styles.secondaryBtn]: !isPrimary,
            })}
            {...props}
        >
            {content}
        </button>
    );
}

export default Button;
