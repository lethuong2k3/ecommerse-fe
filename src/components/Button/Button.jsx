import styles from './styles.module.scss';

function Button({ content }) {
    return <button className={styles.btn}>{content}</button>;
}

export default Button;
