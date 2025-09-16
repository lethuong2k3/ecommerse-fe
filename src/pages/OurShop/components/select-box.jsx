import styles from '../styles.module.scss';

function SelectBox({ options, getValue, type }) {
    return (
        <select
            className={styles.selectBox}
            onChange={e => getValue(e.target.value, type)}
        >
            {options.map(option => {
                return (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                );
            })}
        </select>
    );
}

export default SelectBox;
