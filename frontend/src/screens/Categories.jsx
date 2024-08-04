import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react';
import Scroller from '../components/Scrollar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { hideLoading, showLoading } from '../store/slices/alertSlice';
import ProductCard from '../components/cards/ProductCard';
import ProductList from '../components/cards/ProductCard';

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
                    <div className="pl-10 overflow-x-auto whitespace-nowrap w-[97vw]  " style={{ scrollbarWidth: "none" }}>
                        {categories?.map((category) => (
                            <Scroller key={category.id} id={category.id} name={category.cname} image={category.imagePath} updateSearch={handleSearchTermUpdate} />

                        ))}
                    </div>

                    {/* <button onClick={() => { setNoProductsMessage(null); getProductsList() }} className="absolute right-0 -bottom-10 transform -translate-y-1/2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out">
                        Clear Filter <i className="fas fa-sync-alt ml-2"></i>
                    </button> */}
                </div>

                {/* ////////////// cards section //////////////// */}

                <ProductList />

                {/* <div className="bg-orange-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 w-full justify-items-center">
                    {products?.map((item, index) => (

                        // <ProductCard key={index} item={item} />
                        <ProductList />

                    ))}


                </div> */}
                {noProductsMessage && <p className="text-2xl md:text-4xl font-bold mb-4 text-gray-500 w-full p-14">{noProductsMessage}</p>}

            </div>
            <Footer />
        </>
    )
}

export default Categories
