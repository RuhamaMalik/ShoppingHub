import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../store/slices/alertSlice'
import { setUser } from "../../store/slices/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async () => {
    const user = { email, password }
    try {
      dispatch(showLoading());
      const res = await axios.post(`http://localhost:5000/users/login`, user);
      dispatch(hideLoading());
      // console.log(res.data.user);
      res.data.user.password = undefined;
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        // console.log(res.data.user);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success(res.data.message);
        navigate('/');

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

      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-[100px] w-auto" src="https://img.pikbest.com/origin/10/06/36/28TpIkbEsTfqc.png!w700wp" alt="Sign In Image" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-yellow-200 ">Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" pl-5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6 bg-gray-800"
                  value={email} onChange={(e) => setEmail(e.target.value)}

                />

              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-yellow-200 ">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-yellow-200 hover:text-yellow-300">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-5 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-200 sm:text-sm sm:leading-6 bg-gray-800"
                  value={password} onChange={(e) => setPassword(e.target.value)}

                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-300">
            Don’t have a free account yet?
            <NavLink to='/signup' className="font-semibold leading-6 text-yellow-200  hover:text-yellow-300">SinUp Here</NavLink>
          </p>
        </div>

        <Toaster />
      </div>



    </>
  )
}

export default SignIn
