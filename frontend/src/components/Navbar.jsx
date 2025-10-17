import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    setShowDropdown(false);
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="Logo" />

      {/* Desktop menu */}
      <ul className='hidden md:flex items-start space-x-5 font-medium'>
        <NavLink to='/'><li className='py-1'>Home</li>
        <hr className='border-none outline-none h-0.5 bg-purple-300 w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/doctors'><li className='py-1'>All Doctors</li>
        <hr className='border-none outline-none h-0.5 bg-purple-300 w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'><li className='py-1'>About</li>
        <hr className='border-none outline-none h-0.5 bg-purple-300 w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'><li className='py-1'>Contact</li>
        <hr className='border-none outline-none h-0.5 bg-purple-300 w-3/5 m-auto hidden'/>
        </NavLink>

        {/* Admin link added */}
        <li className='py-1 rounded-full'>
          <a href="https://prescriber-admin.onrender.com" target="_blank" rel="noopener noreferrer">
            Admin Page
          </a>
        </li>
      </ul>

      {/* Right side user section */}
      <div className='flex items-center gap-10'>
        {
          token && userData ? (
            <div className='flex items-center gap-2 cursor-pointer relative'>
              <div onClick={() => setShowDropdown(prev => !prev)} className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={userData.image} alt="User" />
                <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
              </div>

              {/* Click-based dropdown */}
              {showDropdown && (
                <div className='absolute top-12 right-0 text-base font-medium text-gray-600 z-20'>
                  <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={() => { navigate('/my-profile'); setShowDropdown(false); }} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={() => { navigate('/my-appointments'); setShowDropdown(false); }} className='hover:text-black cursor-pointer'>My Appointments</p>
                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className='cursor-pointer bg-purple-800 text-white px-8 py-3 rounded-full font-light hidden md:block'>
              Create Account
            </button>
          )
        }

        {/* Mobile menu icon */}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="Menu" />

        {/* Mobile menu drawer */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="Logo" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>

            {/* Admin link added to mobile */}
            <a href="https://prescriber-admin.onrender.com" target="_blank" rel="noopener noreferrer">
              <p className='px-4 py-2 rounded inline-block'>Admin</p>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
