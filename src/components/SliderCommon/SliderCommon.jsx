import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import './styles.css';
import ProductItem from '@components/ProductItem/ProductItem';

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <MdOutlineArrowForwardIos className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <MdOutlineArrowBackIosNew className={className} onClick={onClick} />;
}

function SliderCommon({ data, isProductItem = false, showItem = 1 }) {
    const isInfinite = data.length > showItem;

    var settings = {
        infinite: isInfinite,
        speed: 500,
        slidesToShow: Math.min(showItem, data.length),
        slidesToScroll: 1,
        nextArrow: data.length > 1 ? <SampleNextArrow /> : null,
        prevArrow: data.length > 1 ? <SamplePrevArrow /> : null,
    };

    return (
        <Slider {...settings}>
            {data.map((item, index) =>
                isProductItem ? (
                    <ProductItem
                        src={item.images[0]?.url}
                        prevSrc={item.images[1]?.url}
                        name={item.name}
                        item={item}
                        isHomePage={false}
                        slideItem
                        key={index}
                        isRelatedProducts
                    />
                ) : (
                    <img key={index} src={item.url} alt={item.filename} />
                )
            )}
        </Slider>
    );
}

export default SliderCommon;
