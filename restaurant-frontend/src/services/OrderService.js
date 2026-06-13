import axios from "axios";

const BASE_URL = "http://localhost:8080/api/orders";

export const createOrder = (orderData) => {
    return axios.post(BASE_URL, orderData);
};