import { useSelector } from 'react-redux';
import chart from '../../assets/images/chart1.png'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Main = () => {
    const { user } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);


    // get all users
    const getUsersList = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/admin/getAllUsers`, { userId: user.id }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            // console.log(res.data.users);
            if (res.data.success) {
                setUsers(res.data.users);
            }


        } catch (error) {
            console.log(error);
        }
    }

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

    const getCategoryList = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/getAllCategories`, { userId: user.id }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            if (res.data.success) {
                // console.log(res.data.categories);
                setCategories(res.data.categories);
            }
        } catch (error) {
            console.log(error);
        }
    }

      useEffect(() => {
        getUsersList();
        getProductsList();
        getCategoryList();

    }, []);
    // cards
    const cardsData = [
        { icon: 'fas fa-users', number: users.length, name: 'Total Users' },
        { icon: 'fas fa-box', number: products.length, name: 'Available Products' },
        { icon: 'fas fa-folder', number: categories.length, name: 'Available Categories' },
        // { icon: 'fas fa-chart-line', number: 150, name: 'Avg Sell' }
    ];

    const handleDelete = () => { }

    return (
        <>
            <div className=' ' >




                <div className="flex flex-wrap justify-center ">
                    {cardsData.map((card, index) => (
                        <div key={index} className="m-4 bg-white rounded-lg shadow-md p-6 w-64 text-center">
                            <div className="text-yellow-300 text-4xl mb-2">
                                <i className={`fa ${card.icon} mr-2`} aria-hidden="true"></i>
                                {card.number}
                            </div>
                            <div className="text-gray-700 text-lg">{card.name}</div>
                        </div>
                    ))}
                </div>



                <h1 className="text-3xl font-semibold text-gray-700">Recent Activities</h1>
                <div className="overflow-x-auto mt-10">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact Number
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Profile Picture
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="relative bg-white divide-y divide-gray-200">
                            {users.slice(0, 3).map((user, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.firstName} {user.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.contactNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={user.imagePath} alt={user.name} className="h-10 w-10 rounded-full" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(user.id)}>
                                            <i className='fa fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}





                        </tbody>

                    </table>
                   

                </div>

                <div className="flex justify-end align-center">
                        <NavLink to="?tab=1" className="px-6 py-2 mt-12 transform -translate-y-1/2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">
                            See All <i className="fas fa-arrow-right ml-2"></i>
                        </NavLink>
                    </div>

                <div className='flex flex-wrap justify-center rounded-lg shadow-md p-6 mt-10  gap-8'>
                    {/* <div className='rounded-lg shadow-md p-6 w-3/4 h-32 bg-gray-300 flex flex-wrap justify-between'> */}
                    <div className='bg-gray-300 p-10 flex flex-col justify-center'>
                        <p className='text-xl text'>AVG Sell</p>
                        <h1 className='text-4xl '>$8,678.00 </h1>
                        <p>Your account number GB24BKEN10000031510604</p>

                    </div>
                    <img className='w-[500px]' src={chart} alt="" />
                </div>


            </div>

        </>
    )
}

export default Main
