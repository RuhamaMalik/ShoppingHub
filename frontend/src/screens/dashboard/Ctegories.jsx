import React, { useEffect, useRef, useState } from 'react';
import AddCategoryForm from '../../components/forms/AddCategoruForm';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { hideLoading, showLoading } from '../../store/slices/alertSlice';


const Categories = () => {
    const { user } = useSelector(state => state.user);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchKey, setSearchKey] = useState('all')
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const [editModalVisible, setEditModalVisible] = useState(Array(categories.length).fill(false));

    // get all categories
    const getCategoryList = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/getAllCategories`, { userId: user.id }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            if (res.data.success) {
                setCategories(res.data.categories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(users);
    useEffect(() => {
        getCategoryList();
    }, []);


    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            // dispatch(showLoading());
            const res = await axios.post(`http://localhost:5000/admin/searchCategory`, {
                searchKey,
                searchValue: searchTerm.toLowerCase()
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            // dispatch(hideLoading());
            if (res.data.success) {
                setCategories(res.data.categories);
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
            getCategoryList()
            setSearchTerm('')
        }

    }, [searchKey]);

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDelete = async (id) => {
        try {
            dispatch(showLoading)
            const res = await axios.delete(`http://localhost:5000/admin/deleteCategoryById/${id}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            dispatch(hideLoading)
            if (res.data.success) {
                getCategoryList();
                toast.success(res.data.message);
            } else {
                console.error('Failed to delete user:', res.data.message);
                toast.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading)
            console.error('Error deleting user:', error);
        }
    } 


    const handleUpdate = async (cname, image, id) => {
        console.log(cname, image, id);
        try {
            dispatch(showLoading);
            
          const res = await axios.put(`http://localhost:5000/admin/updateCategoryById/${id}`, {
                cname, image , id, userId:user.id
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.getItem('token')
                }
            });
    
            dispatch(hideLoading);
            
            if (res.data.success) {
                getCategoryList();
                toast.success(res.data.message);
            } else {
                console.error('Failed to update user:', res.data.message);
                toast.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading);
            console.error('Error updating category:', error);
        }
    }
    
    
    const handleAddCategory = () => {
        setShowForm(!showForm);
    };



    // const categories = [
    //     {
    //         id: 1,
    //         name: 'food',
    //         uid: 1,
    //         date: "16-3-22",
    //         image: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/07/Chicken-Tikka-Skewers-square-FS-77.jpg',
    //         products: 5
    //     },
    //     {
    //         id: 2,
    //         name: 'drinks',
    //         uid: 5,
    //         date: "16-3-22",
    //         image: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/07/Chicken-Tikka-Skewers-square-FS-77.jpg',
    //         products: 8
    //      },
    // ];

    const toggleEditModal = (index) => {
        const newEditModalVisible = [...editModalVisible];
        newEditModalVisible[index] = !newEditModalVisible[index];
        setEditModalVisible(newEditModalVisible);
    };

    return (
        <div>

            <header className="mb-8 flex justify-between flex-wrap align-center gap-4">
                <h1 className="text-4xl font-semibold text-gray-700">Categories <span className='text-gray-500 text-5xl'>({categories?.length})</span></h1>

                <button className="bg-gray-500 px-4 py-2 rounded-md text-white  hover:bg-gray-700" onClick={handleAddCategory} >ADD Category</button>
                {showForm && <AddCategoryForm setShowForm={setShowForm} />}
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
                        className="max-[480px]:w-[140px] w-[160px] relative bg-white border border-gray-300 shadow-md p-3  ml-2"
                        onClick={handleDropdownClick}
                    >
                        {searchKey === 'cname' ? 'Name' : searchKey === 'createdAt' ? 'Creted At' : searchKey === 'updatedAt' ? 'updated At' : 'All'} <i className="fa fa-angle-down" aria-hidden="true"></i>

                        {showDropdown && (
                            <div className="absolute right-0 top-14 w-56 bg-white border border-gray-300 shadow-md">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('all')}>ALL</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('cname')}>Name</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('createdAt')}>Created At</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('updatedAt')}>Updated At</a>

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
                                Ctegory Name
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category Image
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                No.of Products
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories?.map((item, index) => (

                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.cname}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.updatedAt}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={item.imagePath} alt={item.cname} className="h-12 w-12 border border-orange-200 rounded-full" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.products?.length}</td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}>
                                        <i className='fa fa-trash'></i>
                                    </button>
                                    <button className="text-green-500 hover:text-green-700 m-2 ml-6" onClick={() => toggleEditModal(index)} >
                                        <i className='fa fa-pencil'></i>
                                    </button>
                                </td>

                                {editModalVisible[index] && <EditForm key={index} handleUpdate={handleUpdate} setEditModalVisible={(isVisible) => toggleEditModal(index)} item={item} />}

                            </tr>


                        ))}
                    </tbody>
                </table>

                {/* {editModalVisible && <EditForm handleUpdate={handleUpdate} setEditModalVisible={setEditModalVisible}  />} */}
            </div>



            <Toaster />
        </div>

    );
};

export default Categories;



const EditForm = ({ handleUpdate, setEditModalVisible, item }) => {
    const [categoryName, setCategoryName] = useState(item.cname);
    const [categoryImage, setCategoryImage] = useState('');
    const [file, setCategoryFile] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();


        handleUpdate(categoryName , file || item.image, item.id);

        setEditModalVisible(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCategoryImage(imageUrl);
            setCategoryFile(file);
        }
    };
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Edit Category</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 relative">
                            <label htmlFor="categoryImage" className="block mb-2">Category Image

                                <input type="file" id="categoryImage" className="hidden" onChange={handleImageChange} />
                                {/* Image  */}

                                <img
                                    src={categoryImage ? categoryImage : item.imagePath}
                                    accept="image/*"
                                    className="mt-2 h-30 w-80 cursor-pointer border border-gray-300 rounded-md"
                                />
                            </label>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block mb-2">Category Name</label>
                            <input type="text" id="categoryName" className="w-full border rounded-md px-3 py-2" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md" onClick={()=>handleUpdate(categoryName,file)}>Save Changes</button>
                            <button type="button" className="ml-4 bg-gray-300 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md" onClick={() => setEditModalVisible(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
