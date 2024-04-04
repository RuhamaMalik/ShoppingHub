import { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../store/slices/alertSlice'
import toast, { Toaster } from 'react-hot-toast';



const Users = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { user } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const [searchKey, setSearchKey] = useState('all')
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

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

    // console.log(users);
    useEffect(() => {
        getUsersList();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            // dispatch(showLoading());
            const res = await axios.post(`http://localhost:5000/admin/searchUsers`, {
                searchKey,
                searchValue: searchTerm
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            // dispatch(hideLoading());
            if (res.data.success) {
                setUsers(res.data.users);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            // dispatch(hideLoading());
            console.error('Error searching users:', error);
            toast.error("Something went wrong");
        }
    };


    useEffect(() => {
        if (searchKey === 'all') {
            getUsersList()
            setSearchTerm('')
        }

    }, [searchKey]);

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
    };
    const handleDelete = async (userId) => {
        try {
            dispatch(showLoading)
            const res = await axios.delete(`http://localhost:5000/users/deleteUserById/${userId}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            dispatch(hideLoading)
            if (res.data.success) {
                getUsersList();
                toast.success(res.data.message);
            } else {
                console.error('Failed to delete user:', res.data.message);
                toast.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading)
            console.error('Error deleting user:', error);
        }
    };

    // const users = [
    //     {
    //         id: 1,
    //         name: 'John Doe',
    //         email: 'john@example.com',
    //         contactNumber: '1234567890',
    //         profilePicture: 'https://instacaptionsforall.in/wp-content/uploads/2023/12/converted_52.jpg'
    //     },
    //     {
    //         id: 2,
    //         name: 'Jane Smith',
    //         email: 'jane@example.com',
    //         contactNumber: '9876543210',
    //         profilePicture: 'https://instacaptionsforall.in/wp-content/uploads/2023/12/converted_34-1024x1024.jpg'
    //     },
    // ];


    return (
        <div>

            <header className="mb-8">
                <h1 className="text-4xl font-semibold text-gray-700">Users <span className='text-gray-500 text-5xl'>({users.length})</span></h1>
            </header>

            {/* search */}


            <div className="flex justify-center items-center mt-8 max-[480px]:flex-col ">
                <input
                    type="text"
                    className="max-[480px]:w-full max-[480px]:mb-4 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 w-2/4 "
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="relative flex items-evenly ">

                    <button
                        className="max-[480px]:w-[140px] w-[140px] relative bg-white border border-gray-300 shadow-md p-3  ml-2"
                        onClick={handleDropdownClick}
                    >
                        {searchKey === 'firstName' ? 'Name' : searchKey === 'email' ? 'Email' : searchKey === 'contactNumber' ? 'Phone' : 'All'} <i className="fa fa-angle-down" aria-hidden="true"></i>

                        {showDropdown && (
                            <div className="absolute right-0 top-14 w-56 bg-white border border-gray-300 shadow-md">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('all')}>ALL</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('firstName')}>Name</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('email')}>Email</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('contactNumber')}>Phone</a>
                            </div>
                        )}
                    </button>
                    <button
                        type="button"
                        className="max-[480px]:w-[140px] bg-gray-500 text-white px-4 py-3 rounded-r-md  hover:bg-gray-700 focus:outline-none"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>


            {/* user list  */}

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
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user, index) => (

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
            <Toaster />
        </div>


    );
};

export default Users;
