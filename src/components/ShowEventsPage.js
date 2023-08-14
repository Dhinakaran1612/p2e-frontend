import React, { useState } from "react";
import axios from "axios";
import { GETEVENTS } from "../API";

function ShowEventsPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(GETEVENTS, {
        params: {
          startDate,
          endDate,
        },
      });
      setEvents(response?.data?.list ?? []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div>
      <h2>Show Events</h2>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={fetchEvents}>Fetch Events</button>
      <div>
        <h3>Events:</h3>
        <ul>
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event._id}>
                Date:{" "}
                <b>
                  <i>{event.dateTime}</i>
                </b>
                , Duration:{" "}
                <b>
                  <i>{event.duration}</i>
                </b>{" "}
                minutes
              </li>
            ))
          ) : (
            <p>No Data Found!</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ShowEventsPage;
