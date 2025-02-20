import styles from './styles.module.scss';
import classNames from 'classnames';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function Button({
    content,
    isPrimary = true,
    isTippy = false,
    titleTippy,
    disabled,
    ...props
}) {
    return (
        <>
            <Tippy content={titleTippy} disabled={!isTippy}>
                <button
                    className={classNames(styles.btn, {
                        [styles.primaryBtn]: isPrimary,
                        [styles.secondaryBtn]: !isPrimary,
                        [styles.btnDisabled]: disabled,
                    })}
                    {...props}
                    disabled={disabled}
                >
                    {content}
                </button>
            </Tippy>
        </>
    );
}

export default Button;
