import { useEffect, useState } from 'react';
import style from './styles.module.scss';

const CountDownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(caculateTimeLeft());
    function caculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                Ngày: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Tiếng: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Phút: Math.floor((difference / 1000 / 60) % 60),
                Giây: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(caculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const formatNumber = number => {
        return String(number).padStart(2, '0');
    };

    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (timeLeft[interval] !== undefined) {
            timerComponents.push(
                <span key={interval} className={style.box}>
                    {formatNumber(timeLeft[interval])}{' '}
                    <span className={style.title}>{interval}</span>{' '}
                </span>
            );
        }
    });

    return timerComponents;
};

export default CountDownTimer;
