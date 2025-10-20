import { RiArrowDownWideLine } from 'react-icons/ri';
import styles from '../styles.module.scss';
import { TfiLayoutLineSolid } from 'react-icons/tfi';
import cls from 'classnames'

function Products({orderDetails, formatPrice, isOpen, handleOpenProducts}) {
    return <div className={styles.orderProducts}>
   <div className={styles.title} onClick={handleOpenProducts}>
        <h5>{isOpen ? <RiArrowDownWideLine /> : <TfiLayoutLineSolid />} Danh sách sản phẩm</h5>
  </div>
  <div
        className={cls(styles.tableWrapper, {
          [styles.showList]: isOpen,
        })}
      >
<table className={styles.productTable}>
    <thead>
      <tr>
        <th>Hình ảnh</th>
        <th>Tên sản phẩm</th>
        <th>Màu sắc</th>
        <th>Kích thước</th>
        <th>Số lượng</th>
        <th>Giá</th>
      </tr>
    </thead>
    <tbody>
      {orderDetails?.map((item) => (
        <tr key={item.id}>
          <td>
            <img
              src={item.productDetail.product.images[0].url}
              alt={item.productDetail.product.images[0].filename}
              className={styles.productImage}
            />
          </td>
          <td>{item.productDetail.product.name}</td>
          <td>{item.productDetail.color.name}</td>
          <td>{item.productDetail.size.name}</td>
          <td>{item.quantity}</td>
          <td>{formatPrice(item.itemPrice)}</td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>
  
</div>;
}

export default Products;