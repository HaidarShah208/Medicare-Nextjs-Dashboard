import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentTooltip,
  WeekView,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '@/store/slices/getAppoitments';

const SHIFT_KEY = 16;

const AllAppointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.getAppointments.appointments);

    const currentDates = new Date();  
const formattedCurrentDate = `${currentDates.getFullYear()}-${(currentDates.getMonth() + 1).toString().padStart(2, '0')}-${currentDates.getDate().toString().padStart(2, '0')}`;

  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(formattedCurrentDate);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === SHIFT_KEY) {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.keyCode === SHIFT_KEY) {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const commitChanges = ({ added, changed, deleted }: any) => {
    setData((prevData: any[]) => {
      let updatedData = [...prevData];
      if (added) {
        const startingAddedId = prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
        updatedData = [...prevData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        if (isShiftPressed) {
          const changedAppointment = prevData.find((appointment: { id: string | number; }) => changed[appointment.id]);
          const startingAddedId = prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
          updatedData = [
            ...prevData,
            { ...changedAppointment, id: startingAddedId, ...changed[changedAppointment.id] },
          ];
        } else {
          updatedData = prevData.map((appointment: { id: string | number; }) =>
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
          );
        }
      }
      if (deleted !== undefined) {
        updatedData = prevData.filter((appointment: { id: any; }) => appointment.id !== deleted);
      }
      return updatedData;
    });
  };
  useEffect(() => {
    dispatch(getAppointments()as any);
  }, [dispatch]);
  return (
    <Paper>
      <Scheduler data={appointments} height={660}>
        <ViewState currentDate={currentDate} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <WeekView startDayHour={8} endDayHour={22} intervalCount={1} cellDuration={60} />
        <Appointments />
        <AppointmentTooltip showDeleteButton />
        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
};

export default AllAppointments;
