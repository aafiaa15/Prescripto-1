import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";

import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Checking for all required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        // Checking password strength
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Please enter a strong password"
            });
        }

        // Check if doctor email already exists
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Handling missing image file
        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: "Profile image is required"
            });
        }

        // Upload image to Cloudinary
        let imageUrl = "";
        try {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed"
            });
        }

        // Parsing address safely
        const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

        // Creating doctor data object
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: await bcrypt.hash(password, 10),
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
             // ✅ Fix: Ensure available field is included
            date: new Date()
        };

        // Save to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({
            success: true,
            message: "Doctor added successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//2)
const loginAdmin=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({
                success:false,
                message:"INVALID CREDENTIALS"
            })
        }
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//3)
    const allDoctors=async (req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
        
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
    }

//API to get all appointments list
const appointmentsAdmin=async (req,res)=>{
    try{
        const appointments= await appointmentModel.find({})
        
        res.json({success:true,appointments})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API for appointment cancellation
const appointmentCancel=async (req,res)=>{
    try{
        const {appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId)
      
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
        //releasing doctorSlot
        const {docId,slotDate,slotTime}=appointmentData
        const doctorData=await doctorModel.findById(docId)
        let slots_booked=doctorData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e !==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Appointment cancelled"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API to get dashboard data for admin panel
const adminDashboard=async (req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})
        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export { addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard }
