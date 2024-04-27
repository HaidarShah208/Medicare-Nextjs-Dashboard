import React from 'react';
import  Calendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MyCalendar = () => {
  return (
    <div>
      <Calendar
        plugins={[dayGridPlugin]}
        selectable={true}
        selectMirror={true}
        
        initialView="dayGridMonth"
        events={[
          { title: 'Event 1', date: '2024-03-27' },
          { title: 'Event 2', date: '2024-03-28' },
        ]}
      />
    </div>
  );
};

export default MyCalendar;
