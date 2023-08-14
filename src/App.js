import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import BookEventPage from "./components/BookEventPage";
import ShowEventsPage from "./components/ShowEventsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/book-event">Book Event</Link>
            </li>
            <li>
              <Link to="/show-events">Show Events</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/book-event" element={<BookEventPage />} />
          <Route path="/show-events" element={<ShowEventsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
