import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import Products from '../dashboard/Products';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';


const ProfileScreen = ({ user }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "1";
  const [noProductsMessage, setNoProductsMessage] = useState(null);
  const dispatch = useDispatch();

  const changeTab = (tab) => {
    setSearchParams(searchParams);
    searchParams.set("tab", tab);
    // setCurrentTab(tab);
  };

  const handleLogout = () => {
    toast.success('Logout Successfully');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUser(null))
  }

  const handleSearch = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/users/searchProducts`, {
        searchKey: 'userId',
        searchValue: user?.id
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      });

      if (res.data.success) {
        toast.success(res.data.message);

        res.data.products.length === 0 ?
          setNoProductsMessage(`No products found for the selected category.`)
          : setNoProductsMessage(null);

      } else {
        toast.error(res.data.message);
        setNoProductsMessage(null);
      }

    } catch (error) {
      console.error('Error searching users:', error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    handleSearch();

  }, []);


  return (
    <>
      <div className='flex-col flex justify-center relative w-full h-[75vh] md:h-[370px] bg-orange-400 p-4 sm:px-10 md:px-32' >
        <div className="flex sm:flex-row flex-col-reverse justify-between items-center">
          <div className="lg:shadow-xl sm:p-8">
            <h1 className='text-2xl text-gray-300 font-bold mb-8'>{user?.firstName} {user?.lastName}</h1>
            <h1 className='text-xl text-gray-300'>{user?.email}</h1>
            <h1 className='text-xl text-gray-300'>You can manage your order and profile from here</h1>
          </div>
          <img src={user?.imagePath} alt="" className="rounded-full ml-2 border border-gray-300 outline outline-orange-300 outline-offset-4 max-[400px]:w-24 max-[400px]:h-24 w-32 h-32 object-cover " />
        </div>

        {/* Tabs */}

        <div className="overflow-x-auto max-w-90 absolute bottom-0 left-0 right-0  lg:left-20  lg:right-[35%]" style={{scrollbarWidth:"none"}}>
          <div className="flex justify-evenly ">
            <NavLink className={`px-8 py-2 mx-2 ${currentTab !== "0" ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-500'} hover:bg-white hover:text-orange-500`} to='/' onClick={() => changeTab("0")}>Home</NavLink>
            <button className={`px-4 py-2 mx-2 ${currentTab !== "1" ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-500'} hover:bg-white hover:text-orange-500`} onClick={() => changeTab("1")}>Orders</button>
            <button className={`px-4 py-2 mx-2 ${currentTab !== "2" ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-500'} hover:bg-white hover:text-orange-500`} onClick={() => changeTab("2")}>Products</button>
            <button className={`px-4 py-2 mx-2 ${currentTab !== "3" ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-500'} hover:bg-white hover:text-orange-500`} onClick={() => changeTab("3")}>Account Details</button>
            <button className={`px-4 py-2 mx-2 ${currentTab !== "4" ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-500'} hover:bg-white hover:text-orange-500`} onClick={() => handleLogout()}>Logout</button>
          </div>
        </div>

        {/* <div className="overflow-x-auto absolute bottom-0 ">
          <div className=" flex justify-evenly ">
            <NavLink className={`px-8 py-2 mx-2 ${currentTab !== "0" ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-500'} hover:bg-white hover:text-orange-500`} to='/' onClick={() => changeTab("0")}>Home</NavLink>
            <button className={`px-4 py-2 mx-2 ${currentTab !== "1" ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-500'} hover:bg-white hover:text-orange-500`} onClick={() => changeTab("1")}>Orders</button>
            <button className={`px-4 py-2 mx-2 ${currentTab !== "2" ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-500'} hover:bg-white hover:text-orange-500`} onClick={() => changeTab("2")}>Products</button>
            <button className={`px-4 py-2 mx-2 ${currentTab !== "3" ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-500'} hover:bg-white hover:text-orange-500`} onClick={() => changeTab("3")}>Account Details</button>
            <button className={`px-4 py-2 mx-2 ${currentTab !== "4" ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-500'} hover:bg-white hover:text-orange-500`} onClick={() => handleLogout()}>Logout</button>
          </div>
        </div> */}
      </div>
      <div className="max-[768px]:pt-20 flex-1 p-8 w-full h-[100vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }}  >
        <div className="bg-white rounded-lg text-gray-700 ">
          {
            currentTab === "1" ? (
              <><h1>Orders</h1></>
            )
              : currentTab === "2" ? (
                <>
                  <h1>Products</h1>
                  <Products endPoint={`getProductsByUser/${user?.id}`} />
                </>
              )
                : currentTab === "3" ? (<>

                  <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden" style={{ background: "url('https://media.istockphoto.com/id/172247209/photo/cold-drink.webp?b=1&s=170667a&w=0&k=20&c=N1L-69v_xP2KMXdXcioLHqbwFNNU87daCzLNijkzE40=') no-repeat center", backgroundSize: "cover" }}>
                    <div className="p-4">
                      <div className="flex items-center justify-center">
                        <img className="h-20 w-20 rounded-full object-cover " src={user.imagePath} alt={`${user.firstName} ${user.lastName}`} />
                      </div>
                      <div className="text-center mt-2">
                        <h1 className="text-xl font-semibold text-gray-600">{user.firstName} {user.lastName}</h1>
                        <p className="text-sm text-white mt-1">{user.email}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Full name</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{user.firstName} {user.lastName}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Email address</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{user.email}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{user.contactNumber}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">User Role</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{user.isAdmin ? "Admin" : "User"}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </>)
                  : (<>jj</>)
          }
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
