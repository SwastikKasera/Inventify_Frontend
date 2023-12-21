import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
const Login = () => {
    const navigate = useNavigate();
    const [loginData, setloginData] = useState({
        companyEmail: "",
        companyPassword: ""
    });

    const handleInputChange = (event)=>{
        const {name, value} = event.target;
        setloginData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
    }
    const handleLoginSubmit = async (event)=>{
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:4000/login', loginData, 
            {headers: {
                "Content-Type": "application/json",
              },})
            if(response.status === 200){
                toast.success("Login Success")
                const token = response.data.token; // Assuming your token is returned in the response data
                
                navigate('/dashboard');
                console.log(token);
                Cookies.set('JWT_token', token);
            }else{
                toast.error("Cant Login")
                
            }
        } catch (error) {
            toast.error("Error in Login")
        }
    }
  return (
    <>
      <section className="bg-darkGreen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Inventify
          </a>
          <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-deeperGreen dark:border-secondary">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
              <form onSubmit={handleLoginSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="companyEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="email"
                    name="companyEmail"
                    id="companyEmail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  block w-full p-2.5 dark:bg-darkGreen dark:border-secondary dark:placeholder-lightGreen dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label htmlFor="companyPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="password"
                    name="companyPassword"
                    id="companyPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm block w-full p-2.5 dark:bg-darkGreen dark:border-secondary dark:placeholder-lighGreen dark:text-white "
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a href="/" className="text-sm font-medium text-primary hover:underline dark:text-primary">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-black bg-primary hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-white dark:text-white">
                  Don't have an account yet?{" "}
                  <Link to="/signup" className="font-medium text-primary hover:underline dark:text-primary">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
