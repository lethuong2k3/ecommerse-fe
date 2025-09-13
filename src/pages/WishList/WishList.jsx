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
import { deleteWishList, removeAllWishList } from '@apis/wishlistService';
import { BsHeart } from 'react-icons/bs';
import { CiMail } from 'react-icons/ci';
import { FaRegTrashCan, FaXTwitter } from 'react-icons/fa6';
import { ToastContext } from '@contexts/ToastProvider';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { IoWarningOutline } from 'react-icons/io5';
import FormAboutUs from '@components/FormAboutUs/FormAboutUs';
import { createContact } from '@apis/contactService';
import { getPriceRange } from '@hooks/useFomatPrice';

function WishList() {
    const { listWList, setIsOpen, setType, setProduct, handleGetListWishList } =
        useContext(SidebarContext);
    const { toast } = useContext(ToastContext);
    const userId = Cookies.get('id');
    const [selected, setSelected] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isOpenAboutUs, setIsOpenAboutUs] = useState(false);
    const navigate = useNavigate();

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
                toast.success('Thank you for your message. It has been sent.');
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
                <PageHeader icon={<BsHeart size={17} />} title={'YÊU THÍCH'} />
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
                                            <FaRegTrashCan /> Xóa tất cả
                                        </>
                                    }
                                    onClick={() => handleRemoveAll()}
                                />
                                <Button
                                    content={
                                        <>
                                            <CiMail /> Liên hệ
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
                            message='Bạn có chắc muốn xóa không?'
                            header='Xác nhận'
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
                handleCreateContact={handleCreateContact}
                isOpenAboutUs={isOpenAboutUs}
                handleHideContact={handleHideContact}
            />
            <MyFooter />
        </>
    );
}

export default WishList;
