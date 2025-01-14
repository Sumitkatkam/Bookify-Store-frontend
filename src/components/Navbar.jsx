import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import ActiveImg from '../assets/Active_user.png';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
    {name: "Dashboard", href:'/dashboard'},
    {name: "Orders", href:'/orders'},
    {name: "Got to Cart", href:'/cart'},
    {name: "Checkout", href:'/checkout'},
]

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {CurrentUser,logout} = useAuth();

  const handleLogOut = () =>{
    logout()
  }
  return (
    <header className='max-w-screen-2xl mx-auto px-4 py-6'>
        <nav className='flex justify-between items-center'>
            {/* left side */}
            <div className='flex items-center justify-center md:gap-16 gap-4'>
                <Link to = '/'>
                <FiBookOpen className='text-4xl'/>
                </Link>

                <div className='relative sm:w-72 w-40 space-x-2'>
                <IoSearch className='size-4 absolute inline-block left-4 inset-y-2'/>
                <input type="text" placeholder='Search here' 
                className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none' />
                </div>
            </div>

            {/* right side */}
            <div className='relative flex items-center md:space-x-3 space-x-2'>
                <div>
                    {
                        CurrentUser ? <>
                        <button onClick={() =>{
                            setIsDropDownOpen(!isDropDownOpen); 
                        }}>
                            <img src={ActiveImg} alt="" className={`size-6 rounded-full ${CurrentUser ? 'ring-2 ring-blue-500' :''}`} />
                        </button>
                        {/* Dropdown items */}
                        {
                            isDropDownOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                    <ul className='py-2'>
                                        {
                                            navigation.map((item) => (
                                                <li key={item.name} onClick={() =>
                                                    setIsDropDownOpen(false)}>
                                                    <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                        <li>
                                            <button onClick={handleLogOut} className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'>Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                        </> : <Link to='/login'><FaRegCircleUser className='size-6'/></Link>
                    }
                </div>
            <button className='hidden sm:block'>
            <FaRegHeart className='size-6'/>
            </button>
            <Link to='/cart' className=' bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
            <MdOutlineShoppingCart className='size-6'/>
            {
                cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span> : <span className='text-sm font-semibold sm:ml-1'>0</span>
            }
            </Link>
            
            </div>
        </nav>
    </header>
  )
}

export default Navbar;