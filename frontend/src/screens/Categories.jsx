import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react';
import Scroller from '../components/Scrollar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { hideLoading, showLoading } from '../store/slices/alertSlice';

const Categories = () => {

    const { user } = useSelector(state => state.user);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [noProductsMessage, setNoProductsMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);

    // get all categories
    const getCtegoryList = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/getAllCategories`, { id: user?.id }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            console.log(res.data.categories);
            if (res.data.success) {
                setCategories(res.data.categories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // get all products
    const getProductsList = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/getAllProducts`, { id: user.id }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            if (res.data.success) {
                // console.log(res.data.products);
                setNoProductsMessage(null);
                setProducts(res.data.products);

            }
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(users);

    useEffect(() => {
        getCtegoryList();
        getProductsList();
    }, []);

    ////////////////////// truncate description
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + "...";
        } else {
            return text;
        }
    }

    //////////////////////////////// Search
    const handleSearchTermUpdate = (categoryId) => {
        setSearchTerm(categoryId);
    };

    const handleSearch = async (value) => {
        // e.preventDefault();
        try {
            // dispatch(showLoading());
            const res = await axios.post(`http://localhost:5000/users/searchProducts`, {
                searchKey: 'cid',
                searchValue: value
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            // dispatch(hideLoading());
            if (res.data.success) {
                setProducts(res.data.products);
                toast.success(res.data.message);

                res.data.products.length === 0 ?
                    setNoProductsMessage(`No products found for the selected category.`)
                    : setNoProductsMessage(null);

            } else {
                toast.error(res.data.message);
                setNoProductsMessage(null);
            }

        } catch (error) {
            // dispatch(hideLoading());
            console.error('Error searching users:', error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        // console.log('searchTerm', searchTerm);
        // handleSearch( searchTerm)
        // getProductsList()
        // setSearchTerm('')

        if (searchTerm) {
            handleSearch(searchTerm);

        }
        setSearchTerm('');
    }, [searchTerm]);


    return (
        <>
            <Navbar />
            <div className="min-h-[60vh]">
                {/* Categories */}
                <div className="container py-8 relative ">
                    <h2 className="text-2xl font-semibold mb-4 pl-6">Categories</h2>
                    <div className="pl-10 overflow-x-auto whitespace-nowrap w-[98.5vw]  " style={{ scrollbarWidth: "none" }}>
                        {categories?.map((category) => (
                            <Scroller key={category.id} id={category.id} name={category.cname} image={category.imagePath} updateSearch={handleSearchTermUpdate} />

                        ))}
                    </div>

                    <button onClick={() => { setNoProductsMessage(null); getProductsList()}} className="absolute right-0 -bottom-10 transform -translate-y-1/2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out">
                        Clear Filter <i className="fas fa-sync-alt ml-2"></i>
                    </button>
                </div>

                {/* ////////////// cards section //////////////// */}


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full justify-items-center">
                    {products?.map((item, index) => (
                        <div key={item?.id} className="h-[380px] relative w-[260px] rounded-lg overflow-hidden flex flex-col items-center justify-center">

                            <div className="menu1 absolute top-4 w-full flex justify-center">
                                {/* image */}
                                <div className="image w-40 h-40 overflow-hidden rounded-full relative z-10 border border-gray-300">
                                    {/* <img src="https://image.made-in-china.com/202f0j00EYHqvVPIsBkR/Latest-Design-Kids-Sneakers-Leather-Face-Mesh-Cotton-Shoes-Boys-Shoes.jpg" alt="Menu" className="w-full h-full object-cover transform transition duration-300 hover:scale-110" /> */}
                                    <img src={item.imagePath} alt="Menu" className="   w-full h-full object-cover transform transition duration-300 hover:scale-110" />
                                </div>
                                {/* cart icon */}
                                <button className="absolute top-4 right-16 bg-[#d69642dc] z-30 p-4 w-10 h-10 transform -translate-y-1/2 flex items-center justify-center hover:p-6 rounded-full" style={{ borderRadius: "11% 10% 87% 10% / 17% 12% 71% 10%" }}>
                                    <i className="fa-solid fa-cart-shopping text-white"></i>
                                </button>
                            </div>

                            {/* section 2 */}
                            <div className="absolute h-[270px] bottom-0 w-full bg-gray-200 rounded-[20px] py-4">
                                <div className=" pt-14 flex flex-col items-center justify-center h-full">
                                    <h1 className="capitalize text-xl font-bold">{item.pname}</h1>
                                    {/* <div> */}
                                    <p className="text-center mt-2 px-4">{truncateText(item.pdescription, 120)}</p>
                                    <p className=" font-bold">Price : {Number(item.pprice).toFixed(2)}/Rs</p>
                                    <a href="#" className="mt-2 bg-[#d69642dc] text-white py-1 px-6 rounded-full text-sm hover:bg-black transition duration-300 ease-in-out">Buy Now</a>
                                    {/* </div> */}
                                </div>
                            </div>

                        </div>


                    ))}


                </div>
                    {noProductsMessage && <p className="text-2xl md:text-4xl font-bold mb-4 text-gray-500 w-full p-14">{noProductsMessage}</p>}

            </div>
            <Footer />
        </>
    )
}

export default Categories
