import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Image from 'next/image';
import { SCHEDUALE } from '@/app/constant/assets/allAssets';

const localizer = momentLocalizer(moment);

 

const CalendarChart = ({appointments}:any) => {
  const events = appointments.map((appointment: { dateTime: string | number | Date; duration: moment.DurationInputArg1; }) => ({
    title: 'pending',
    start: new Date(appointment.dateTime),
    end: moment(new Date(appointment.dateTime)).add(appointment.duration, 'minutes').toDate(),
    appointmentData: appointment 
  }));
 
  const CustomEvent = ({ event }:any) => (
    <div>
      <strong>{event.title}</strong>
      <div className='flex'><Image src={SCHEDUALE.UserOutlined} alt='UserOutlined' className='me-1'/> {event.appointmentData.patientsName}</div>
      <div className='flex'><Image src={SCHEDUALE.Document} alt='Document' className='me-1'/> Medical document</div>
      <div className='flex'><Image src={SCHEDUALE.Locator} alt='Locator' className='me-1'/> {event.appointmentData.duration} minutes</div>
      <div className='flex'><Image src={SCHEDUALE.Clock} alt='Clock' className='me-1'/> {event.appointmentData.room}</div>
    </div>
  );

  return (
    <div style={{ height: '680px' }}>
      <Calendar
        localizer={localizer}
        
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date( )}  
        toolbar={true}
        views={{
          day: true,
          week: true,
          month: true,
        }}
        components={{
          event: CustomEvent  
        }}
        style={{ fontSize: '13px' }}  
       
      />
    </div>
  );
};

export default CalendarChart;
