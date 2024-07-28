import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './screens/signup/SignUp';
import SignIn from './screens/signin/SignIn';
import AdminDashboard from './screens/dashboard/AdmnDashboard';
import AddProductForm from './components/forms/AddProduct';
import Loader from './components/forms/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import Home from './screens/home/Home';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import Main from './screens/dashboard/Main';
import { useEffect } from 'react';
import { setUser } from "./store/slices/userSlice";
import About from './screens/About';
import Product from './screens/Product';
import Categories from './screens/Categories';
import ErrorPage from './screens/ErrorPage';
import ProfileScreen from './screens/profile/ProfileScreen';
import ProductSingleDetails from './components/cards/ProductSingleDetails';

function App() {
  const { user } = useSelector(state => state.user);
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();


  // console.log('token '+localStorage.getItem('token'));

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (!user) {
      dispatch(setUser(JSON.parse(data)));
    }
  });

  return (
    <>

      <BrowserRouter>
        {loading ? (
          <Loader />
        ) : (
          <Routes>

            <Route path='/' element={<Home />} />
            {/* <Route path='/' element={<ProductSingleDetails />} /> */}
            <Route path='/signup' element={<PublicRoute><SignUp /></PublicRoute>} />
            <Route path='/login' element={<PublicRoute><SignIn /></PublicRoute>} />
            <Route path='/about' element={<ProtectedRoutes><About /></ProtectedRoutes>} />
            <Route path='/products' element={<ProtectedRoutes><Product /></ProtectedRoutes>} />
            <Route path='/profile' element={<ProtectedRoutes><ProfileScreen user={user} /></ProtectedRoutes>} />
            <Route path='/categories' element={<ProtectedRoutes><Categories /></ProtectedRoutes>} />
            <Route path='/main' element={<ProtectedRoutes><Main /></ProtectedRoutes>} />
            <Route path='*' element={<ErrorPage />} />
            
            <Route path='/admin' element={
              user?.isAdmin ? <ProtectedRoutes><AdminDashboard /></ProtectedRoutes>
                : <ProtectedRoutes>
                  <><h1 style={{ color: "red", fontSize: '2em' }}>Only Admin can accesss this route</h1></>
                </ProtectedRoutes>
            } />


          </Routes>

        )}
      </BrowserRouter>

    </>

  );
}

export default App;
