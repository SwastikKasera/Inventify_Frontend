import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const ViewCompany = () => {
  const [companyList, setcompanyList] = useState([]);
  const [compId, setcompId] = useState(null);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const handleOpenDeleteModal = () => {
  //     setIsDeleteModalOpen(true);
  //   };
  //   const handleCloseDeleteModal = () => {
  //     setIsDeleteModalOpen(false);
  //   };
  const handleDeleteClick = (companyId) => {
    openModal("popup-modal");
    setcompId(companyId);
  };
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
  const handleConfirmDelete = async (compId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/company/deleteCompany/${compId}`);
      const updatedList = companyList.filter((comp) => comp._id !== compId);
        setcompanyList(updatedList)
      if (response.status === 200 || response.status === 201) {
        toast.success("Company Deleted Successfully!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        closeModal();
        // You might want to redirect the user to a different page after deletion
      } else {
        toast.error("Delete Failed", {
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
      toast.error("Error in Deleting", {
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

  useEffect(() => {
    const companyData = async () => {
      try {
        const resp = await axios.get("http://localhost:4000/company/getCompany");
        setcompanyList(resp.data.fetchedCompany);
        console.log(resp.data.fetchedCompany);
      } catch (error) {
        console.log("error in fetching");
      }
    };
    companyData();
  }, []);

  return (
    <>
      <div className="px-4 sm:ml-64">
        <p className="text-2xl mb-4 font-semibold text-gray-900 dark:text-white">View Company</p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  GST No.
                </th>
                <th scope="col" className="px-6 py-3">
                  PAN No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Bank Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Bank Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Bank Account
                </th>
                <th scope="col" className="px-6 py-3">
                  Bank IFSC
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {companyList.map((company, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={company._id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {company.companyName}
                  </th>
                  <td className="px-6 py-4">{company.companyAddress}</td>
                  <td className="px-6 py-4">{company.companyGSTIN}</td>
                  <td className="px-6 py-4">{company.companyPan}</td>
                  <td className="px-6 py-4">{company.companyMobile}</td>
                  <td className="px-6 py-4">{company.companyBankName}</td>
                  <td className="px-6 py-4">{company.companyBankAddress}</td>
                  <td className="px-6 py-4">{company.companyBankAccount}</td>
                  <td className="px-6 py-4">{company.companyBankIFSC}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      <Link to={`/edit/${company._id}`}>Edit</Link>
                    </button>
                    <button onClick={() => handleDeleteClick(company._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Confirmation Popup */}

      <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center z-50 hidden overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-80">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={closeModal}
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
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => handleConfirmDelete(compId)}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={closeModal}
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

export default ViewCompany;
