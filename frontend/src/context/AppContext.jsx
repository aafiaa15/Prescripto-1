import { createContext, useEffect, useState } from "react";
import {  toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export const AppContext= createContext()
const AppContextProvider=(props)=>{
    const currencySymbol='₹'
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const navigate=useNavigate()
    const [doctors,setDoctors]=useState([])
    const [token,setToken]=useState(localStorage.getItem('token') ?localStorage.getItem('token'):false )
    const [userData,setUserData]=useState(false)
const getDoctorsData=async ()=>{
    try{
        const {data}=await axios.get(backendUrl+'/api/doctor/list')
        if(data.success){
            setDoctors(data.doctors)
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
    getDoctorsData()
},[])
const loadUserProfileData=async ()=>{
    try{
        const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
        if(data.success)
            setUserData(data.userData)
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
    if(token)
        loadUserProfileData()
    else{
    setUserData(false)
        navigate('/login')
    }
},[token])
const value={
    doctors,currencySymbol,backendUrl,token,setToken,userData,setUserData,loadUserProfileData,getDoctorsData
} 

return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)

}
export default AppContextProvider