export type Users = {
    user: {
      email: string;
      name:string
      
    };
  };

 export type Change = {
    target: {
      name: string;
      value: string;
    };
  };

export type FormTypes= {
  email: string;
  password: string;
  userName: string;
  companyName: string;
  industryName: string;
  employees: string;
  confirmPassword: string;
}

export type GetUserData= {
  userName: string;
  companyName: string;
  industryName:string;
  employees:string;
}

export type InputProps= {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export type  FormData= {
  patientsName: string;
  purpose: string;
  status: string | null;
  duration: string | null;
  type: string | null;
  onlineConsultation: boolean;
  dateTime: Date;
  room: string;
}

 
export type patientInformation= {
  id:string;
  patientsName: string;
  purpose: string;
  duration: string;
  dateTime:string
}


export type AppointmentData= {
  id:string,
  dateCreated: string;
  room: string;
  patientsName: string;
  purpose: string;
  status: string | null;
  duration: string | null;
  type: string | null;
  onlineConsultation: boolean;
  dateTime: Date;
}


export type errHandle={
  loading:boolean;
      error:any;
  
  }

export type   AppointmentTypes= {
  patientsName: string;
  dateTime: string;
  duration: string;
  purpose: string;
  id: string;
}