import React, { useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const CreateCustomer = () => {
    
    const token = Cookies.get('JWT_token');
    const decode = jwtDecode(token)
    const [customerFormData, setcustomerFormData] = useState({
        companyId: decode.companyId,
        customerName: "",
        customerAddress: "",
        customerEmail: "",
        customerMobile: "",
        customerGSTIN: "",
    });
    const handleInputChange = (event)=>{
        
        const {name, value} = event.target
        setcustomerFormData((prevData)=>({
            ...prevData,
            [name]: value
        }))
    }
    const handleSubmitItem = async (event)=>{
        event.preventDefault()
        try {
                const customerData = await axios.post('http://localhost:4000/c/create', customerFormData, {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            if(customerData){
                return toast.success("Customer Added Success");
            }else{
                return toast.error("Fail to Add Customer")
            }
        } catch (error) {
            console.log(error);
            return toast.error("Error in Adding Customer")
        }
    }
  return (
    <>
      <Sidebar />
      <div className="ml-64">
      <section className="bg-darkGreen h-full">
          <div className="py-8 px-4 mx-auto lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new customer</h2>
            <form onSubmit={handleSubmitItem}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label htmlFor="customerName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    id="customerName"
                    className="bg-darkGreen border placeholder:font-normal placeholder:text-lightGreen border-gray-300 text-secondary text-sm font-bold block w-full p-2.5 "
                    placeholder="Type Customer name"
                    onChange={handleInputChange}
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="customerAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Customer Address
                  </label>
                  <input
                    type="text"
                    name="customerAddress"
                    id="customerAddress"
                    className="bg-darkGreen border placeholder:font-normal placeholder:text-lightGreen border-gray-300 text-secondary text-sm font-bold block w-full p-2.5 "
                    placeholder="23,ABC Colony"
                    onChange={handleInputChange}
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="customerEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Customer Email
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    id="customerEmail"
                    className="bg-darkGreen border placeholder:font-normal placeholder:text-lightGreen border-gray-300 text-secondary text-sm font-bold block w-full p-2.5 "
                    placeholder="john@gmail.com"
                    onChange={handleInputChange}
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="customerMobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Customer Phone
                  </label>
                  <input
                    type="tel"
                    name="customerMobile"
                    id="customerMobile"
                    className="bg-darkGreen border placeholder:font-normal placeholder:text-lightGreen border-gray-300 text-secondary text-sm font-bold block w-full p-2.5 "
                    placeholder="9876543210"
                    onChange={handleInputChange}
                    required
                    
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="customerGSTIN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Customer GST No.
                  </label>
                  <input
                    type="text"
                    name="customerGSTIN"
                    id="customerGSTIN"
                    className="bg-darkGreen border placeholder:font-normal placeholder:text-lightGreen border-gray-300 text-secondary text-sm font-bold block w-full p-2.5 "
                    placeholder="09AMTOPPKS1ZZ"
                    onChange={handleInputChange}/>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-bold text-center text-black bg-primary hover:bg-primary hover:opacity-90 focus:ring-4 focus:ring-primary-200">
                Add Customer
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreateCustomer;
