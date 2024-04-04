import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {

    const images = ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTJLIL9XGOqYv1kxxUood44M62P0IApgBe2FKhUel0UY2_xzn7T',
        'https://i.pinimg.com/originals/7a/eb/f9/7aebf988eb591109c54be50f197368e6.jpg',
        'https://aquaticcreatures.com/cdn/shop/products/artwork-decals-4_800x.jpg?v=1619425605',
        'https://aquaticcreatures.com/cdn/shop/products/sunken-city-white_1024x1024.jpg?v=1666163005',
        'https://cityfurnish.com/blog/wp-content/uploads/2023/07/living-room-with-chandelier-couch-with-number-pillows-large-chandelier-min.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPRJdbKyDQPpn5YogVm1jTuRU_I-4soP8jA&usqp=CAU'
    ]
    return (
        <>

            <Navbar />
            <div className="mt-[65px]"></div>

            <div className="bg-gray-100 min-h-screen py-8">
                <div className="container mx-auto px-4 flex flex-col md:flex-row">
                    {/* Side Content */}
                    <div className="md:w-1/3 md:pr-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">About Us</h1>
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Our Story</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum magna ut nisi convallis, vel auctor erat congue. Morbi euismod sodales tortor, eu scelerisque elit rhoncus a. Nulla at tristique urna, id sagittis est. Vivamus aliquet commodo erat, nec tincidunt quam gravida ac.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Nullam nec orci nisi. Vestibulum vel justo nec odio iaculis accumsan. Nam consequat est id sem tincidunt, eget convallis dui interdum. Curabitur dignissim nisi ut enim ullamcorper vehicula.
                            </p>
                        </div>
                    </div>

                    {/* Images Grid */}
                    <div className="md:w-2/3 md:pl-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((i, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={i}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full object-cover rounded-t-lg transition duration-300 transform hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default About;
