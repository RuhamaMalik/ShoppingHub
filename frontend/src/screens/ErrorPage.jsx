import { NavLink } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">404 - Page Not Found</h2>
                <p className="text-lg text-gray-700 mb-4">Oops! The page you are looking for doesn't exist.</p>
                <p className="text-lg text-gray-700">Please check the URL or go back to the homepage.</p>
                <div className="flex justify-center mt-8">
                    <NavLink to='/' className="bg-orange-500 hover:bg-black text-white px-6 py-2 rounded-md transition duration-300 ease-in-out">
                        Go Home page
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
