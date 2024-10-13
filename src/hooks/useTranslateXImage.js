import useScrollHandling from '@hooks/useScrollHandling';
import { useEffect, useState } from 'react';
const useTranslateXImage = () => {
    const { scrollDriction, scrollPosition } = useScrollHandling();
    const [translateXPosition, setTranslateXPosition] = useState(30);

    const handleTranslateX = () => {
        if (scrollDriction === 'down' && scrollPosition >= 1600) {
            setTranslateXPosition(
                translateXPosition <= 0 ? 0 : translateXPosition - 1
            );
        } else if (scrollDriction === 'up' && scrollPosition <= 3200) {
            setTranslateXPosition(
                translateXPosition >= 0 ? 30 : translateXPosition + 1
            );
        }
    };

    useEffect(() => {
        handleTranslateX();
    }, [scrollPosition]);

    return { translateXPosition };
};

export default useTranslateXImage;
