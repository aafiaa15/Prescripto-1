import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_3fr_1fr] gap-10 my-10 mt-40 text-sm'>
            {/*----left section------ */}
            <div>
                <img className='mb-5 w-40' src={assets.logo}/>
                <p className='w-full md:w-2/3  text-gray-600 leading-6'>Your trusted healthcare partner. We offer compassionate, state-of-the-art medical care with a dedicated team of experts. Your health and well-being are our top priorities. Experience excellence in healthcare today.</p>
            </div>

             {/*----center section------ */}
             <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
             </div>

              {/*----right section------ */}
            <div>
                <p className='text-xl font-medium mb-5'>Get in Touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>(+91)-7986861825</li>
                    <li>devaryaman4@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            {/*--------Copyright Text--------- */}
            <hr/>
             <p className='text-center py-5 text-sm'>Copyright 2024@ Prescripto - All right Reserved</p>
        </div>
    </div>
  )
}

export default Footer