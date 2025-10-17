import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import imageURL from './payment.jpg'
const MyAppoints = () => {
    const {backendUrl,token,getDoctorsData}=useContext(AppContext)
    const [appointments,setAppointments]=useState([])
    const [online,setOnline]=useState(false)
    const months=["","Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const slotDateFormat=(slotDate)=>{
        const dateArray=slotDate.split('_')
        return dateArray[0]+" "+months[dateArray[1]]+" "+dateArray[2];
    }
    const getUserAppointments=async ()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
            if(data.success){
                setAppointments(data.appointments.reverse())
                console.log(data.appointments)

            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    const cancelAppointment=async (appointmentId)=>{
        try{
    const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})  
    if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
    }  
    else{
        toast.error(data.message)
    }        
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        if(token){
            getUserAppointments()
        }
    },[token])
  return (
    <div>
        <p className='pb-3 mt-12 font-medium border-b text-zinc-700'>My appointments</p>
        <div>
            {
                appointments.map((item,index)=>(
                    <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                        <div>
                            <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
                        </div>
                        <div className='flex-grow-1 text-sm text-zinc-600'>
                            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className='text-zinc-700 mt-1 font-medium'>Address:</p>
                            <p className='text-xs'>{item.docData.address.line1}</p>
                            <p className='text-xs'>{item.docData.address.line2}</p>
                            <p className='text-sm mt-1'><span className='text-sm text-nutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                        </div>
                        <div>

                        </div>
                        <div className='flex flex-col gap-2 justify-end'>
                        {!item.cancelled && (
  online ? 
    <img className='h-50 w-50' onClick={() => setOnline(false)}   src={imageURL} alt="Online Icon" /> 
    : 
     !item.cancelled && !item.isCompleted && <button 
      onClick={() => setOnline(true)} 
      className='text-sm text-center text-stone-500 sm:min-w-48 py-2 border rounded cursor-pointer hover:bg-purple-800 hover:text-white transition-all duration-300'
    >
      Pay Online
    </button>
)}

                          {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-center text-stone-500 sm:min-w-48 py-2 border rounded cursor-pointer hover:bg-red-600 hover:text-white transition-all duration:300'>Cancel Appointment</button>}  
                          {item.cancelled &&  !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-red-500'>Appointment Cancelled</button>}
                          {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
                        </div>
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default MyAppoints