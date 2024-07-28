import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        // <footer className="bg-orange-500 text-white py-8 mt-10 max-w-[100vw]">
        <footer className="bg-orange-500 text-white py-8  max-w-[100vw]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* About Us */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">About Us</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                       <div className="flex flex-col ">
                            <NavLink to='/'><i className="fa fa-angle-right" aria-hidden="true"></i><a href="#" className='ml-2 hover:ml-4'>Home</a></NavLink>
                            <NavLink to='/about'><i className="fa fa-angle-right" aria-hidden="true"></i><a href="#" className='ml-2 hover:ml-4'>About</a></NavLink>
                            <NavLink to='/products'><i className="fa fa-angle-right" aria-hidden="true"></i><a href="#" className='ml-2 hover:ml-4'>Shop</a></NavLink>
                            <NavLink to='/categories'><i className="fa fa-angle-right" aria-hidden="true"></i><a href="#" className='ml-2 hover:ml-4'>Categories</a></NavLink>
                            </div>
                    </div>

                    {/* Social Media */}
                    <div >
                        <h2 className="text-lg font-bold mb-4">Social Media</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="transition duration-300 ease-in-out transform hover:scale-150"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="transition duration-300 ease-in-out transform hover:scale-150"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="transition duration-300 ease-in-out transform hover:scale-150"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="transition duration-300 ease-in-out transform hover:scale-150"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Contact</h2>
                        <p>123 Street, City, Country</p>
                        <p>Email: info@example.com</p>
                        <p>Phone: +1234567890</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
