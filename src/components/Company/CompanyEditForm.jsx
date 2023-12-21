import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { toast } from "react-toastify";

const CompanyEditForm = () => {
  const {companyId} = useParams();
  const [data, setdata] = useState({
    companyName: "",
    companyAddress: "",
    companyState: "",
    companyPincode: "",
    companyPan: "",
    companyGSTIN: "",
    companyMobile: "",
    companyEmail: "",
    companyBankName: "",
    companyBankAddress: "",
    companyBankAccount: "",
    companyBankIFSC: "",
  });
  

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleUpdateCompany = async (event)=>{
    event.preventDefault()
    try {
        const response = await axios.put(`http://localhost:4000/company/updateCompany/${companyId}`, data)
    if(response.status === 201 || response.status === 200){
        toast.success("Company Update Success!", {
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
        toast.error("Update Fail", {
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
        toast.error("Error in Updating", {
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
  }
  useEffect(() => {
    const fetchOneCompany = async () => {
      const allData = await axios.get("http://localhost:4000/company/getCompany");
      const fetchCompanyIdData = allData.data.fetchedCompany.find((company) => company._id === companyId);
      setdata(fetchCompanyIdData);
    };
    fetchOneCompany();
  }, []);
  return (
    <>
      <div className="sm:ml-64">
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8  px-4 mx-auto lg:py-0">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Company Details</h2>
            <form onSubmit={handleUpdateCompany}>
              <div className="grid gap-4 sm:input grid-cols-4 sm:gap-6">
                <div className="sm:col-span-1">
                  <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Company name"
                    required=""
                    defaultValue={data.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full sm:col-span-1">
                  <label htmlFor="companyAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company Address
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="companyAddress"
                    id="companyAddress"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your Address"
                    required=""
                    defaultValue={data.companyAddress}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyPincode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Pincode
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="number"
                    name="companyPincode"
                    id="companyPincode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required=""
                    defaultValue={data.companyPincode}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyState" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    State
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="companyState"
                    id="companyState"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Uttar Pradesh"
                    required=""
                    defaultValue={data.companyState}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyGSTIN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company GST No.
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="companyGSTIN"
                    id="companyGSTIN"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Uttar Pradesh"
                    required=""
                    defaultValue={data.companyGSTIN}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyPan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Pan No.
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="companyPan"
                    id="companyPan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type PAN no."
                    required=""
                    defaultValue={data.companyPan}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyMobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Mobile No.
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="number"
                    name="companyMobile"
                    id="companyMobile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Mobile number"
                    required=""
                    defaultValue={data.companyMobile}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company Email
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="email"
                    name="companyEmail"
                    id="companyEmail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Email"
                    required=""
                    defaultValue={data.companyEmail}
                  />
                </div>
              </div>
              <hr className="h-px w-full my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Company Bank Details</h2>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label htmlFor="companyBankName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bank Name
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="companyBankName"
                    id="companyBankName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Bank Name"
                    required=""
                    defaultValue={data.companyBankName}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyBankAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bank Address
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="companyBankAddress"
                    id="companyBankAddress"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Bank Address"
                    required=""
                    defaultValue={data.companyBankAddress}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyBankAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bank Account
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="companyBankAccount"
                    id="companyBankAccount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Account No."
                    required=""
                    defaultValue={data.companyBankAccount}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="companyBankIFSC" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bank IFSC
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="companyBankIFSC"
                    id="companyBankIFSC"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type IFSC Code"
                    required=""
                    defaultValue={data.companyBankIFSC}
                  />
                </div>
              </div>
              <button type="submit" onClick={handleUpdateCompany} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Update Changes
              </button>
            </form>
          </div>
        </section>
      </div>

      
    </>
  );
};

export default CompanyEditForm;
