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
    var settings = {
        speed: 500,
        slidesToShow: isProductItem ? 4 : 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        infinite: false,
        responsive: [
            ...(isProductItem
                ? [
                      {
                          breakpoint: 1025,
                          settings: {
                              slidesToShow: 3,
                          },
                      },
                      {
                          breakpoint: 739,
                          settings: {
                              slidesToShow: 2,
                          },
                      },
                  ]
                : []),
        ],
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
                    <div>
                        <img
                            key={index}
                            style={{ width: '100%' }}
                            src={item.url}
                            alt={item.filename}
                        />
                    </div>
                )
            )}
        </Slider>
    );
}

export default SliderCommon;
