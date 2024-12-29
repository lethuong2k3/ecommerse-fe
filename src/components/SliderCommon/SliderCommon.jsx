import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import './styles.css';

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <MdOutlineArrowForwardIos className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <MdOutlineArrowBackIosNew className={className} onClick={onClick} />;
}

function SliderCommon({ data }) {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <Slider {...settings}>
            {data.map((item, index) => {
                return <img key={index} src={item.url} alt={item.filename} />;
            })}
        </Slider>
    );
}

export default SliderCommon;
