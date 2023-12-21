import React, {useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Item/style.css"
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "../Sidebar";


const ItemForm = () => {
  const [itemFormData, setitemFormData] = useState({
    itemName: "",
    itemHSNcode: "",
    itemTax: "",
    itemCGST: "",
    itemSGST: "",
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    if (name === "itemTax") {
      const taxValue = parseFloat(value);
      const cgstValue = taxValue?(taxValue / 2).toFixed(2):0; // Calculate half of the tax value
      const sgstValue = cgstValue; // SGST is the same as CGST

      document.getElementById("itemCGST").value = cgstValue;
      document.getElementById("itemSGST").value = sgstValue;
      setitemFormData((prevData) => ({
        ...prevData,
        [name]: value,
        itemCGST: cgstValue,
        itemSGST: sgstValue
      }));
    }else{
      setitemFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmitItem = async (event) => {
    event.preventDefault();
    console.log(itemFormData);
    const token = Cookies.get('JWT_token')
    try {
      const response = await axios.post("http://localhost:4000/i/createItem", itemFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      console.log(response);

      if (response.status === 201 || response.status === 200) {
        toast.success("Item added successfully!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        
        setitemFormData({
          itemName: "",
          itemHSNcode: "",
          itemTax: "",
          itemCGST: "",
          itemSGST: "",
        })
        clearValue()
      } else {
        toast.error("Item Not Added!", {
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
      console.log("error is: ", error.message);
      toast.error("Error in Adding Toast", {
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
  };

  function clearValue() {
    const name = document.getElementById('itemName')
    const hsncode = document.getElementById('itemHSNcode')
    const tax = document.getElementById('itemTax')
    const cgst = document.getElementById('itemCGST')
    const sgst = document.getElementById('itemSGST')
    name.value = '' 
    hsncode.value = '' 
    tax.value = ''
    cgst.value = 0
    sgst.value = 0
  }

  return (
    <>
    <Sidebar/>
      <div className="sm:ml-64">
        <section className="bg-darkGreen h-full">
          <div className="py-8 px-4 mx-auto lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new item</h2>
            <form onSubmit={handleSubmitItem}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label htmlFor="itemname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    id="itemName"
                    className="bg-darkGreen border placeholder:text-lightGreen border-gray-300 text-secondary text-sm font-bold block w-full p-2.5 "
                    placeholder="Type product name"
                    onChange={handleInputChange}
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="itemHSNcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    HSN/SAC Code
                  </label>
                  <input
                    type="text"
                    name="itemHSNcode"
                    id="itemHSNcode"
                    className="bg-darkGreen border placeholder:text-lightGreen border-gray-300 text-secondary text-sm font-bold block w-full p-2.5 "
                    placeholder="56730"
                    onChange={handleInputChange}
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="itemTax" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tax
                  </label>
                  <input
                    type="number"
                    name="itemTax"
                    id="itemTax"
                    className="bg-darkGreen border placeholder:text-lightGreen border-gray-300 text-secondary text-sm font-bold block w-full p-2.5 "
                    placeholder="18"
                    onChange={handleInputChange}
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="itemCGST" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    CGST
                  </label>
                  <input
                    type="number"
                    name="itemCGST"
                    id="itemCGST"
                    className="bg-darkGreen border placeholder:text-lightGreen border-gray-300 text-secondary text-sm font-bold block w-full p-2.5 "
                    placeholder="2999"
                    onChange={handleInputChange}
                    required
                    
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="itemSGST" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    SGST
                  </label>
                  <input
                    type="number"
                    name="itemSGST"
                    id="itemSGST"
                    className="bg-darkGreen border placeholder:text-lightGreen border-gray-300 text-secondary text-sm font-bold block w-full p-2.5 "
                    placeholder="2999"
                    onChange={handleInputChange}
                    required=""
                    
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-bold text-center text-black bg-primary hover:bg-primary hover:opacity-90 focus:ring-4 focus:ring-primary-200">
                Add Item
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ItemForm;
