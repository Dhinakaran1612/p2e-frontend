import React, { useState } from "react";
import axios from "axios";
import { CREATEEVENTS, FREESLOTS } from "../API";

function BookEventPage() {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [timeZone, setTimeZone] = useState("America/Los_Angeles");
  const [freeSlots, setFreeSlots] = useState([]);
  const [message, setMessage] = useState("");

  const fetchFreeSlots = async () => {
    try {
      const response = await axios.get(FREESLOTS, {
        params: {
          date,
          timeZone,
        },
      });
      console.log("response?.data?.list", response?.data?.list);
      setFreeSlots(response?.data?.list ?? []);
      setMessage("");
    } catch (error) {
      console.error("Error fetching free slots:", error);
      setMessage("Error fetching free slots.");
    }
  };

  const bookEvent = async (selectedSlot) => {
    try {
      await axios.post(CREATEEVENTS, {
        dateTime: selectedSlot,
        duration: parseInt(duration),
      });
      setMessage("Event booked successfully.");
    } catch (error) {
      console.error("Error booking event:", error);
      setMessage("Error booking event.");
    }
  };

  if (message) {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }

  return (
    <div>
      <h2>Book Event</h2>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div>
        <label>Time Zone:</label>
        <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
          <option value="America/Los_Angeles">America/Los_Angeles</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Tokyo">Asia/Tokyo</option>
          <option value="Australia/Sydney">Australia/Sydney</option>
          <option value="Asia/Kolkata">Asia/Kolkata</option>
        </select>
      </div>
      <button onClick={fetchFreeSlots}>Get Free Slots</button>
      <p>{message}</p>
      {freeSlots.length > 0 && (
        <div>
          <h3>Available Slots:</h3>
          <ul>
            {freeSlots.map((slot) => (
              <li key={slot}>
                <button onClick={() => bookEvent(slot)}>{slot}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookEventPage;
