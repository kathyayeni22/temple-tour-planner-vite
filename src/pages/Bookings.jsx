import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ temple: "", date: "" });
  const [editMode, setEditMode] = useState(null);
  const [editedBooking, setEditedBooking] = useState({});

  const bookingsRef = collection(db, "bookings");

  // Fetch bookings from Firestore
  const fetchBookings = async () => {
    const snapshot = await getDocs(bookingsRef);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Add new booking
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newBooking.temple || !newBooking.date) return;
    await addDoc(bookingsRef, newBooking);
    setNewBooking({ temple: "", date: "" });
    fetchBookings();
  };

  // Delete a booking
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
    fetchBookings();
  };

  // Start editing
  const handleEdit = (booking) => {
    setEditMode(booking.id);
    setEditedBooking({ ...booking });
  };

  // Save edited booking
  const handleSave = async () => {
    const docRef = doc(db, "bookings", editMode);
    await updateDoc(docRef, editedBooking);
    setEditMode(null);
    fetchBookings();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>📜 My Bookings</h2>

      {/* New Booking Form */}
      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Temple Name"
          value={newBooking.temple}
          onChange={(e) => setNewBooking({ ...newBooking, temple: e.target.value })}
          required
        />
        <input
          type="date"
          value={newBooking.date}
          onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
          required
        />
        <button type="submit">Add Booking</button>
      </form>

      {/* Existing Bookings List */}
      {bookings.map((booking) => (
        <div
          key={booking.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
          }}
        >
          {editMode === booking.id ? (
            <>
              <input
                type="text"
                value={editedBooking.temple}
                onChange={(e) =>
                  setEditedBooking({ ...editedBooking, temple: e.target.value })
                }
              />
              <input
                type="date"
                value={editedBooking.date}
                onChange={(e) =>
                  setEditedBooking({ ...editedBooking, date: e.target.value })
                }
              />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p><strong>Temple:</strong> {booking.temple}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <button onClick={() => handleEdit(booking)}>Edit</button>
              <button onClick={() => handleDelete(booking.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Bookings;
