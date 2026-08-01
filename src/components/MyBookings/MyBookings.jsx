import React, { useEffect, useState } from "react";
import bookingService from "../../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await bookingService.cancelBooking(id);

      fetchBookings();

      alert("Booking Cancelled Successfully");
    } catch (error) {
      console.error(error);
      alert("Unable to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4fbf7] py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-[#1b3d2b] mb-10">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            <h2 className="text-2xl font-semibold">
              No Bookings Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Book your first yatra from the Places page.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between"
              >

                <div className="space-y-2">

                  <h2 className="text-2xl font-bold text-[#1b3d2b]">
                    {booking.yatraName}
                  </h2>

                  <p>
                    <strong>Booking ID:</strong> {booking.bookingId}
                  </p>

                  <p>
                    <strong>Travel Date:</strong>{" "}
                    {new Date(booking.travelDate).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Travellers:</strong> {booking.travellers}
                  </p>

                  <p>
                    <strong>Phone:</strong> {booking.phone}
                  </p>

                  <p>
                    <strong>Amount:</strong> ₹{booking.amount}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        booking.status === "Confirmed"
                          ? "text-green-600"
                          : booking.status === "Cancelled"
                          ? "text-red-600"
                          : "text-orange-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>

                </div>

                {booking.status !== "Cancelled" && (
                  <div className="mt-5 md:mt-0">
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyBookings;