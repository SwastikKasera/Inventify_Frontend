import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CompanyForm = () => {

  const [companyForm, setcompanyForm] = useState({
    companyName: "",
    companyAddress: "",
    companyState: "",
    companyPincode: "",
    companyPan: "",
    companyGSTIN: "",
    companyMobile:"" ,
    companyEmail: "",
    companyBankName: "",
    companyBankAddress: "",
    companyBankAccount: "",
    companyBankIFSC: ""
  });

  const handleCompanyFormSubmit = async (event)=>{
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:4000/company/createCompany", companyForm)
      console.log(response);
      if(response.status === 200 || response.status === 201){
        toast.success("Company Added!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }else{
        toast.error("Company Data not saved", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      
    } catch (error) {
      toast.error("Error in Saving company Info", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error);
    }
  }
  const handleInputChange =  (event)=>{
      const {name, value} = event.target;
      setcompanyForm((prevData)=>({
        ...prevData,
        [name]: value
      }))
      // console.log(companyForm);
  }

  return (
    <>
      <div className="sm:ml-64">
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8  px-4 mx-auto lg:py-0">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Your Company Details</h2>
            <form >
              <div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
                <div className="sm:col-span-1">
                  <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company Name
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="text"
                    name="companyName"
                    id="companyName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Company name"
                    required=""
                  />
                </div>
                <div className="w-full sm:col-span-1">
                  <label htmlFor="companyAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company Address
                  </label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="companyAddress"
                    id="companyAddress"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your Address"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyPincode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Pincode
                  </label>
                  <input
                    type="number"
                    onChange={handleInputChange}
                    name="companyPincode"
                    id="companyPincode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyState" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    State
                  </label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="companyState"
                    id="companyState"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Uttar Pradesh"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyGSTIN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company GST
                  </label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="companyGSTIN"
                    id="companyGSTIN"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Uttar Pradesh"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyPan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Pan No.
                  </label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="companyPan"
                    id="companyPan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type PAN no."
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyMobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Mobile No.
                  </label>
                  <input
                    type="number"
                    onChange={handleInputChange}
                    name="companyMobile"
                    id="companyMobile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Mobile number"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company Email
                  </label>
                  <input
                    type="email"
                    onChange={handleInputChange}
                    name="companyEmail"
                    id="companyEmail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Email"
                    required=""
                  />
                </div>
              </div>
                <hr className="h-px w-full my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Company Bank Details</h2>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label htmlFor="companyBankName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="companyBankName"
                    id="companyBankName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Bank Name"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyBankAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bank Address
                  </label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="companyBankAddress"
                    id="companyBankAddress"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Bank Address"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyBankAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bank Account
                  </label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="companyBankAccount"
                    id="companyBankAccount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Account No."
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyBankIFSC" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bank IFSC
                  </label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="companyBankIFSC"
                    id="companyBankIFSC"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type IFSC Code"
                    required=""
                  />
                </div>
                </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                onClick={handleCompanyFormSubmit}
              >
                Add Company
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default CompanyForm;
