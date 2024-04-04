import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { showLoading, hideLoading } from '../../store/slices/alertSlice'
import axios from 'axios';

const AddProductForm = ({ setShowForm }) => {
    const [pname, setpname] = useState('');
    const [pdescription, setDescription] = useState('');
    const [pimage, setImage] = useState('');
    const [pprice, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const handleImage = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            setImage(file)
        }
    }

    const getCategoryList = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/getAllCategories`, { id: user.id }, {
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
        getCategoryList();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = { pname, pprice, pdescription, pimage, userId: user.id, categoryId }
        try {
            dispatch(showLoading());
            const res = await axios.post(`http://localhost:5000/users/addProduct`, product, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.getItem('token')
                }
            });
            dispatch(hideLoading());

            if (res.data.success) {
                toast.success(res.data.message);

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            toast.error("Something went wrong");
        }

        setpname('');
        setDescription('');
        setImage('');
        setPrice('');
        setCategoryId('');
        setShowForm(false);

    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="pname" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" id="pname" className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={pname} onChange={(e) => setpname(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={pdescription} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <div className="mt-1 ">
                        <label className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 inline-block text-yellow-300 hover:bg-blue-50 focus:bg-blue-50 focus:border-blue-500 focus:outline-none">
                            <span className="mr-2">Choose a file</span>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImage}
                                required
                            />
                        </label>
                        <span className="ml-2" id="file-name">{!pimage ? 'No file selected' : 'File Selected'}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" id="price" className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={pprice} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select id="category" className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                        <option value="">Select category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.id}>{cat.cname}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductForm;
