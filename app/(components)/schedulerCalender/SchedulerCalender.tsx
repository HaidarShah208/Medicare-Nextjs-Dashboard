import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Appointment',
    start: new Date(2024, 3, 15), 
    end: new Date(2024, 3, 15) 
  },
  {
    title: 'Appointment',
    start: new Date(2024, 3, 20), 
    end: new Date(2024, 3, 22) 
  }
];

const CalendarChart = () => {
  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date(2024, 3, 1)}  
      />
    </div>
  );
};

export default CalendarChart;
