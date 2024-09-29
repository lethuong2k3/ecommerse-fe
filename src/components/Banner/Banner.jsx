import Button from '@components/Button/Button';
import styles from './styles.module.scss';

function Banner() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Fpoly Clothes</h1>
                <div className={styles.description}>
                    Make yours celebrations even more special this years with
                    beautiful.
                </div>
                <Button content={'Go to shop'}></Button>
            </div>
        </div>
    );
}

export default Banner;
