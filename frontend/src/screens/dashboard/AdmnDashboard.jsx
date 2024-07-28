import { useEffect, useState } from 'react'
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import Main from './Main';
import Users from './Users';
import Products from './Products';
import  logo  from '../../assets/images/signUp.svg'
import Categories from './Ctegories';
import { setUser } from '../../store/slices/userSlice';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';


const AdminDashboard = () => { 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = searchParams.get("tab") || "0";
    const dispatch = useDispatch();

    //  change set Side Tabs content
    const changeTab = (tab) => {
        searchParams.set("tab", tab);
        setSearchParams(searchParams);
        if (window.innerWidth <= 768) {
            setIsSidebarOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        toast.success('Logout Successfully');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(setUser(null))
    }
    const sidebarLinks = [
        { icon: 'fas fa-tachometer-alt', name: 'Dashboard', tab: '0' },
        { icon: 'fas fa-users', name: 'Users', tab: '1' },
        { icon: 'fas fa-box', name: 'Products', tab: '2' },
        { icon: 'fas fa-folder', name: 'Categories', tab: '3' },
        { icon: 'fas fa-tags', name: 'Deals', tab: '4' },
        { icon: 'fas fa-receipt', name: 'Orders', tab: '5' }
    ];
    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-gray-900 w-screen p-4 z-50 justify-between items-center hidden  max-[768px]:flex" >
                {/* Menu Icon */}
                <button className="text-white focus:outline-none  " onClick={toggleSidebar}>
                    {isSidebarOpen ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* <h1 className="text-xl font-bold">Admin Dashboard</h1> */}
                <div>logout</div>
            </header>


            <div className="flex h-screen bg-white text-white ">
                {/* Sidebar */}

                <div className={`max-[768px]:pt-20 fixed top-0 left-0 bottom-0 w-64 bg-gray-900 p-4  transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} pt-10  md:relative md:left-0 md:transform-none overflow-auto`}>
                    <h1 className="text-xl font-bold border-b border-gray-500 pb-5">Admin Dashboard</h1>
                    <ul className="mt-4 ">
                        {sidebarLinks.map((link, index) => (
                            <li key={index} className="mb-2">
                                <Link to={`?tab=${link.tab}`} className={`block px-4 py-2 rounded-md hover:bg-gray-700 ${currentTab === link.tab ? 'bg-gray-700' : ''}`} onClick={() => changeTab(link.tab)}>
                                    <i className={`mr-2 ${link.icon}`}></i>
                                    {link.name}
                                </Link>
                            </li>
                        ))} 
                        <li className="mb-2"><NavLink  to='/' className='w-full text-left block px-4 py-2 rounded-md hover:bg-gray-700'><i className='fas fa-home'></i> Home</NavLink></li>
                        <li className="mb-2"><button onClick={handleLogout} className='w-full text-left block px-4 py-2 rounded-md hover:bg-gray-700'><i className='fas fa-sign-out-alt'></i> SignOut</button></li>
                    </ul>
                    {/* <img src={logo} alt="" className="w-3/4   absolute bottom-0 left-0 " /> */}
                    <img src={logo} alt="" className="w-3/4 h-[200px]  -m-4  mt-6" />
                    {/* <img src="https://img.pikbest.com/origin/10/06/36/28TpIkbEsTfqc.png!w700wp" alt="" className="w-3/4  absolute bottom-0 left-0 " /> */}

                </div>

                {/* content */}
                <div className="max-[768px]:pt-20 flex-1 p-8 w-screen h-[100vh]   overflow-y-auto   " style={{ scrollbarWidth: 'none' }}  >

                    <div className="bg-white rounded-lg  text-gray-700 ">


                        {
                            currentTab === "0" ? (
                                <>
                                    <header className="mb-8">
                                        <h1 className="text-3xl font-semibold text-gray-700">Welcome to Admin Dashboard</h1>
                                    </header>
                                    <Main />
                                </>
                            ) :
                                currentTab === "1" ? (
                                    <>
                                         <Users />
                                    </>
                                ) :
                                    currentTab === "2" ? (
                                        <>
                                           <Products endPoint = "getAllProducts"/>
                                        </>
                                    ) :
                                        currentTab === "3" ? (
                                            <>
                                               <Categories />
                                            </>
                                        ) : (<></>)
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
