import API from "../api/api";

class UserService {

    async createUser(userData) {
        try {
            const response = await API.post("/users", userData);
            return response.data;
        } catch (error) {
            console.log("UserService :: createUser ::", error);
            throw error;
        }
    }

    async updateUser(id, userData) {
        try {
            const response = await API.put(`/users/${id}`, userData);
            return response.data;
        } catch (error) {
            console.log("UserService :: updateUser ::", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await API.get("/auth/profile");
            return response.data.user;
        } catch (error) {
            console.log("UserService :: getCurrentUser ::", error);
            throw error;
        }
    }
}

export default new UserService();