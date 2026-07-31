import API from "../api/api";

class AuthService {
  async createAccount(data) {
    const response = await API.post("/auth/register", data);

    return response.data;
  }

  async login(data) {
    const response = await API.post("/auth/login", data);

    return response.data;
  }

  async getCurrentUser() {
    const response = await API.get("/auth/profile");

    return response.data.user;
  }

  logout() {
    localStorage.removeItem("token");
    return Promise.resolve();
}
}

export default new AuthService();