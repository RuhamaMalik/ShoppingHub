// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const HomeSlider = () => {
//     const [products, setProducts] = useState([]);
//     const { user } = useSelector(state => state.user);

//     // get all products
//     const getProductsList = async () => {
//         try {
//             const res = await axios.get(`http://localhost:5000/users/getAllProducts`, { id: user?.id }, {
//                 headers: {
//                     token: localStorage.getItem('token')
//                 }
//             });
//             console.log(res.data.products);
//             if (res.data.success) {
//                 setProducts(res.data.products);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getProductsList();
//     }, []);

//     // Slider functionality
//     const [currentSlide, setCurrentSlide] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide === products.length - 1 ? 0 : prevSlide + 1));
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [products]);

//     const prevSlide = () => {
//         setCurrentSlide((prevSlide) => (prevSlide === 0 ? products.length - 1 : prevSlide - 1));
//     };

//     const nextSlide = () => {
//         setCurrentSlide((prevSlide) => (prevSlide === products.length - 1 ? 0 : prevSlide + 1));
//     };

//     return (
//         <div className="relative w-full h-[80vh] top-[64px] ">
//             {products.map((slide, index) => (
//                 <div
//                     key={index}
//                     className={`absolute top-0 left-0 w-full h-full transition-opacity bg-cover md:bg-contain bg-no-repeat bg-[var(--color-light)]  duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
//                         }`}
//                     style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.imagePath})`, backgroundPosition: 'center' }}
//                 >
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center bg-[var(--bg-transparent-black)] px-14 sm:px-4 p-4  w-full sm:w-3/4 md:w-2/3 lg:w-1/2 ">
//                         <h2 className="text-2xl md:text-3xl  lg:text-4xl  font-bold mb-4 capitalize">{slide?.pname}</h2>
//                         <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 text-justify">
//                             {slide?.pdescription.length >= 150 ? slide?.pdescription.slice(0, 150) : slide?.pdescription}
//                         </p>
//                     </div>
//                 </div>
//             ))}
//             <button onClick={prevSlide} className=" absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-[var(--bg-black)] hover:text-[var(--gray-color)] ">
//                 &lt;
//             </button>
//             <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-[var(--bg-black)] hover:text-[var(--gray-color)]">
//                 &gt;
//             </button>
//         </div>
//     );
// };

// export default HomeSlider;


import React, { useState, useEffect } from 'react';
import person1 from '../assets/images/deal2.png';
import person2 from '../assets/images/deal3.png';
import person3 from '../assets/images/deal4.png';
import { NavLink } from 'react-router-dom';
import { formatTimeRemaining } from '../utilities/Time';

const deals = [
    {
        title: "Sell",
        thumbnail: person1,
        description: "Get the best products at unbeatable prices.",
        originalPrice: 100,
        currentPrice: 50,
        discount: 50,
        startTime: new Date('2024-07-25T00:00:00Z'),
        endTime: new Date('2024-07-27T23:59:59Z'),
    },
    {
        title: "Offer",
        thumbnail: person2,
        description: "Special offer on select items!",
        originalPrice: 200,
        currentPrice: 120,
        discount: 40,
        startTime: new Date('2024-07-26T00:00:00Z'),
        endTime: new Date('2024-08-05T23:59:59Z'),
    },
    {
        title: "Discount",
        thumbnail: person3,
        description: "Exclusive discount on new arrivals!",
        originalPrice: 150,
        currentPrice: 90,
        discount: 40,
        startTime: new Date('2024-07-27T00:00:00Z'),
        endTime: new Date('2024-08-10T23:59:59Z'),
    }
];

const HomeSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);

    // Deal Remaining Time
    useEffect(() => {
        if (deals.length > 0) {
            const endTime = new Date(deals[currentSlide].endTime).getTime();
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const remaining = Math.max(0, endTime - now);
                setTimeRemaining(remaining);

                if (remaining === 0) {
                    nextSlide();
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [currentSlide, deals]);

    // Slider functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === deals.length - 1 ? 0 : prevSlide + 1));
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? deals.length - 1 : prevSlide - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === deals.length - 1 ? 0 : prevSlide + 1));
    };

    return (
        <div className="sm:px-14 py-6 relative w-full min-h-[85vh] top-[64px] lg:flex lg:flex-row-reverse justify-center items-center bg-[var(--base-bg-dark-color)]">
            {/* Image */}
            <div className="flex-grow rounded-full h-full flex justify-center items-center">
                <div className="sm:w-[530px] w-[320px] bg-[var(--bg-transparent-black)] relative sm:h-[530px] rounded-full flex justify-center items-center shadow-2xl">
                    <img src={deals[currentSlide].thumbnail} className="z-10 h-[320px] sm:h-[480px] object-cover" alt="deal" />

                    {/* Shapes */}
                    <div
                        key={currentSlide + '-1'}
                        className={`absolute right-2 -bottom-14 sm:top-[26%] sm:-left-[4%] z-10 w-[100px] h-[100px] bg-green-600 rounded-full shadow-inner-1 flex justify-center items-center text-white gap-2 shape-animate`}
                    >
                        {deals[currentSlide].title}
                        <span className="text-2xl">!</span>
                    </div>
                    <div
                        key={currentSlide + '-2'}
                        className={`absolute -bottom-28 sm:top-[46%] sm:-left-[12%] z-10 w-[118px] h-[118px] bg-blue-600 rounded-full shadow-inner-1 flex justify-center items-center text-white gap-2 shape-animate`}
                    >
                        {deals[currentSlide].title}
                        <span className="text-2xl">!</span>
                    </div>
                    <div
                        key={currentSlide + '-3'}
                        className={`absolute left-2 -bottom-14 sm:top-[69%] sm:-left-[2%] z-10 w-[100px] h-[100px] bg-yellow-500 rounded-full shadow-inner-1 flex justify-center items-center text-white gap-2 shape-animate`}
                    >
                        {deals[currentSlide].title}
                        <span className="text-2xl">!</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-32 md:mt-2 flex-grow h-full p-8 flex flex-col justify-center items-start space-y-6 text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg">
                <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600">
                    {deals[currentSlide].title} Deal!
                </h1>
                <p className="text-xl">{deals[currentSlide].description}</p>
                <div className="text-7xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                    {deals[currentSlide].discount}% OFF
                </div>
                <div className="text-lg bg-gray-800 p-4 rounded-lg shadow-md">
                    Time remaining: <span className="font-bold">{formatTimeRemaining(timeRemaining)}</span>
                </div>
                <NavLink
                    to="/categories"
                    className="px-6 py-3 text-lg font-semibold rounded-md bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg hover:from-blue-600 hover:to-teal-600 transition duration-300 ease-in-out flex items-center space-x-2"
                >
                    <span>Order Now</span>
                    <i className="fas fa-arrow-right"></i>
                </NavLink>
            </div>

            {/* Navigation Buttons */}
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-black hover:text-gray-300">
                &lt;
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-black hover:text-gray-300">
                &gt;
            </button>
        </div>
    );
};

export default HomeSlider;
