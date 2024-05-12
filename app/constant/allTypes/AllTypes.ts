export type Users = {
  user: {
    email: string;
    name: string;
  };
};

export type Change = {
  target: {
    name: string;
    value: string;
  };
};

export type FormTypes = {
  email: string;
  password: string;
  userName: string;
  companyName: string;
  industryName: string;
  employees: string;
  confirmPassword: string;
};

export type GetUserData = {
  userName: string;
  companyName: string;
  industryName: string;
  employees: string;
};

export type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type FormData = {
  patientsName: string;
  purpose: string;
  status: string | null;
  duration: string | null;
  type: string | null;
  onlineConsultation: boolean;
  dateTime: Date;
  room: string;
};

export type patientInformation = {
  id: string;
  patientsName: string;
  purpose: string;
  duration: string;
  dateTime: string;
};

export type AppointmentData = {
  id?: string;
  dateCreated: string;
  room: string;
  patientsName: string;
  purpose: string;
  status: string | null;
  duration: string | null;
  type: string | null;
  onlineConsultation: boolean;
  dateTime: Date;
};

export type errHandle = {
  loading: boolean;
  error: any;
};

export type AppointmentTypes = {
  id: string;
  patientsName: string;
  dateTime: string;
  duration: string;
  purpose: string;
};

export type DonutChartProps = {
  maleCount: number;
  femaleCount: number;
};

export type DatepickerOptions = {
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
    day: "numeric",
    month: "long",
    year: "numeric"
  };
};

export type AppointmentDataType = {
  consultation: string;
  dateTime: string;
  patientsName: string;
};

export type patietnsData = {
  id: string;
  data: any[];
};

export type signup = {
  loading: boolean;
  error: any;
};

export type  addPatients= {
  loading: boolean;
  error: any;  
  userInfo: any;  
}

export type ForgotPasswordState= {
  loading: boolean;
  error: string | null;
}


export type HeaderProps= {
  handleToggleSidebar: () => void; 
}