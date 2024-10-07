import { useState, useRef, useEffect } from 'react';

const useTranslateXImage = () => {
    const [scrollDriction, setScrollDriction] = useState(null);
    const previousScrollPosition = useRef(0);
    const [translateXPosition, setTranslateXPosition] = useState(30);
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollTracking = () => {
        const currentScrollPosition = window.pageYOffset;
        if (currentScrollPosition > previousScrollPosition.current) {
            setScrollDriction('down');
        } else if (currentScrollPosition < previousScrollPosition.current) {
            setScrollDriction('up');
        }
        previousScrollPosition.current =
            currentScrollPosition <= 0 ? 0 : currentScrollPosition;
        setScrollPosition(currentScrollPosition);
    };

    const handleTranslateX = () => {
        if (scrollDriction === 'down' && scrollPosition >= 1700) {
            setTranslateXPosition(
                translateXPosition <= 0 ? 0 : translateXPosition - 1
            );
        } else if (scrollDriction === 'up') {
            setTranslateXPosition(
                translateXPosition >= 0 ? 30 : translateXPosition + 1
            );
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollTracking);

        return () => window.removeEventListener('scroll', scrollTracking);
    }, []);

    useEffect(() => {
        handleTranslateX();
    }, [scrollPosition]);

    return { translateXPosition };
};

export default useTranslateXImage;
