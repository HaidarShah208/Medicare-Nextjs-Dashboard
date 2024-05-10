import { DatepickerOptions } from '@/app/constant/allTypes/AllTypes';
import React, { useState } from 'react';
import DatePicker from 'tailwind-datepicker-react';

interface DemoComponentProps {
  onDateChange: (date: Date) => void;
}

const options: DatepickerOptions = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-300 dark:bg-gray-200",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2000-01-01"),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric" as "numeric" | "2-digit" 
  }
};

const DemoComponent:  React.FC<DemoComponentProps> = ({onDateChange}:any) => {
  const [show, setShow] = useState<boolean>(false);
  
  const handleChange = (selectedDate: Date) => {
    onDateChange(selectedDate)
  };
  
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div>
      <DatePicker options={options} onChange={handleChange} classNames='w-[415px]' show={show} setShow={handleClose} />
    </div>
  );
};

export default DemoComponent;