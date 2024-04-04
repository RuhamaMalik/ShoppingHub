import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';
import { toast } from 'react-hot-toast';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };


    ///////

    const handleLogout = () => {
        toast.success('Logout Successfully');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(setUser(null))
    }


    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-orange-400">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
                <div className="relative flex justify-between items-center md:justify-end sm:justify-between lg:justify-between h-16">
                    {/* Logo */}

                    <div className="flex items-center md:w-4/5 lg:w-auto sm:w-auto">
                        <div className="flex items-center justify-self-start">
                            <img className="h-16   w-auto  p-2" src='https://img.pikbest.com/origin/10/06/36/28TpIkbEsTfqc.png!w700wp' alt="Logo" />
                            <h1 className="text-white text-2xl font-bold">ShoppingHub</h1>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to='/' className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
                            <NavLink to="/products" className="text-white px-3 py-2 rounded-md text-sm font-medium">Shop</NavLink>
                            <NavLink to="/categories" className="text-white px-3 py-2 rounded-md text-sm font-medium">Categories</NavLink>
                            <NavLink to='/about' className="text-white px-3 py-2 rounded-md text-sm font-medium">About</NavLink>
                        </div>
                    </div>
                    {/* Search */}
                    <div className="hidden md:block mr-2 ">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400 flex-grow"
                            />
                            <button className="bg-white border text-orange-400 px-4 py-2 rounded-r-md font-medium focus:outline-none focus:ring-2 focus:ring-orange-400">
                                Search
                            </button>
                        </div>
                    </div>
                    {/* Mobile Menu */}
                    <div className="flex lg:hidden">
                        <button onClick={toggleMobileMenu} type="button" className="bg-white inline-flex items-center justify-center p-2 rounded-md text-black hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            {/* <span className="sr-only">Open main menu</span> */}
                            <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* Profile Dropdown */}
                    <div className="relative hidden lg:block ml-2">
                        <button
                            onClick={toggleProfileMenu}
                            type="button"
                            className="relative flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            id="user-menu-button"
                            aria-expanded={isProfileMenuOpen}
                            aria-haspopup="true"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-10 w-10 rounded-full"
                                src={user?.imagePath}
                                alt={user?.firstName}
                            />
                        </button>
                        {/* Profile dropdown menu */}
                        {isProfileMenuOpen && (
                            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</NavLink>

                                {user?.isAdmin && 
                                    <NavLink to='/admin' className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Dashboard</NavLink>
                                }
                                <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden pb-4`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <NavLink to="/" className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</NavLink>
                    <NavLink to='/products' className="text-white block px-3 py-2 rounded-md text-base font-medium">Shop</NavLink>
                    <NavLink to="" className="text-white block px-3 py-2 rounded-md text-base font-medium">Categories</NavLink>
                    <NavLink to="/about" className="text-white block px-3 py-2 rounded-md text-base font-medium">About</NavLink>
                </div>
                {/* Profile Dropdown */}
                <div className="relative lg:hidden ">
                    <button
                        onClick={toggleProfileMenu}
                        type="button"
                        className="relative w-full  flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded={isProfileMenuOpen}
                        aria-haspopup="true"
                    >
                        <img
                            className="h-8 w-8 rounded-full"
                            src={user?.imagePath}
                            alt={user?.firstName}
                        />
                        <h3 className=' text-white m-3' >Profile</h3>
                    </button>
                    {/* Profile dropdown menu */}
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                            <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</NavLink>
                            <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={handleLogout}>Sign out</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
