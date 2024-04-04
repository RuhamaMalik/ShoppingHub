import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import HomeSlider from '../../components/HomeSlider';
import Scroller from '../../components/Scrollar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const { user } = useSelector(state => state.user);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // get all categories
  const getCtegoryList = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/getAllCategories`, { id: user?.id }, {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      // console.log(res.data.categories);
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




  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      {/* Slider */}
      <div className="mt-[65px]"></div>
      <HomeSlider />


      {/* Search bar */}
      <div className={`flex md:hidden items-center  py-8 px-2 `}>
        <input
          type="text"
          placeholder="Search categories..."
          className="p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-400 flex-grow"
        />
        <button
          className={`bg-white  border border-orange-400 text-orange-400 p-2 rounded-r-md font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 `}
        >
          Search
        </button>
      </div>



      {/* Categories */}
      <div className="container py-8 relative ">
        <h2 className="text-2xl font-semibold mb-4 pl-6">Categories</h2>
        <div className="pl-10 overflow-x-auto whitespace-nowrap w-[98.5vw]  " style={{ scrollbarWidth: "none" }}>
          {categories.map((category) => (
            <Scroller key={category.id} id={category.id} name={category.cname} image={category.imagePath} />

          ))}
        </div>
        <NavLink to="/categories" className="absolute right-0 -bottom-10 transform -translate-y-1/2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out">
          Explore <i className="fas fa-arrow-right ml-2"></i>
        </NavLink>

      </div>



      {/* Products */}
      <div className=" relative container py-8 mt-20 ">
        <h2 className="text-2xl font-semibold mb-4 pl-6">Products</h2>
        <div className="pl-10 overflow-x-auto whitespace-nowrap w-[98.5vw]  " style={{ scrollbarWidth: "none" }}>
          {products.map((product) => (
            <Scroller key={product.id} id={product.id} name={product.pname} image={product.imagePath} />

          ))}
        </div>

        <NavLink to="/products" className="absolute right-0 -bottom-10 transform -translate-y-1/2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out">
          Explore <i className="fas fa-arrow-right ml-2"></i>
        </NavLink>

      </div>

      <Footer />
    </div>
  );
};

export default Home;
