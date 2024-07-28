import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';


const Product = () => {
    const { user } = useSelector(state => state.user);
    const [products, setProducts] = useState([]);
    const [randomImage, setRandomImage] = useState(null);

    const dispatch = useDispatch()

    // get all products
    const getProductsList = async () => {
        try {
            // dispatch(showLoading())
            const res = await axios.get(`http://localhost:5000/users/getAllProducts`, { id: user?.id }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            // dispatch(hideLoading())

            if (res.data.success) {
                console.log(res.data.products);
                setProducts(res.data.products);
            }
        } catch (error) {
            // dispatch(hideLoading())
            console.log(error);
        }
    }

    useEffect(() => {
        getProductsList();
    }, []);



    //  Random bg image

    useEffect(() => {
        if (products.length > 0) {
            const randomIndex = Math.floor(Math.random() * products.length);
            setRandomImage(products[randomIndex].imagePath);
        }
    }, [products]);




    return (
        <div >
            <Navbar />

            {/*  Hero Setion */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-400 h-screen flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover"
                        src={randomImage}
                        // src={products[products.length - 1]?.imagePath}
                        // src="https://image.made-in-china.com/202f0j00EYHqvVPIsBkR/Latest-Design-Kids-Sneakers-Leather-Face-Mesh-Cotton-Shoes-Boys-Shoes.jpg"
                        alt="Products Hero Background"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Our Amazing Products</h1>
                    <p className="text-lg md:text-xl mb-8">Explore a wide range of high-quality products at affordable prices.</p>
                    <a
                        href="#products"
                        className="inline-block px-10 py-3 bg-black text-white text-lg md:text-xl font-semibold rounded-lg hover:bg-[#d69642dc]  transition duration-300 ease-in-out"
                    >
                        Shop Now
                    </a>
                </div>
            </div>

            {/* ////////////// cards section //////////////// */}


            <div id='products' className="grid grid-cols-1 py-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] w-full justify-items-center">
                {products?.map((item, index) => (
                    <ProductCard key={index} item={item} />
                ))}

            </div>

            <Footer />

        </div>
    )
}

export default Product
