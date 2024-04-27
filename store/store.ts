import { configureStore } from '@reduxjs/toolkit';
import  apiReducer from './slices/signup';
import  addPatients from './slices/addPatients';
import  getAllPatients from './slices/getPatients';
import  addAppoitments from './slices/addAppoitments';
import  getAppointments from './slices/getAppoitments';
import forgotPasswordSlice from './slices/forgotPassword';
import changePasswordReducer from './slices/changePassword'

const store = configureStore({
  reducer: {
     signup:  apiReducer,
     patients:  addPatients,
     allPatients:  getAllPatients,  
     appoitments:  addAppoitments,  
     getAppointments: getAppointments,
     forgotPassword: forgotPasswordSlice,
     changePassword: changePasswordReducer,
  

 
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
