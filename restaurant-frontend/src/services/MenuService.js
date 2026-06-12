import axios from "axios";

const API_URL = "http://localhost:8080/api/menu";

class MenuService {

    getAllMenuItems() {
        return axios.get(API_URL);
    }

    getMenuItemById(id) {
        return axios.get(`${API_URL}/${id}`);
    }
}

export default new MenuService();