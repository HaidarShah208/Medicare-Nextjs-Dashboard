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


 

