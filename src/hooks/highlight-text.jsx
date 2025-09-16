const highlightText = (text, searchValue) => {
    if (!searchValue) return text;
    const regex = new RegExp(`(${searchValue})`, 'gi');
    return text
        .split(regex)
        .map((part, index) =>
            regex.test(part) ? <b key={index}>{part}</b> : part
        );
};

export default highlightText;
