'use client'
import { PATIENTS, SCHEDUALE } from '@/app/constant/assets/allAssets';
import Image from 'next/image';
import NewAppointment from '../../(components)/newAppointment/NewAppointment'; // Import the NewAppointment component
import SchedulerCalender from '@/app/(components)/schedulerCalender/SchedulerCalender';
import useSchedule from './useSchedule';

function Schedule() {

const {closeModal,openModal,isModalOpen,appointments}=useSchedule()
  return (
    <>
      <p className='ps-3 mb-5 mt-2'>Schedule</p>
      <div className='h-[72px] sm:w-[1090px] w-[410px] items-center bg-white flex flex-row justify-between px-2 sm:px-7'>
        <div className=''><p className=''>Weekly Schedule</p></div>
        <div className='flex'>
          <Image src={PATIENTS.Add} alt='add' className='sm:me-2 me-1 cursor-pointer' onClick={openModal}/>
          <Image src={PATIENTS.Filter} alt='Filter' />
          <Image src={SCHEDUALE.Print} alt='print' className='sm:mx-2 mx-1'/>
          <Image src={PATIENTS.Info} alt='Info'/>
        </div>
      </div>
      {isModalOpen && <NewAppointment onClose={closeModal} />}  
      <div className='mt-5 mb-10'>
        <SchedulerCalender appointments={appointments}/>
      </div>
    </>
  );
}

export default Schedule;
