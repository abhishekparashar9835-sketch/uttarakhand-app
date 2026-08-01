import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService";

function BookYatra() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const place = params.get("place") || "";

  const [formData, setFormData] = useState({
    yatraName: place,
    travelDate: "",
    travellers: 1,
    phone: "",
    amount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await bookingService.createBooking(formData);

      setSuccess(response.message);
      setBookingId(response.booking.bookingId);

      setTimeout(() => {
        navigate("/my-bookings");
      }, 2000);

    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message || "Booking Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4fbf7] py-12 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-[#1b3d2b] mb-8">
          Book Your Yatra
        </h1>

        {success && (
          <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg mb-6">
            <h3 className="font-bold">{success}</h3>

            <p className="mt-2">
              Booking ID :
              <span className="font-bold ml-2">
                {bookingId}
              </span>
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block font-semibold mb-2">
              Yatra Name
            </label>

            <input
              type="text"
              name="yatraName"
              value={formData.yatraName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              readOnly
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Travel Date
            </label>

            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Number of Travellers
            </label>

            <input
              type="number"
              min="1"
              name="travellers"
              value={formData.travellers}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Mobile Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1b3d2b] hover:bg-[#14532d] text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default BookYatra;