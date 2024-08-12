import { useState, useEffect } from "react";
import { Clock, X } from "lucide-react"; // Import X icon from lucide-react
import "./TimeZoneClock.css";

const TimeZoneClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeZone) => {
    return time.toLocaleTimeString("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const handleClose = () => {
    window.electron.ipcRenderer.send("close-window");
  };

  const timeZones = [
    { displayName: "Eastern Time", name: "ET", zone: "America/New_York" },
    { displayName: "Central Time", name: "CT", zone: "America/Chicago" },
    { displayName: "Mountain Time", name: "MT", zone: "America/Denver" },
    { displayName: "Arizona Time", name: "AZ", zone: "America/Phoenix" }, // Arizona Time
    { displayName: "Pacific Time", name: "PT", zone: "America/Los_Angeles" },
  ];

  return (
    <div className="timezone-clock draggable">
      <div className="header">
        <h4>TimeZone Clock</h4>
        <button className="close-button" onClick={handleClose}>
          <X />
        </button>
      </div>
      <div className="timezone-grid">
        {timeZones.map((tz) => (
          <div key={tz.name} className="timezone-item">
            <h3>{tz.displayName}</h3>
            <div className="timezone-time">
              <Clock />
              <span>{formatTime(tz.zone)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeZoneClock;
