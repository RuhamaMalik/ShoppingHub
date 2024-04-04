
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { showLoading, hideLoading } from '../../store/slices/alertSlice'
import axios from 'axios';


const AddCategoryForm = ({ setShowForm }) => {
    const [image, setImage] = useState('');
    const [cname, setCName] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const handleImage = (e) => {

        const file = e.target.files[0]; 
        if (file) {
            setImage(file)
            // const imageUrl = URL.createObjectURL(file);
            // setImage(imageUrl);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
       const id = user.id
        const category = { image, cname,id  }
        try {
            dispatch(showLoading());
            const res = await axios.post(`http://localhost:5000/admin/addCategory`, category, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.getItem('token')
                }
            });
            dispatch(hideLoading());
            //    alert(res.data.user);
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

        setImage('');
        setCName('');
        setShowForm(false);

    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Add Category</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Category Name</label>
                    <input type="text" id="productName" className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={cname} onChange={(e) => setCName(e.target.value)} required />
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
                        <span className="ml-2" id="file-name">{!image ? 'No file selected' : 'File Selected'}</span>
                    </div>
                </div>


                <button type="submit" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategoryForm;
