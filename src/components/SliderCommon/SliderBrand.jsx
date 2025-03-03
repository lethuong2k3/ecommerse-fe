import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import './styles.css';

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <MdOutlineArrowForwardIos
            style={{ right: '-50px' }}
            className={className}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <MdOutlineArrowBackIosNew
            style={{ left: '-50px' }}
            className={className}
            onClick={onClick}
        />
    );
}

function SliderBrand({ data }) {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <Slider {...settings}>
            {data.map(item => {
                return (
                    <div className='boxItem' key={item.id}>
                        <img
                            key={item.id}
                            src={item.imageUrl}
                            alt={item.name}
                        />
                    </div>
                );
            })}
        </Slider>
    );
}

export default SliderBrand;
