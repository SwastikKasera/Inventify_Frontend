import React, {useEffect, useState} from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";


const ViewSale = () => {
  const token = Cookies.get("JWT_token");
  const decode = jwtDecode(token);
  const [saleData, setsaleData] = useState([]);
  const [saleId, setsaleId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saledData = async () => {
      try {
        const resp = await axios.get(`http://localhost:4000/s/get/${decode.companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (resp.data.info.length > 0) {
          setsaleData(resp.data.info);
        } else {
          toast.error("Sale Data Not Found");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    saledData();
  }, []);

  const handleViewClick = (saleId) => {
    const selectedSale = saleId
    navigate("/viewpdf", {
        state: {
          saleData: selectedSale,
        }
      });
  };

  const openModal = (modalId)=>{
    const modal = document.getElementById(modalId)
    if(modal){
        modal.classList.remove('hidden')
    }
  }
  const closeModal = (modalId)=>{
    const modal = document.getElementById(modalId)
    if(modal){
        modal.classList.add('hidden')
    }
  }
  const handleConfirmDelete = async(saleId)=>{
    try {
        const deleteSale = await axios.delete(`http://localhost:4000/s/delete/${saleId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        if(deleteSale){
            closeModal('popup-modal')
            setsaleData((prevData) => prevData.filter((sale) => sale._id !== saleId));
            toast.success('Sale Deleted Success')
        }else{
            toast.error('Unable to delete Sale')
        }
    } catch (error) {
        return toast.error('Error in deleting sale')
    }
  }

  const handleDeleteClick = (id)=>{
    setsaleId(id);
    openModal('popup-modal')
  }
  const handleCancelDelete = ()=>{
    setsaleId(null);
    closeModal('popup-modal')
  }
  return (
    <>
      <Sidebar />
      <div className="ml-64 px-4 py-4">
        <p className="text-2xl mb-4 font-semibold text-gray-900 dark:text-white">View All Sales</p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-white">
            <thead className="text-xs text-secondary uppercase bg-gray-50 dark:bg-deeperGreen dark:text-secondary">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Bill No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Bill date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Total Item
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Total Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Gst
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  View Bill
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {saleData.map((sale, index) => (
                <tr
                  className="bg-white border-b dark:bg-darkGreen dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-deeperGreen"
                  key={sale._id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-secondary">
                    {sale.saleBillId}
                  </th>
                  <td className="px-6 py-4">{sale.saleDate}</td>
                  <td className="px-6 py-4">{sale.totalSaledItem}</td>
                  <td className="px-6 py-4">{sale.saleNetAmount}</td>
                  <td className="px-6 py-4">{sale.saleSGSTAmount}</td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-primary dark:text-primary hover:underline" 
                      onClick={() => handleViewClick(sale._id)}
                    >
                      View
                    </button>
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      // onClick={() => openEditModal(item._id, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleDeleteClick(sale._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div id="popup-modal" tabIndex="-1" className="fixed flex inset-0 items-center justify-center z-50 hidden overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-80">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-darkGreen shadow dark:bg-darkGreen">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-deeperGreen dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={handleCancelDelete}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-secondary">Are you sure you want to delete this product?</h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-black bg-primary focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => handleConfirmDelete(saleId)}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="bg-white focus:ring-4 focus:outline-none focus:ring-gray-200  border border-gray-200 text-sm font-bold px-5 py-2.5 focus:z-10 dark:bg-deeperGreen dark:text-white dark:border-white hover:opacity-90 dark:focus:ring-gray-600"
                onClick={handleCancelDelete}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSale;
