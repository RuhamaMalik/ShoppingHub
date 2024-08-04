import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import HomeSlider from '../../components/HomeSlider';
import Scroller from '../../components/Scrollar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import { NavLink } from 'react-router-dom';
import back from '../../assets/images/back.png';
import bagbg from '../../assets/images/bag-bg-home.png';
import purse from '../../assets/images/purse.webp';

const Home = () => {
  const { user } = useSelector(state => state.user);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // get all categories
  const getCtegoryList = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/getAllCategories`, {
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
      const res = await axios.get(`http://localhost:5000/users/getAllProducts`, {
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
    <div className="bg-gray-100 min-h-screen relative">

      <Navbar />

      {/* Slider */}
      {/* <div className="mt-[65px] "></div> */}
      <HomeSlider />

      {/* Search bar */}
      <div className={`flex md:hidden items-center  py-8 px-2 mt-14`}>
        <input
          type="text"
          placeholder="Search categories..."
          className="p-2 py-4 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-400 flex-grow"
        />
        <button
          className={`bg-white py-4  border border-orange-400 text-orange-400 p-2 rounded-r-md font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 `}
        >
          Search
        </button>
      </div>





      {/* Services Cards */}

      <div className=" min-h-[80vh]  relative top-14 left-0 right-0 ">
        <div className=" relative  min-h-72 max-w-[100vw] ovrflow-hidden text-white p-4 bg-image "
        // style={{ background: `white url(https://timelinecovers.pro/facebook-cover/download/Best-Covers-For-Facebook-Timeline-sunflower.jpg) no-repeat center`, backgroundSize:"cover"}}

        >

          <div className=" flex flex-col gap-y-4  sm:flex-row items-center justify-center min-h-[40vh] max-w-full sm:absolute  left-0 right-0 top-44 z-[10]">

            <div className="w-64 h-64 text-black bg-[var(--color-light)] shadow-2xl flex flex-col items-center justify-center p-4 rounded-lg text-center">
              <i className="fas fa-shopping-cart text-4xl text-[var(--base-color)] mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Effortless Purchasing</h3>
              <p>Enjoy a smooth and simple buying experience.</p>
            </div>

            <div className="w-64 h-64 bg-[var(--base-bg-dark-color)] text-[var(--color-light)] shadow-2xl flex flex-col items-center justify-center p-4 rounded-lg text-center">
              {/* <div className="w-64 h-64 bg-green-600 text-[var(--color-light)] shadow-2xl flex flex-col items-center justify-center p-4 rounded-lg text-center"> */}
              <i className="fas fa-shipping-fast text-4xl text-[var(--base-color)] mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Fast Order Processing</h3>
              <p>Quick and reliable order handling.</p>
            </div>

            <div className="w-64 h-64 bg-[var(--bg-black)] shadow-2xl  flex flex-col items-center justify-center p-4 rounded-lg text-center">
              <i className="fas fa-headset text-4xl text-[var(--base-color)] mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2 text-[var(--color-light)]">24/7 Customer Support</h3>
              <p className='text-[var(--gray-color)]'>Always here to assist with any questions.</p>
            </div>
          </div>

        </div>
      </div>


      {/* Categories */}
      <div className="container h-[60vh] max-w-[100vw] overflow-hidden  py-8 relative top-6">
        <h2 className="text-2xl font-semibold mb-4 pl-6">Categories</h2>
        <div className="pl-10 overflow-x-auto whitespace-nowrap w-[98.5vw]  " style={{ scrollbarWidth: "none" }}>
          {categories.map((category) => (
            <Scroller key={category.id} id={category.id} name={category.cname} image={category.imagePath} />

          ))}
        </div>
        <NavLink to="/categories" className="absolute right-2 bottom-10 transform -translate-y-1/2 px-4 py-2 bg-[var(--base-bg-dark-color)] text-white rounded-md hover:bg-[var(--bg-black)] hover:text-white transition duration-300 ease-in-out">
          Explore <i className="fas fa-arrow-right ml-2 "></i>
        </NavLink>

      </div>

      {/* Products */}
      {/* <div className=" relative container py-8 mt-20 ">
        <h2 className="text-2xl font-semibold mb-4 pl-6">Products</h2>
        <div className="pl-10 overflow-x-auto whitespace-nowrap w-[98.5vw]  " style={{ scrollbarWidth: "none" }}>
          {products.map((product) => (
            <Scroller key={product.id} id={product.id} name={product.pname} image={product.imagePath} />

          ))}
        </div>

        <NavLink to="/products" className="absolute right-0 -bottom-10 transform -translate-y-1/2 px-4 py-2 bg-[var(--base-bg-dark-color)] text-white rounded-md hover:bg-[var(--bg-black)] hover:text-white transition duration-300 ease-in-out">
          Explore <i className="fas fa-arrow-right ml-2"></i>
        </NavLink>

      </div> */}

      {/* Bag Addvertisement  section */}

      <div
        className=" h-[140vh] max-w-[100vw] bg-no-repeat flex justify-center lg:justify-end items-center italic"
        style={{
          background: `
      linear-gradient(to right ,rgba(0, 0, 0, 0.2), rgba(90, 0, 0, 0.9)),
      url(${bagbg})
    `,
          backgroundSize: 'cover',
          backgroundAttachment: "fixed"
        }}
      >

        <div className=' flex flex-col justify-space-between items-center italic gap-4 sm:px-8 md:pr-24'>

          <img className='h-[500px] w-[85%] sm:w-[400px] rounded ' src={purse} alt="bag image" />

          <h1 className='w-[85%] sm:w-[400px]  text-white text-2xl sm:text-4xl capitalize text-center '>Explore our exquisite Bag Collection now!</h1>
          <NavLink to="/categories" className=" px-12 py-3 bg-[var(--base-bg-dark-color)] text-white rounded-md hover:bg-transparent hover:border  transition duration-300 ease-in-out">
            Order Now <i className="fas fa-arrow-right ml-2 "></i>
          </NavLink>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
