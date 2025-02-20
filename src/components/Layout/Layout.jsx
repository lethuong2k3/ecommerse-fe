import styles from './styles.module.scss';

function MainLayout({ children, ...params }) {
    const { wrapLayout, container } = styles;
    return (
        <main className={wrapLayout} {...params}>
            <div className={container}>{children}</div>
        </main>
    );
}

export default MainLayout;
