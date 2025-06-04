import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { getBrands } from '@apis/brandService';
import Loading from '@components/Loading/Loading';
import SliderBrand from '@components/SliderCommon/SliderBrand';
import AccordionMenu from '@components/AccordionMenu';
import MyFooter from '@components/Footer/Footer';

function AboutUs() {
    const [isLoading, setIsLoading] = useState(false);
    const [brands, setBrands] = useState([]);
    const [menuSelected, setMenuSelected] = useState(1);
    const [showItems, setShowItems] = useState(4);

    const handleSetMenuSelected = id => {
        if (menuSelected === id) {
            setMenuSelected(0);
            return;
        }
        setMenuSelected(id);
    };
    const dataAccordionMenu = [
        {
            id: 1,
            titleMenu: 'Làm thế nào để đặt hàng trên website??',
            content:
                'Bạn chỉ cần chọn sản phẩm muốn mua, chọn size và số lượng, sau đó nhấn "Thêm vào giỏ hàng" và tiến hành thanh toán theo hướng dẫn.',
        },
        {
            id: 2,
            titleMenu: 'Tôi có thể thanh toán bằng những hình thức nào?',
            content:
                'Chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng, ví điện tử (MoMo, VNPAY), và COD (thanh toán khi nhận hàng).',
        },
        {
            id: 3,
            titleMenu: 'Thời gian giao hàng mất bao lâu?',
            content:
                'Thời gian giao hàng dao động từ 2–5 ngày làm việc tùy khu vực. Đơn nội thành thường nhận trong 1–2 ngày.',
        },
        {
            id: 4,
            titleMenu: 'Tôi có được đổi hoặc trả hàng không??',
            content:
                ' Có. Bạn có thể đổi/trả sản phẩm trong vòng 7 ngày nếu sản phẩm còn nguyên tem, chưa qua sử dụng và có lỗi do nhà sản xuất.',
        },
        {
            id: 5,
            titleMenu: 'Làm sao để chọn đúng size quần áo?',
            content:
                'Mỗi sản phẩm đều có bảng hướng dẫn chọn size chi tiết. Nếu cần tư vấn thêm, bạn có thể liên hệ với đội ngũ chăm sóc khách hàng của chúng tôi.',
        },
        {
            id: 6,
            titleMenu: 'Tôi nhận mã giảm giá bằng cách nào?',
            content:
                'Đăng ký nhận bản tin hoặc theo dõi fanpage để nhận mã khuyến mãi, ưu đãi độc quyền và thông tin giảm giá sớm nhất.',
        },
    ];

    useEffect(() => {
        setIsLoading(true);
        getBrands()
            .then(res => {
                setBrands(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setShowItems(5);
            } else if (window.innerWidth >= 768) {
                setShowItems(4);
            } else {
                setShowItems(1);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Header />
            <MainLayout>
                <div className={styles.container}>
                    <Breadcrumbs title={'Giới thiệu'} />
                    <section className={styles.header}>
                        <span>chúng tôi cố gắng hết mình vì bạn</span>
                        <h2>Chào mừng đến với Fpoly Clothes</h2>
                    </section>
                    <section className={styles.containerContent}>
                        <div className={styles.boxContent}>
                            <div className={styles.boxImg}>
                                <img src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-min.jpg' />
                            </div>
                            <p>
                                Sản phẩm được may từ chất liệu vải bằng máy vắt
                                sổ công nghiệp, đảm bảo đường may chắc chắn,
                                tinh tế và chống tưa chỉ. Thiết kế tỉ mỉ, phù
                                hợp cho các sản phẩm thời trang hoặc may mặc
                                chất lượng cao.
                            </p>
                        </div>
                        <div className={styles.boxContent}>
                            <div className={styles.boxImg}>
                                <img src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-copy-2-min.jpg' />
                            </div>
                            <p>
                                Sản phẩm may mặc làm từ chất liệu vải nỉ mềm
                                mại, dày dặn, giữ ấm tốt. Thiết kế bo chun ở gấu
                                áo giúp ôm dáng và tạo cảm giác thoải mái khi
                                mặc. Đường may chắc chắn, phù hợp cho thời trang
                                thu đông hoặc mặc hàng ngày.
                            </p>
                        </div>
                        <div className={styles.boxContent}>
                            <div className={styles.boxImg}>
                                <img src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-copy-min.jpg' />
                            </div>
                            <p>
                                Dụng cụ may mặc gồm máy may công nghiệp và thước
                                dây đo kích thước, hỗ trợ đo vải và tạo đường
                                may chính xác. Phù hợp trong sản xuất quần áo,
                                may đo thủ công hoặc xưởng thời trang chuyên
                                nghiệp.
                            </p>
                        </div>
                    </section>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <div className={styles.sliderBrands}>
                            <SliderBrand data={brands} size={showItems} />
                        </div>
                    )}
                    <section
                        className={styles.header}
                        style={{ padding: '30px 15px 0px 15px' }}
                    >
                        <span>Chúng tôi rất vui khi được giúp đỡ bạn</span>
                        <h2>Các câu hỏi thường gặp?</h2>
                    </section>
                    <section className={styles.containerQuestions}>
                        {dataAccordionMenu.map(item => {
                            return (
                                <AccordionMenu
                                    key={item.id}
                                    titleMenu={item.titleMenu}
                                    contentJsx={item.content}
                                    onClick={() =>
                                        handleSetMenuSelected(item.id)
                                    }
                                    isSelected={menuSelected === item.id}
                                    isAboutUs
                                />
                            );
                        })}
                    </section>
                </div>
            </MainLayout>
            <MyFooter />
        </>
    );
}

export default AboutUs;
