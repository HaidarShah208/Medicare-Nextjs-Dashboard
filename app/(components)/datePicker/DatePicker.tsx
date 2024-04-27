import React, { useState } from 'react';
import DatePicker from 'tailwind-datepicker-react';

interface DatepickerOptions {
  title: string;
  autoHide: boolean;
  todayBtn: boolean;
  clearBtn: boolean;
  clearBtnText: string;
  maxDate: Date;
  minDate: Date;
  theme: {
    background: string;
    todayBtn: string;
    clearBtn: string;
    icons: string;
    text: string;
    disabledText: string;
    input: string;
    inputIcon: string;
    selected: string;
  };
  icons: {
    prev: () => JSX.Element;
    next: () => JSX.Element;
  };
  datepickerClassNames: string;
  defaultDate: Date;
  language: string;
  disabledDates: Date[];
  weekDays: string[];
  inputNameProp: string;
  inputIdProp: string;
  inputPlaceholderProp: string;
  inputDateFormatProp: {
    day: string;
    month: string;
    year: string;
  };
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
    year: "numeric"
  }
};

const DemoComponent: React.FC = ({onDateChange}:any) => {
  const [show, setShow] = useState<boolean>(false);
  
  const handleChange = (selectedDate: Date) => {
    onDateChange(selectedDate)
  };
  
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div>
      <DatePicker options={options} onChange={handleChange} classNames='w-[415px] mb-0' show={show} setShow={handleClose} />
    </div>
  );
};

export default DemoComponent;
