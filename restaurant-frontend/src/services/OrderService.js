import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/api/order";

class OrderService {

    createOrder(orderRequest) {
        return axios.post(
            `${ORDER_API_BASE_URL}/save`,
            orderRequest
        );
    }

    getCustomerOrders(customerId) {
        return axios.get(
            `${ORDER_API_BASE_URL}/customer/${customerId}`
        );
    }

    getAllOrders() {
        return axios.get(
            `${ORDER_API_BASE_URL}/all-orders`
        );
    }

    updateOrderStatus(orderId, status) {
        return axios.put(
            `${ORDER_API_BASE_URL}/${orderId}/status?status=${status}`
        );
    }
}

export default new OrderService();