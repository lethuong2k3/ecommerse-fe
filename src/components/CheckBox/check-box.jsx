function CheckBox({ name, value = false, updateValue = () => {} }) {
    const handleChange = () => {
        updateValue(!value, name);
    };
    return (
        <input
            type='checkbox'
            id={`${name}-checkbox`}
            name={name}
            checked={value}
            onChange={handleChange}
        />
    );
}

export default CheckBox;
