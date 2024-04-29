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


