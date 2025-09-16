import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import FormAboutUs from '@components/FormAboutUs/FormAboutUs';
import { createContact } from '@apis/contactService';
import { useContext } from 'react';
import { ToastContext } from '@contexts/ToastProvider';
import MyFooter from '@components/Footer/Footer';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

function Contact() {
    const { toast } = useContext(ToastContext);
    const handleCreateContact = body => {
        createContact(body)
            .then(res => {
                toast.success('Thank you for your message. It has been sent.');
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <>
            <Header />

            <MainLayout>
                <div className={styles.containerMap}>
                    <Breadcrumbs title={'Liên hệ'} />
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125402.9961243006!2d106.66547938906254!3d10.823276176801631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d9a42cd3aa19%3A0x43579a975fc1356!2zSOG7kyBixqFpIFNUT1dOIHwgSOG7jWMgQsahaSBVeSBUw61uIC0gSENN!5e0!3m2!1sen!2s!4v1740291429482!5m2!1sen!2s'
                        width='100%'
                        height='100%'
                        allowFullScreen
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                        title='Google Map'
                    ></iframe>
                </div>
                <FormAboutUs
                    isAboutUs
                    handleCreateContact={handleCreateContact}
                />
            </MainLayout>
            <MyFooter />
        </>
    );
}

export default Contact;
