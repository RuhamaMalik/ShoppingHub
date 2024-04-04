import signUp from '../../assets/images/signUp.svg';
import defaultProfImg from '../../assets/images/user.jpg'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; import axios from 'axios';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { showLoading, hideLoading } from '../../store/slices/alertSlice'
import 'react-toastify/dist/ReactToastify.css'


const SignUp = () => {
    const [firstName, setfirstName] = useState('Hira');
    const [lastName, setlastName] = useState('Ekram');
    const [password, setPassword] = useState('12345');
    const [cPassword, setCPassword] = useState('12345');
    const [email, setEmail] = useState('abc@gmail.com');
    const [contactNumber, setcontactNumber] = useState('98293892');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // console.log('file', file);
            // const imageUrl = URL.createObjectURL(file);
            setImage(file);
        }
    };

    const handleSubmit = async () => {
       
        const user = { firstName, lastName, email, password, contactNumber, image }
        try {
            dispatch(showLoading());
            const res = await axios.post(`http://localhost:5000/users/signup`, user, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            dispatch(hideLoading());
            //    alert(res.data.user);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login')
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <div className="grid  md:grid-cols-[21em,49em] gap-4 " >
                <div className="bg-gray-900 text-white flex flex-col-reverse    justify-between"> {/* blackcolumn */}
                    <img src={signUp} alt="" className="md:w-full sm:w-2/4  " />
                    <h1 className="m-6 text-3xl">Your ultimate online shopping destination in <span className="text-yellow-300">Pakistan</span></h1>
                </div>
                <div className="m-8 ml-16 "> {/* form */}
                    <div className="flex flex-col items-start"> {/* head */}
                        <h1 className="text-2xl max-[332px]:text-[20px] " >Create your Account</h1>
                        <p className="text-green-500">Personal Information</p>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-8"> {/* inputs */}
                        <div>
                            <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} placeholder='First Name' className="border p-2 rounded-md  max-[768px]:w-[90%]  md:w-1/2 lg:w-full" />
                        </div>
                        <div>
                            <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} placeholder='Last Name' className="border p-2 rounded-md max-[768px]:w-[90%] md:w-1/2 lg:w-full" />
                        </div>
                        <div>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="border p-2 rounded-md max-[768px]:w-[90%] md:w-1/2 lg:w-full" />
                        </div>
                        <div>
                            <input type="text" value={contactNumber} onChange={(e) => setcontactNumber(e.target.value)} placeholder='Contact Number' className="border p-2 rounded-md max-[768px]:w-[90%] md:w-1/2 lg:w-full" />
                        </div>
                        <div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="border p-2 rounded-md max-[768px]:w-[90%] md:w-1/2 lg:w-full" />
                        </div>
                        <div>
                            <input type="password" value={cPassword} onChange={(e) => setCPassword(e.target.value)} placeholder='Confirm Password' className="border p-2 rounded-md max-[768px]:w-[90%] md:w-1/2 lg:w-full" />
                        </div>

                    </div>
                    <div className="flex flex-col items-start mt-8"> {/* profile */}
                        <p>Upload Profile Image</p>
                        <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden">
                            <img src={defaultProfImg} alt="" className="w-full h-full object-cover" />
                        </div>
                        <label htmlFor="fileInput" className="inline-block mt-2 bg-gray-500  hover:bg-gray-700 px-3 py-2 rounded-md text-white cursor-pointer">Upload</label>
                        <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                        <Link to='/home' className="mt-4"> <button className="bg-gray-500 px-4 py-2 rounded-md text-white hover:bg-gray-700" onClick={handleSubmit}>Create Your Account</button></Link>
                        <p className='text-gray-400 mt-4'>Alread have an account ? <Link to='/login'><span className='hover:ml-1 text-green-500'>SignIn</span></Link></p>

                    </div>
                </div>
                <Toaster />
            </div>

        </>
    ) 
}

export default SignUp;
