import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import jwtDecode from 'jwt-decode';
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Sidebar from "../Sidebar";
const token = Cookies.get('JWT_token')


const ViewItem = () => {
  // State variables
  const [itemList, setItemList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);
  const [refreshModal, setRefreshModal] = useState(false);
  const [itemEditData, setItemEditData] = useState({
    itemName: "",
    itemHSNcode: "",
    itemTax: "",
    itemCGST: "",
    itemSGST: "",
  });

  // Fetch item data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken);
        const response = await axios.get(`http://localhost:4000/i/getItem/${decodedToken.companyId}`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setItemList(response.data.fetchedItem);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Delete item handling
  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    openModal("popup-modal");
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/i/deleteItem/${selectedItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      const updatedList = itemList.filter((item) => item._id !== selectedItemId);
      setItemList(updatedList);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit item handling
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setItemEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirmEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/i/updateItem/${selectedItemId}`,
        itemEditData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Item Edited successfully!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Update item list with edited data
        setItemList((prevItemList) =>
          prevItemList.map((item) =>
            item._id === selectedItemId
              ? {
                  ...item,
                  itemName: itemEditData.itemName,
                  itemHSNcode: itemEditData.itemHSNcode,
                  itemTax: itemEditData.itemTax,
                  itemCGST: itemEditData.itemCGST,
                  itemSGST: itemEditData.itemSGST,
                }
              : item
          )
        );
      } else {
        toast.error("Item Not Edited!", {
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
      closeEditModal();
    } catch (error) {
      console.log("error is: ", error);
      toast.error("Error in Editing Toast", {
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

  // Cancel delete handling
  const handleCancelDelete = () => {
    setSelectedItemId(null);
    setItemIndex(null);
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

  const hideModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
    }
  };

  // Edit modal handling
  const openEditModal = (itemId, index) => {
    setSelectedItemId(itemId);
    setItemIndex(index);
    setRefreshModal(true);

    // Populate edit form with selected item data
    const selectedItem = itemList[index];
    setItemEditData({
      itemName: selectedItem.itemName,
      itemHSNcode: selectedItem.itemHSNcode,
      itemTax: selectedItem.itemTax,
      itemCGST: selectedItem.itemCGST,
      itemSGST: selectedItem.itemSGST,
    });

    openModal("editUserModal");
  };

  const handleCancelEdit = () => {
    closeEditModal();
    setRefreshModal(false);
  };

  const closeEditModal = () => {
    hideModal("editUserModal");
    setItemEditData({
      itemName: "",
      itemHSNcode: "",
      itemTax: "",
      itemCGST: "",
      itemSGST: "",
    });
    setRefreshModal(false);
  };

  return (
    <>
    <Sidebar/>
      <div className="px-4 sm:ml-64">
        <p className="text-2xl mb-4 font-semibold text-gray-900 dark:text-white">View All Items</p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-white">
            <thead className="text-xs text-secondary uppercase bg-gray-50 dark:bg-deeperGreen dark:text-secondary">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Item name
                </th>
                <th scope="col" className="px-6 py-3">
                  HSN/SAC Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Tax %
                </th>
                <th scope="col" className="px-6 py-3">
                  CGST
                </th>
                <th scope="col" className="px-6 py-3">
                  SGST
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item, index) => (
                <tr className="bg-white border-b dark:bg-darkGreen dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-deeperGreen" key={item._id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-secondary">
                    {item.itemName}
                  </th>
                  <td className="px-6 py-4">{item.itemHSNcode}</td>
                  <td className="px-6 py-4">{item.itemTax}</td>
                  <td className="px-6 py-4">{item.itemCGST}</td>
                  <td className="px-6 py-4">{item.itemSGST}</td>
                  <td className="px-6 py-4">{item.itemSlug}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => openEditModal(item._id, index)}>
                      Edit
                    </button>
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDeleteClick(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Modal start here */}
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
                onClick={handleConfirmDelete}
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
      {/* edit modal start here */}
      {refreshModal && (<div id="editUserModal" tabIndex={-1} aria-hidden="true" className={`ml-64 ${refreshModal ? "" : "hidden"}fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-80 md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <form onSubmit={handleConfirmEdit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Item</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="editUserModal"
                onClick={closeEditModal}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="itemName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    id="itemName"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
                    onChange={handleEditChange}
                    defaultValue={itemIndex !== null ? itemList[itemIndex].itemName : ""}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="itemHSNcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    HSN/SAC Code
                  </label>
                  <input
                    type="text"
                    name="itemHSNcode"
                    id="itemHSNcode"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
                    onChange={handleEditChange}
                    defaultValue={itemIndex !== null ? itemList[itemIndex].itemHSNcode : ""}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="itemTax" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Item Tax
                  </label>
                  <input
                    type="number"
                    name="itemTax"
                    id="itemTax"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@company.com"
                    required=""
                    onChange={handleEditChange}
                    defaultValue={itemIndex !== null ? itemList[itemIndex].itemTax : ""}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="itemCGST" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Item CGST
                  </label>
                  <input
                    type="number"
                    name="itemCGST"
                    id="itemCGST"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. +(12)3456 789"
                    required=""
                    onChange={handleEditChange}
                    defaultValue={itemIndex !== null ? itemList[itemIndex].itemTax / 2 : ""}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="itemCGST" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Item SGST
                  </label>
                  <input
                    type="number"
                    name="itemCGST"
                    id="itemSGST"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={123456}
                    required=""
                    onChange={handleEditChange}
                    defaultValue={itemIndex !== null ? itemList[itemIndex].itemTax / 2 : ""}
                  />
                </div>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save all
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>)}
    </>
  );
};

export default ViewItem;
