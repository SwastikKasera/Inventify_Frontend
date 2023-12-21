import React, {useEffect, useState} from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const ViewCustomer = () => {
  const [customerData, setcustomerData] = useState([]);
  const [SelectedCustId, setSelectedCustId] = useState(null);
  const [refreshModal, setRefreshModal] = useState(false);
  const [custIndex, setCustIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  const token = Cookies.get("JWT_token");
  useEffect(() => {
    const fetchCustomer = async () => {
      const fetchData = await axios.get("http://localhost:4000/c/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (fetchData) {
        setcustomerData(fetchData.data.f_data);
      }
    };
    fetchCustomer();
  }, []);

  //   Modal Functions
  const handleCancelDelete = () => {
    setSelectedCustId(null);
    setCustIndex(null);
    closeModal();
  };

  // Utility functions
  const closeModal = () => {
    hideModal("popup-modal");
  };
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const deleted = await axios.delete(`http://localhost:4000/c/delete/${SelectedCustId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (deleted) {
        // Create a copy of the customerData array
        const updatedCustomerData = customerData.filter(
          (customer) => customer._id !== SelectedCustId
        );
        // Update the state with the new array
        setcustomerData(updatedCustomerData);
  
        hideModal("popup-modal");
        return toast.success("Customer Deleted");
      } else {
        return toast.error("Customer Not Deleted");
      }
    } catch (error) {
      return toast.error("Error in deleting customer");
    }
  };
  const handleDeleteClick = (custId) => {
    setSelectedCustId(custId);
    openModal("popup-modal");
  };
  const hideModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
    }
  };

  const openEditModal = (custId, index) => {
    setCustIndex(index);
    setSelectedCustId(custId);
    setRefreshModal(true);
    if (index >= 0 && index < customerData.length) {
      setCustIndex(index);
      setEditedData({
        customerName: customerData[index].customerName,
        customerAddress: customerData[index].customerAddress,
        customerEmail: customerData[index].customerEmail,
        customerMobile: customerData[index].customerMobile,
        customerGSTIN: customerData[index].customerGSTIN,
      });
    }
  };

  const closeEditModal = () => {
    setCustIndex(null);
    setEditedData({});
    setRefreshModal(false);
  };

  const handleEditChange = (e) => {
    const {name, value} = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirmEdit = async (e) => {
    e.preventDefault();
    if (custIndex !== null) {
      try {
        const edited = await axios.put(`http://localhost:4000/c/update/${customerData[custIndex]._id}`, editedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (edited) {
          // Create a copy of the customerData array
          const updatedCustomerData = [...customerData];
          // Update the edited customer's data in the array
          updatedCustomerData[custIndex] = {
            ...updatedCustomerData[custIndex],
            ...editedData,
          };
          // Update the state with the new array
          setcustomerData(updatedCustomerData);

          closeEditModal();
          return toast.success("Customer Edited");
        } else {
          return toast.error("Customer Not Edited");
        }
      } catch (error) {
        return toast.error("Error in editing customer");
      }
    }
  };

  const handleCancelEdit = () => {
    setCustIndex(null);
    setSelectedCustId(null);
    closeEditModal();
  };
  return (
    <>
      <Sidebar />
      <div className="px-4 sm:ml-64">
        <p className="text-2xl mb-4 font-semibold text-gray-900 dark:text-white">View All Customers</p>
        <div className="relative overflow-x-auto shadow-md sm:">
          <table className="w-full text-sm text-left text-gray-500 dark:text-white">
            <thead className="text-xs text-secondary uppercase bg-gray-50 dark:bg-deeperGreen dark:text-secondary">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Customer Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Customer Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Customer Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Customer Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Customer GST
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((c, index) => (
                <tr
                  className="bg-white border-b dark:bg-darkGreen dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-deeperGreen"
                  key={c._id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-secondary">
                    {c.customerName}
                  </th>
                  <td className="px-6 py-4">{c.customerAddress}</td>
                  <td className="px-6 py-4">{c.customerEmail}</td>
                  <td className="px-6 py-4">{c.customerMobile}</td>
                  <td className="px-6 py-4">{c.customerGSTIN}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => openEditModal(c._id, index)}>
                      Edit
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleDeleteClick(c._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Delete modal */}
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed flex inset-0 items-center justify-center z-50 hidden overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-80">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-darkGreen shadow dark:bg-darkGreen">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-deeperGreen dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={handleCancelDelete}>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-secondary">Are you sure you want to delete this product?</h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-black bg-primary focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={handleConfirmDelete}>
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="bg-white focus:ring-4 focus:outline-none focus:ring-gray-200  border border-gray-200 text-sm font-bold px-5 py-2.5 focus:z-10 dark:bg-deeperGreen dark:text-white dark:border-white hover:opacity-90 dark:focus:ring-gray-600"
                  onClick={handleCancelDelete}>
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Edit modal */}
        {refreshModal && (
          <div
            id="editUserModal"
            tabIndex={-1}
            aria-hidden="true"
            className={`ml-64 ${refreshModal ? "" : "hidden"}fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-80 md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative w-full max-w-2xl max-h-full">
              {/* Modal content */}
              <form
                onSubmit={handleConfirmEdit}
                className="relative bg-white shadow dark:bg-darkGreen">
                {/* Modal header */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-secondary">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Item</h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900  text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="editUserModal"
                    onClick={closeEditModal}>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="customerName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        id="customerName"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-darkGreen dark:border-secondary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required=""
                        onChange={handleEditChange}
                        defaultValue={custIndex !== null ? customerData[custIndex].customerName : ""}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="customerAddress"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer Address
                      </label>
                      <input
                        type="text"
                        name="customerAddress"
                        id="customerAddress"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-darkGreen dark:border-secondary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required=""
                        onChange={handleEditChange}
                        defaultValue={custIndex !== null ? customerData[custIndex].customerAddress : ""}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="customerEmail"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer Email
                      </label>
                      <input
                        type="email"
                        name="customerEmail"
                        id="customerEmail"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-darkGreen dark:border-secondary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example@company.com"
                        required=""
                        onChange={handleEditChange}
                        defaultValue={custIndex !== null ? customerData[custIndex].customerEmail : ""}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="customerMobile"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer Phone
                      </label>
                      <input
                        type="tel"
                        name="customerMobile"
                        id="customerMobile"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-darkGreen dark:border-secondary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. +(12)3456 789"
                        required=""
                        onChange={handleEditChange}
                        defaultValue={custIndex !== null ? customerData[custIndex].customerMobile : ""}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="customerGSTIN"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer GST No.
                      </label>
                      <input
                        type="text"
                        name="customerGSTIN"
                        id="customerGSTIN"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 dark:bg-darkGreen dark:border-secondary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={123456}
                        required=""
                        onChange={handleEditChange}
                        defaultValue={custIndex !== null ? customerData[custIndex].customerGSTIN : ""}
                      />
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-black focus:ring-4 font-bold text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary dark:hover:opacity-90 focus:outline-none">
                    Save all
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className=" border border-secondary font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-secondary dark:text-white dark:hover:text-white">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewCustomer;
