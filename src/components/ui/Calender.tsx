//import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  
  return (
    <div className="h-[250px] p-2 bg-white ">
      <Calendar
        localizer={localizer}
        events={[]}
        toolbar={true} // Hide navigation toolbar
        views={["month"]} // Only show month view
        selectable={true} // Disable clicking
        popup={true} // No popups
        style={{ height: 250 }}
      />
    </div>
  );
};

export default MyCalendar;
