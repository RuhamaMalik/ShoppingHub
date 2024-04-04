import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const HomeSlider = () => {
    const [products, setProducts] = useState([]);
    const { user } = useSelector(state => state.user);

    // get all products
    const getProductsList = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/getAllProducts`, { id: user?.id }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            console.log(res.data.products);
            if (res.data.success) {
                setProducts(res.data.products);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProductsList();
    },[]);

    // Slider functionality
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === products.length - 1 ? 0 : prevSlide + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [products]);

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? products.length - 1 : prevSlide - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === products.length - 1 ? 0 : prevSlide + 1));
    };

    return (
        <div className="relative w-full h-[50vh] ">
            {products.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.imagePath})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4 capitalize">{slide?.pname}</h2>
                        <p className="text-2xl mb-4">{slide?.pdescription}</p>
                    </div>
                </div>
            ))}
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2">
                &lt;
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2">
                &gt;
            </button>
        </div>
    );
};

export default HomeSlider;
