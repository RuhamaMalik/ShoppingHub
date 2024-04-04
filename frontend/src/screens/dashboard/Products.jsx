import { useEffect, useState } from 'react'
import AddProductForm from '../../components/forms/AddProduct';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { hideLoading, showLoading } from '../../store/slices/alertSlice';


const Products = ({ endPoint }) => {
    const { user } = useSelector(state => state.user);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [searchKey, setSearchKey] = useState('all')
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(Array(products.length).fill(false));

    const dispatch = useDispatch()


    // get all products
    const getProductsList = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/${endPoint}`, { id: user.id }, {
                // const res = await axios.get(`http://localhost:5000/users/getAllProducts`, { id: user.id }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            if (res.data.success) {
                setProducts(res.data.products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(users);
    useEffect(() => {
        getProductsList();
    }, []);


    //////////////////////////////// Search


    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            // dispatch(showLoading());
            const res = await axios.post(`http://localhost:5000/users/searchProducts`, {
                searchKey,
                searchValue: searchTerm
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            // dispatch(hideLoading());
            if (res.data.success) {
                setProducts(res.data.products);
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
            getProductsList()
            setSearchTerm('')
        }

    }, [searchKey]);



    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
    };
 

    const handleUpdate = async (productName,productPrice, producDesc,file, id) => {
        console.log(productName,productPrice, producDesc,file, id);
        try {
            dispatch(showLoading);
            
          const res = await axios.put(`http://localhost:5000/users/updateProductById/${id}`, {
                pname:productName,pprice: productPrice, pdescription:producDesc, pimage:file , id, userId:user.id
            }, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.getItem('token')
                }
            });
    
            dispatch(hideLoading);
            
            if (res.data.success) {
                getProductsList();
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
    
    const handleAddProduct = () => {
        setShowForm(!showForm);
    };

    const handleDelete = async (id) => {
        try {
            dispatch(showLoading)
            const res = await axios.delete(`http://localhost:5000/users/deleteProductById/${id}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            dispatch(hideLoading)
            if (res.data.success) {
                getProductsList();
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


    const toggleEditModal = (index) => {
        const newEditModalVisible = [...editModalVisible];
        newEditModalVisible[index] = !newEditModalVisible[index];
        setEditModalVisible(newEditModalVisible);
    };

    return (
        <div>

            <header className="mb-8 flex justify-between flex-wrap align-center gap-4">
                <h1 className="text-4xl font-semibold text-gray-700">products <span className='text-gray-500 text-5xl'>({products?.length})</span></h1>

                <button className="bg-gray-700 text-white hover:bg-[#d69642dc]  transition duration-300 ease-in-out px-4 py-2 rounded-md " onClick={handleAddProduct} >ADD PRODUCT</button>
                {showForm && <AddProductForm setShowForm={setShowForm} />}
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
                        className="max-[480px]:w-[140px] relative bg-white border border-gray-300 shadow-md p-3  ml-2"
                        onClick={handleDropdownClick}
                    >
                        {searchKey === 'pname' ? 'Name' : searchKey === 'categoryId' ? 'category' : searchKey === 'userId' ? 'User' : 'All'} <i className="fa fa-angle-down" aria-hidden="true"></i>

                        {showDropdown && (
                            <div className="absolute right-0 top-14 w-56 bg-white border border-gray-300 shadow-md">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('all')}>ALL</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('pname')}>Name</a>
                                {/* <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('userId')}>User</a> */}
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setSearchKey('categoryId')}>Category</a>
                            </div>
                        )}
                    </button>
                    <button
                        className="max-[480px]:w-[140px] px-4 py-3 rounded-r-md bg-gray-700 text-white hover:bg-[#d69642dc]  transition duration-300 ease-in-out  focus:outline-none"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>


            {/* products list  */}

            <div className="overflow-x-auto mt-10">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Image
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                UserName
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Added on
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {/* {console.log(products)} */}
                        {products?.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.pname}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={item.imagePath} alt={item.pname} className="h-10 w-10 rounded-full" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.pdescription}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.category?.cname}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.pprice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.user?.firstName} {item?.user?.lastName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.updatedAt}</td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}>
                                        <i className='fa fa-trash'></i>
                                    </button>
                                    {user.id === item.userId &&
                                    <button className="text-green-500 hover:text-green-700 m-2 ml-6" onClick={() => toggleEditModal(index)} >
                                    <i className='fa fa-pencil'></i>
                                </button>}
                            </td>

                            {editModalVisible[index] && <EditForm key={index} handleUpdate={handleUpdate} setEditModalVisible={(isVisible) => toggleEditModal(index)} item={item} />}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Toaster />
        </div>

    );
};

export default Products;



const EditForm = ({ handleUpdate, setEditModalVisible, item }) => {
    const [productName, setProductName] = useState(item.pname);
    const [producDesc, setProductDesc] = useState(item.pdescription);
    const [productPrice, setProductPrice] = useState(item.pprice);
    const [pImage, setPImage] = useState('');
    const [file, setCategoryFile] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();


        handleUpdate(productName, productPrice, producDesc,  file || item.image, item.id);

        setEditModalVisible(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPImage(imageUrl);
            setCategoryFile(file);
        }
    };
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
                <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 relative">
                            <label htmlFor="categoryImage" className="block mb-2">Product Image

                                <input type="file" id="categoryImage" className="hidden" onChange={handleImageChange} />
                                {/* Image  */}

                                <img
                                    src={pImage ? pImage : item.imagePath}
                                    accept="image/*"
                                    className="mt-2 h-30 w-80 cursor-pointer border border-gray-300 rounded-md"
                                />
                            </label>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block mb-2">Product Name</label>
                            <input type="text" id="categoryName" className="w-full border rounded-md px-3 py-2" value={productName} onChange={(e) => setProductName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block mb-2">Product Price</label>
                            <input type="number" id="categoryName" className="w-full border rounded-md px-3 py-2" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block mb-2">Product Description</label>
                            <input type="text" id="categoryName" className="w-full border rounded-md px-3 py-2" value={producDesc} onChange={(e) => setProductDesc(e.target.value)} />
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md" onClick={()=>handleUpdate(productName, productPrice, producDesc,file, item.id)}>Save Changes</button>
                            <button type="button" className="ml-4 bg-gray-300 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md" onClick={() => setEditModalVisible(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
