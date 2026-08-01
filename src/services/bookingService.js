import API from "../api/api";

class BookingService {
  async createBooking(data) {
    const response = await API.post("/bookings", data);
    return response.data;
  }

  async getMyBookings() {
    const response = await API.get("/bookings/my");
    return response.data.bookings;
  }

  async cancelBooking(id) {
    const response = await API.put(`/bookings/${id}/cancel`);
    return response.data;
  }

  async getAllBookings() {
    const response = await API.get("/bookings");
    return response.data.bookings;
  }
}

export default new BookingService();