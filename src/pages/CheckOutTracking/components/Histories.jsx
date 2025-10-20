import { RiArrowDownWideLine } from 'react-icons/ri';
import styles from '../styles.module.scss';
import { TfiLayoutLineSolid } from 'react-icons/tfi';

function Histories({isOpen, orderHistories, moment, handleOpenList}) {
    return <div className={styles.orderHistory}>
            <div className={styles.title} onClick={handleOpenList}>
              <h5>{isOpen ? <RiArrowDownWideLine /> : <TfiLayoutLineSolid />} Lịch sử trạng thái</h5>
            </div>
            <ul className={isOpen ? styles.showList : ''}>
              {orderHistories?.map((h, i) => (
                <li key={i}>
                  <span>
                    {moment(h.changedAt).format("DD-MM-YYYY, h:mm a")}
                  </span>{" "}
                  - <strong>{h.status}</strong> ({h.changedBy})
                </li>
              ))}
            </ul>
          </div>;
}

export default Histories;