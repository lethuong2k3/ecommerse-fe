const useOrderStatus = value => {
    switch (value) {
        case 'PENDING':
            return 'Chờ xử lý';
        case 'WAITING':
            return 'Chờ xác nhận';
        case 'EXPIRED':
            return 'Hết hạn';
        case 'PAID':
            return 'Đã thanh toán';
        case 'SHIPPED':
            return 'Đang giao hàng';
        case 'DELIVERED':
            return 'Đã giao hàng';
        default:
            return 'Đã huỷ';
    }
};

export default useOrderStatus;
