import Header from '@components/Header/Header';
import PageHeader from '@components/PageHeader/PageHeader';
import styles from './styles.module.scss';
import WishListTable from '@pages/WishList/components/contents/WishListTable';
import MainLayout from '@components/Layout/Layout';
import Cookies from 'js-cookie';
import MyFooter from '@components/Footer/Footer';
import Button from '@components/Button/Button';
import EmptyItem from '@components/EmptyItem/EmptyItem';

import { useContext, useState } from 'react';
import { SidebarContext } from '@contexts/SideBarProvider';
import { useNavigate } from 'react-router-dom';
import { deleteWishList, removeAllWishList } from '@apis/wishlist';
import { BsHeart } from 'react-icons/bs';
import { CiMail } from 'react-icons/ci';
import { FaRegTrashCan, FaXTwitter } from 'react-icons/fa6';
import { ToastContext } from '@contexts/ToastProvider';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { IoWarningOutline } from 'react-icons/io5';
import FormAboutUs from '@components/FormAboutUs/FormAboutUs';
import { IoHomeOutline } from 'react-icons/io5';
import { BiPhoneCall } from 'react-icons/bi';
import { WiTime9 } from 'react-icons/wi';
import { RiFacebookFill } from 'react-icons/ri';
import { FaPinterestP, FaTelegramPlane } from 'react-icons/fa';
import { createContact } from '@apis/contact';

const dataAboutUs = [
    {
        icon: <IoHomeOutline size={30} />,
        title: 'Address',
        description: '7895 Piermont Dr NE Albuquerque, NM 198866',
    },
    {
        icon: <BiPhoneCall size={30} />,
        title: 'Phones',
        description: '+391 (0)35 2568 4593 hello@domain.com',
    },
    {
        icon: <WiTime9 size={20} style={{ marginTop: '5px' }} />,
        title: "We're Open",
        description: 'Every day 11am to 7pm',
    },
];

const dataIcon = [
    {
        icon: <RiFacebookFill size={20} />,
    },
    {
        icon: <FaPinterestP size={20} />,
    },
    {
        icon: <FaTelegramPlane size={20} />,
    },
    {
        icon: <FaXTwitter size={20} />,
    },
];

function WishList() {
    const { listWList, setIsOpen, setType, setProduct, handleGetListWishList } =
        useContext(SidebarContext);
    const { toast } = useContext(ToastContext);
    const userId = Cookies.get('id');
    const [selected, setSelected] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isOpenAboutUs, setIsOpenAboutUs] = useState(false);
    const navigate = useNavigate();

    const getPriceRange = obj => {
        const prices = obj.map(product => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        if (minPrice === maxPrice) return <>${maxPrice}</>;
        return (
            <>
                ${minPrice} - ${maxPrice}
            </>
        );
    };

    const acceptRemove = () => {
        console.log(selected);
        removeAllWishList(selected)
            .then(res => {
                setSelected([]);
                handleGetListWishList(userId);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleNavigateToShop = () => {
        navigate('/shop');
    };

    const handleShowDetailProduct = item => {
        setProduct(item);
        setIsOpen(true);
        setType('detail');
    };

    const handleNavigateToDetail = id => {
        const path = `/product/${id}`;
        navigate(path);
    };

    const handleRemove = id => {
        deleteWishList(id)
            .then(res => {
                handleGetListWishList(userId);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleRemoveAll = () => {
        if (!selected.length) {
            toast.warning('Please, choose any product by clicking checkbox');
            return;
        }
        setVisible(true);
    };

    const handleSelect = (value, name) => {
        if (value) {
            setSelected([...selected, name]);
        } else {
            setSelected(selected.filter(item => item !== name));
        }
    };

    const handleSelectAll = value => {
        if (value) {
            setSelected(listWList);
        } else {
            setSelected([]);
        }
    };

    const handleCreateContact = body => {
        createContact(body)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleHideContact = () => {
        setIsOpenAboutUs(false);
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <PageHeader icon={<BsHeart size={17} />} title={'WISHLIST'} />
                {listWList.length ? (
                    <>
                        <MainLayout>
                            <WishListTable
                                wishlist={listWList}
                                showDetail={handleShowDetailProduct}
                                navigateDetail={handleNavigateToDetail}
                                remove={handleRemove}
                                handleSelect={handleSelect}
                                handleSelectAll={handleSelectAll}
                                handleNavigateToDetail={handleNavigateToDetail}
                                selected={selected}
                                getPriceRange={getPriceRange}
                            />
                            <div className={styles.formActions}>
                                <Button
                                    content={
                                        <>
                                            <FaRegTrashCan /> CLEAR WISHLIST
                                        </>
                                    }
                                    onClick={() => handleRemoveAll()}
                                />
                                <Button
                                    content={
                                        <>
                                            <CiMail /> Ask for an estimate
                                        </>
                                    }
                                    onClick={() => setIsOpenAboutUs(true)}
                                    isPrimary={false}
                                />
                            </div>
                        </MainLayout>
                        <ConfirmDialog
                            group='declarative'
                            visible={visible}
                            onHide={() => setVisible(false)}
                            message='Are you sure you want to proceed?'
                            header='Confirmation'
                            style={{ width: '50vw' }}
                            breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
                            icon={<IoWarningOutline size={30} />}
                            accept={acceptRemove}
                        />
                    </>
                ) : (
                    <EmptyItem
                        icon={<BsHeart size={40} />}
                        handleNavigateToShop={handleNavigateToShop}
                        title={'WISHLIST'}
                    />
                )}
            </div>
            <FormAboutUs
                data={dataAboutUs}
                icons={dataIcon}
                handleCreateContact={handleCreateContact}
                isOpenAboutUs={isOpenAboutUs}
                handleHideContact={handleHideContact}
            />
            <MyFooter />
        </>
    );
}

export default WishList;
