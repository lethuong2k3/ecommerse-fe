import React, { useCallback, useContext, useEffect, useReducer } from "react";
import styles from "./styles.module.scss";
import { getOrderDetails, cancelOrder } from "@apis/orderService";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "@hooks/useFomatPrice";
import {
  FcCancel,
  FcExpired,
  FcAcceptDatabase,
  FcMoneyTransfer,
  FcShipped,
  FcOk,
  FcInTransit,
} from "react-icons/fc";
import moment from "moment";
import Header from "@components/Header/Header";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import MainLayout from "@components/Layout/Layout";
import Histories from "@pages/CheckOutTracking/components/Histories";
import Products from "@pages/CheckOutTracking/components/Products";
import Button from "@components/Button/Button";
import MyFooter from "@components/Footer/Footer";
import { ToastContext } from "@contexts/ToastProvider";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { IoWarningOutline } from "react-icons/io5";
import LoadMore from "@components/Loading/LoadMore";

function CheckOutDetails() {
  const initialState = {
    orderDetails: [],
    isLoadingOrder: false,
    currentIndex: null,
    steps: [],
    isOpenHistory: true,
    isOpenProducts: true,
    isLoadingCancel: false,
    visible: false
  };

  function reducer(state, action) {
    return { ...state, [action.type]: action.payload };
  }

  const {toast} = useContext(ToastContext);

  const [state, dispatch] = useReducer(reducer, initialState);
  const param = useParams();
  const navigate = useNavigate();
 const loadOrderDetails = useCallback(() => {
    dispatch({ type: "isLoadingOrder", payload: true });

    getOrderDetails(param.orderCode)
      .then((res) => {
        const status = res.data.orderStatus;

        let dynamicSteps = [
          { key: "WAITING", label: "Chờ xử lý", icon: <FcAcceptDatabase /> },
          {
            key: status === "PENDING" ? "PENDING" : "PAID",
            label: status === "PENDING" ? "Thanh toán COD" : "Đã thanh toán",
            icon: <FcMoneyTransfer />,
          },
          {
            key: status === "READY_TO_SHIP" ? "READY_TO_SHIP" : "SHIPPED",
            label: status === "SHIPPED" ? "Đang giao hàng" : "Chờ lấy hàng",
            icon: status === "SHIPPED" ? <FcShipped /> : <FcInTransit />,
          },
          { key: "DELIVERED", label: "Hoàn tất", icon: <FcOk /> },
        ];

        if (status === "CANCELLED") {
          dynamicSteps[0] = { key: "CANCELLED", label: "Đã hủy", icon: <FcCancel /> };
        }
        if (status === "EXPIRED") {
          dynamicSteps[0] = { key: "EXPIRED", label: "Hết hạn", icon: <FcExpired /> };
        }

        dispatch({ type: "steps", payload: dynamicSteps });
        dispatch({ type: "orderDetails", payload: res.data });
        dispatch({
          type: "currentIndex",
          payload: dynamicSteps.findIndex((s) => s.key === status),
        });
      })
      .catch((err) => {
        console.log(err);
        navigate("/danh-sach-don-hang");
      }).finally(() => {
        dispatch({ type: "isLoadingOrder", payload: false });
      });
  }, [param.orderCode, dispatch, navigate]);

  useEffect(() => {
    loadOrderDetails();
  }, [loadOrderDetails]);

  const handleCancelOrder = useCallback(() => {
    if (state.isLoadingCancel) return;
    dispatch({ type: "isLoadingCancel", payload: true });

    cancelOrder(state.orderDetails.orderCode)
      .then((res) => {
        dispatch({ type: "isLoadingCancel", payload: false });
        toast.success(res.data);
        loadOrderDetails(); 
      })
      .catch((err) => {
        dispatch({ type: "isLoadingCancel", payload: false });
        console.log(err);
      });
  }, [state.isLoadingCancel, state.orderDetails.orderCode, dispatch, loadOrderDetails]);

  const handleOpenList = () => {
    dispatch({ type: "isOpenHistory", payload: !state.isOpenHistory });
  }

  const handleOpenProducts = () => {
    dispatch({ type: "isOpenProducts", payload: !state.isOpenProducts });
  }

  const handleShowBtn = () => {
    if (state.orderDetails.orderStatus === "PENDING" || state.orderDetails.orderStatus === "WAITING") {
      return  <Button content={'Hủy đơn hàng'} onClick={handleSetVisible} />
    }
  }

  const handleSetVisible = () => {
    dispatch({ type: "visible", payload: !state.visible })
  }
  return (
    <>
    <Header />
    <MainLayout>
       <div className={styles.orderDetail}>
        <Breadcrumbs  items={[
            { label: "Trang chủ", path: "/" },
            { label: "Danh sách đơn hàng", path: "/danh-sach-don-hang" },
            { label: '#' + state.isLoadingOrder && state.orderDetails?.orderCode }
        ]}/>
        <div className={styles.containerDetail}>
            {state.isLoadingOrder && <div className={styles.overlayLoading}>
                <LoadMore />
            </div>}
            <div className={styles.orderCard}>
              <div>
                <h5>Đơn hàng #{state.orderDetails.orderCode}</h5>
                <p>
                  Ngày đặt:{" "}
                  {!state.isLoadingOrder && moment(state.orderDetails.orderDate).format("DD-MM-YYYY, h:mm a")}
                </p>
                <p>Phương thức: {state.orderDetails.payment?.paymentType.value}</p>
                <p>Tổng tiền: {formatPrice(state.orderDetails.totalAmount)}</p>
              </div>
              <div>
                <h5>Thông tin giao hàng</h5>
                <p>Họ và tên: {!state.isLoadingOrder && `${state.orderDetails.shipment?.firstName} ${state.orderDetails.shipment?.lastName}`}</p>
                <p>Địa chỉ: {state.orderDetails.shipment?.address}</p>
                <p>Số điện thoại: {state.orderDetails.shipment?.phone}</p>
                <p>Email: {state.orderDetails.shipment?.email}</p>
              </div>
          </div>

        <div className={styles.orderTimeline}>
          {state.steps.map((step, index) => {
            let stepClass = styles.step;
            if (index < state.currentIndex) stepClass += " " + styles.completed;
            if (index === state.currentIndex) stepClass += " " + styles.active;

            return (
              <div key={step.key} className={stepClass}>
                <div className={styles.icon}>{step.icon}</div>
                <p>{step.label}</p>
              </div>
            );
          })}
        </div>

        {/* Lịch sử trạng thái */}
        <Histories 
          isOpen={state.isOpenHistory} 
          orderHistories={state.orderDetails.orderHistories} 
          moment={moment}
          handleOpenList={handleOpenList}
        />
        <Products 
          orderDetails={state.orderDetails.orderItems} 
          formatPrice={formatPrice} 
          isOpen={state.isOpenProducts}
          handleOpenProducts={handleOpenProducts}
        />
        <ConfirmDialog
          group='declarative'
          visible={state.visible}
          onHide={() => handleSetVisible()}
          message='Bạn có chắc muốn hủy đơn hàng?'
          header='Xác nhận'
          style={{ width: '50vw' }}
          breakpoints={{
            '1100px': '75vw',
            '960px': '100vw',
          }}
          icon={<IoWarningOutline size={30} />}
          accept={handleCancelOrder}
        />
        <div className={styles.btn}>
            {handleShowBtn()}
        </div>
        </div>
    </div>
    </MainLayout>
    <MyFooter />
    </>
  );
}

export default CheckOutDetails;
