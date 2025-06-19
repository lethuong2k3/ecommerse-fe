import styles from './styles.module.scss';
import { MdClose } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputCommon from '@components/InputCommon/InputCommon';
import Button from '@components/Button/Button';
import cls from 'classnames';
import { useEffect, useState } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { BiPhoneCall } from 'react-icons/bi';
import { WiTime9 } from 'react-icons/wi';
import { RiFacebookFill } from 'react-icons/ri';
import { FaPinterestP, FaTelegramPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const dataAboutUs = [
    {
        icon: <IoHomeOutline />,
        title: 'Địa chỉ',
        description:
            'Số 2A Đường Bình Chiểu, P. Bình Chiểu, Toà nhà STOWN, TP. Thủ Đức',
    },
    {
        icon: <BiPhoneCall />,
        title: 'Điện thoại',
        description: '0346.366.482',
    },
    {
        icon: <WiTime9 />,
        title: 'Giờ mở cửa',
        description: '6h - 20h',
    },
];

const dataIcon = [
    {
        icon: <RiFacebookFill />,
    },
    {
        icon: <FaPinterestP />,
    },
    {
        icon: <FaTelegramPlane />,
    },
    {
        icon: <FaXTwitter />,
    },
];

function FormAboutUs({
    isOpenAboutUs,
    handleCreateContact,
    handleHideContact,
    isAboutUs,
}) {
    const [saveInfo, setSaveInfo] = useState(false);
    useEffect(() => {
        const savedName = localStorage.getItem('name') || '';
        const savedEmail = localStorage.getItem('email') || '';
        if (savedName && savedEmail) {
            setSaveInfo(true);
        }
        formik.setValues({
            name: savedName,
            email: savedEmail,
            message: '',
        });
    }, []);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
            message: Yup.string().required('Message is required'),
        }),
        onSubmit: async values => {
            const { name, email, message } = values;
            if (saveInfo) {
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('name');
                localStorage.removeItem('email');
            }
            handleCreateContact({ name, email, message });
            formik.resetForm();
        },
    });
    return (
        <>
            <div className={styles.container}>
                <div className={cls({ [styles.overlay]: isOpenAboutUs })} />
                {(isOpenAboutUs || isAboutUs) && (
                    <div
                        className={cls(styles.formAboutUs, {
                            [styles.contactUs]: isAboutUs,
                        })}
                    >
                        <div className={styles.wrapperContent}>
                            <div className={styles.containerInfo}>
                                <h2 className={styles.title}>Thông tin</h2>
                                {dataAboutUs.map((item, index) => {
                                    return (
                                        <div
                                            className={styles.boxInfo}
                                            key={index}
                                        >
                                            <i>{item.icon}</i>
                                            <div className={styles.contentInfo}>
                                                <h3>{item.title}</h3>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className={styles.containerIcons}>
                                    {dataIcon.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={styles.iconInfo}
                                            >
                                                {item.icon}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className={styles.containerContact}>
                                <h2 className={styles.title}>
                                    Liên hệ với chúng tôi
                                </h2>
                                <p className={styles.desContact}>
                                    Nếu bạn có vấn đề gì cần trợ giúp thì gửi
                                    thông tin về cho chúng tôi.
                                </p>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className={styles.containerInput}>
                                        <InputCommon
                                            id='name'
                                            type='text'
                                            formik={formik}
                                            placeholder='Tên'
                                        />
                                        <InputCommon
                                            id='email'
                                            type='text'
                                            formik={formik}
                                            placeholder='Email'
                                        />
                                    </div>
                                    <InputCommon
                                        id='message'
                                        type='textarea'
                                        formik={formik}
                                        placeholder='Tin nhắn'
                                        rows={isAboutUs ? '8' : '6'}
                                    />
                                    <div className={styles.saveInfo}>
                                        <input
                                            id='saveInfo'
                                            type='checkbox'
                                            name='saveInfo'
                                            checked={saveInfo}
                                            onChange={() =>
                                                setSaveInfo(!saveInfo)
                                            }
                                        />
                                        <label htmlFor='saveInfo'>
                                            Ghi nhớ tên và email.
                                        </label>
                                    </div>
                                    <Button
                                        content={'Gửi'}
                                        style={{ width: '100%' }}
                                        type='submit'
                                    />
                                </form>
                            </div>
                        </div>
                        {!isAboutUs && (
                            <div
                                className={styles.boxIcon}
                                onClick={() => handleHideContact()}
                            >
                                <MdClose size={18} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default FormAboutUs;
