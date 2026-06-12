import axios from "axios";

const API_URL = "http://localhost:8080/api/menu";

class MenuService {

    getAllMenuItems() {
        return axios.get(API_URL);
    }

    getMenuItemById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    getAllMenuItems() {
        return axios.get(API_URL);
    }

    getMenuItemById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    getAllCategories() {
        return axios.get(`${API_URL}/all-categories`);
    }

    getMenuItemsByCategory(category) {
        return axios.get(`${API_URL}/category/${category}`);
    }
}

export default new MenuService();