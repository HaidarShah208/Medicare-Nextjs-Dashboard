import React, { useEffect } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "@/store/slices/getAppoitments";

export interface AppointmentDataType {
  onlineConsultation: boolean;
  dateTime: string;
}

interface State {
  series: { name: string; data: { x: Date; y: number }[] }[];
  options: ApexOptions;
}

const OfflineChart: React.FC<{}> = () => {
  const appointmentData: AppointmentDataType[] = useSelector(
    (state: RootState) => state.getAppointments.appointments
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointments() as any);
  }, [dispatch]);

  

  const filteredAppointments = appointmentData.filter(
    (appointment) => !appointment.onlineConsultation
  );

  const countAppointmentsByDay = (appointments: AppointmentDataType[]) => {
    const appointmentCounts: { [key: string]: number } = {};
    appointments.forEach(appointment => {
      const date = new Date(appointment.dateTime).toLocaleDateString();
      appointmentCounts[date] = (appointmentCounts[date] || 0) + 1;
    });
    return Object.entries(appointmentCounts).map(([date, count]) => ({
      x: new Date(date),
      y: count,
    }));
  };
  

  const offlineChartData = countAppointmentsByDay(filteredAppointments);

  const initialState: State = {
    series: [
      {
        name: "Offline Consultations",
        data: offlineChartData,
      },
    ],
    options: {
      chart: {
        type: "area",
        sparkline: {
          enabled: true,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: offlineChartData.map((data) => data.x),
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={initialState.options}
          series={initialState.series}
          type="area"
          height={112}
          width={164}
        />
      </div>
    </div>
  );
};

export default OfflineChart;