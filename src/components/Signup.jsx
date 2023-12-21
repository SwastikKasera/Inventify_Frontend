import axios from "axios";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

const Signup = () => {
  const [companyRegister, setcompanyRegister] = useState({
    companyName: "",
    companyAddress: "",
    companyState: "",
    companyPincode: "",
    companyPan: "",
    companyGSTIN: "",
    companyPassword: "",
    confirmPassword: "",
    companyMobile: "",
    companyEmail: "",
    companyBankName: "",
    companyBankAddress: "",
    companyBankAccount: "",
    companyBankIFSC: "",
    companyMark: "",
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setcompanyRegister((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(companyRegister);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (companyRegister.companyPassword !== companyRegister.confirmPassword) {
        return toast.error("Password Not Match");
      }
      const data = axios.post("http://localhost:4000/signup", companyRegister);
      if (data) {
        toast.success("Company Registered Success");
      } else {
        toast.error("Company Fail to Register");
      }
    } catch (error) {
      toast.error("Error in Registering Company");
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-deeperGreen">
        <div className="w-full max-w-2xl p-6 text-white bg-darkGreen  shadow-md">
          <h2 className="text-2xl text-primary font-semibold mb-4">Register</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <label
                  htmlFor="companyName"
                  className="block mb-1 font-medium">
                  Comapny Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  placeholder="myCompany"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="companyMark"
                  className="block mb-1 font-medium">
                  Comapny Mark
                </label>
                <input
                  type="text"
                  name="companyMark"
                  id="companyMark"
                  placeholder="Mark"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="companyEmail"
                  id="email"
                  placeholder="email@company.com"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="password"
                  className="block mb-1 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="companyPassword"
                  id="password"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="address"
                  className="block mb-1 font-medium">
                  Pincode
                </label>
                <input
                  id="address"
                  name="companyPincode"
                  placeholder="226021"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                  rows="4"
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="companyState"
                  className="block mb-1 font-medium">
                  State
                </label>
                <input
                  id="companyState"
                  name="companyState"
                  placeholder="Uttar Pradesh"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                  rows="4"
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="companyGST"
                  className="block mb-1 font-medium">
                  GST No.
                </label>
                <input
                  id="companyGST"
                  placeholder="09AMTPKAIO09J"
                  name="companyGSTIN"
                  maxLength="15"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                  rows="4"
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="companyPAN"
                  className="block mb-1 font-medium">
                  PAN
                </label>
                <input
                  id="companyPAN"
                  placeholder="AMTPNLIA8U3B"
                  name="companyPan"
                  maxLength="10"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                  rows="4"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="companyAddress"
                  className="block mb-1 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  name="companyAddress"
                  placeholder="123 Street"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="companyMobile"
                  className="block mb-1 font-medium">
                  Phone
                </label>
                <input
                  id="companyMobile"
                  placeholder="9876543210"
                  name="companyMobile"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                  rows="4"
                />
              </div>
            </div>
            <hr className="mt-6 opacity-60" />
            <h2 className="text-primary text-lg py-2">Bank Details</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label
                  htmlFor="companyAddress"
                  className="block mb-1 font-medium">
                  Bank Name
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  name="companyBankName"
                  placeholder="123 Street"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="companyAddress"
                  className="block mb-1 font-medium">
                  Account No.
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  placeholder="123 Street"
                  name="companyBankAccount"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="companyAddress"
                  className="block mb-1 font-medium">
                  IFSC Code
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  name="companyBankIFSC"
                  placeholder="123 Street"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="companyAddress"
                  className="block mb-1 font-medium">
                  Branch
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  name="companyBankAddress"
                  placeholder="123 Street"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border  text-secondary border-secondary bg-darkGreen placeholder:text-lightGreen"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bg-primary text-black font-bold  hover:opacity-90 ">
              Register
            </button>
          </form>
          <p className="text-sm mt-2 font-light text-white dark:text-white">
            Already Registered?{" "}
            <Link
              to="/"
              className="font-medium text-primary hover:underline dark:text-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
