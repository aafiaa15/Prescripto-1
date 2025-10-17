import React, { useContext,useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
//import { doctors } from '../assets/assets_frontend/assets'

const Doctors = () => {
    const {speciality}=useParams() 
    console.log(speciality)
   const {doctors}=useContext(AppContext)
    //in filterDoc we will add speciality wale doctors
    const [filterDoc,setFilterDoc]=useState([]) 
    const [showFilter,setShowFilter]=useState(false)
    const navigate=useNavigate()
    console.log(speciality);   
    const applyFilter=()=>{
        if(speciality)
            setFilterDoc(doctors.filter(doc=> doc.speciality===speciality))
        else{
           setFilterDoc(doctors)
        }
    }
    useEffect(()=>{
applyFilter()
    },[doctors,speciality])
  return (
    <div>
   <p className='text-gray-600'>Browse through doctors specialists</p>
   <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
    <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter?'bg-purple-800 text-white' : ''}`} onClick={()=>setShowFilter(prev=>!prev)}> Filter</button>
    <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ?'flex' :'hidden sm:flex'}`}>
        <p onClick={()=>speciality==='Gynecologist'? navigate('/doctors') :navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-black rounded transition-all cursor-pointer ${speciality==="Gynecologist" ? "bg-indigo-100 text-black":""}`}>Gynecologist</p>
        <p onClick={()=>speciality==='General Physician'? navigate('/doctors') :navigate('/doctors/General Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-black rounded transition-all cursor-pointer ${speciality==="General Physician" ? "bg-indigo-100 text-black":""}`}>General Physician</p>

        <p onClick={()=>speciality==='Dermatologist'? navigate('/doctors') :navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-black rounded transition-all cursor-pointer ${speciality==="Dermatologist" ? "bg-indigo-100 text-black":""}`}>Dermatologist</p>
        <p onClick={()=>speciality==='Pediatricians'? navigate('/doctors') :navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-black rounded transition-all cursor-pointer ${speciality==="Pediatricians" ? "bg-indigo-100 text-black":""}`}>Pediatricians</p>
        <p onClick={()=>speciality==='Neurologist'? navigate('/doctors') :navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-black rounded transition-all cursor-pointer ${speciality==="Neurologist"  ? "bg-indigo-100 text-black":""}`}>Neurologist</p>
        <p onClick={()=>speciality==='Gastroenterologist'? navigate('/doctors') :navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-black rounded transition-all cursor-pointer ${speciality==="Gastroenterologist" ? "bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
    </div>
    <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
        {
           filterDoc.map(
            (item,index)=>(
                <div onClick={()=>{navigate('/appointment/'+item._id);scrollTo(0,0)}} key={index} className='border border-purple-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-purple-50' src={item.image}/>
                    <div className='p-4'>
                       <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className={`w-2 h-2 ${item.available ?  'bg-green-500':'bg-red-500'} rounded-full`}></p>   <p className={` ${item.available ?  'text-green-500':'text-red-500'} `}>{item.available ? 'Available':'Not Available'}</p> 
                            </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                    </div>
            
           )
           )
        }
    </div>
   </div>
    </div>
  )
}

export default Doctors