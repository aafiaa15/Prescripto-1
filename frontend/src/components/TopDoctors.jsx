import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
//import { doctors } from '../assets/assets_frontend/assets'
const TopDoctors = () => {
    const navigate=useNavigate()
   const {doctors}=useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors To Book</h1>
        <p className='sm:w-2/3 text-center'>Simply browse through our extensive list of doctors</p>
        <div className='w-full grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {
                doctors.slice(0,10).map((item,index)=>(
                    <div onClick={()=>{navigate('/appointment/'+item._id);scrollTo(0,0)}} key={index} className='border border-purple-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                        <img className='bg-purple-100' src={item.image}/>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className={`w-2 h-2 ${item.available ?  'bg-green-500':'bg-red-500'} rounded-full`}></p>   <p className={` ${item.available ?  'text-green-500':'text-red-500'} `}>{item.available ? 'Available':'Not Available'}</p> 
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                        </div>
                
               ))
            }
        </div>
    <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}}  className='bg-purple-50 text-gray-600 px-12 py-3 rounded-full mt-7 cursor-pointer'>More</button>
    </div>
  )
}

export default TopDoctors