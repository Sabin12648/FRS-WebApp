
import React, { useState } from 'react';
import Modal from '../Modal/view_applicant_modal';
import PhotoComponent from '../PhotoDisplay';
import ConfirmationModal from '../Modal/confirmation_model';
import useFetchUserData from '../../hooks/userFetchUserData';
import Spinner from '../Spinner';

type User = {
  applicantId: number;
  name: string;
  address: string;
  email: string;
  phone_number: string;
  photo_filename: string;
  [key: string]: any;
};

const ApplicantData: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    // applicantId: '',
    filename: '',
    // phone_number: '',
    // email: '',
    // address: '',
  });
  const itemsPerPage = 20;

  const { userData = [], error, isLoading } = useFetchUserData();

  if (isLoading) {
    return <Spinner />;  // Show spinner while loading
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const filterData = () => {
    return userData?.filter(user => {
      return (
        // (!searchParams.applicantId || user.applicantId.toString().includes(searchParams.applicantId)) &&
        (!searchParams.filename || user.photo_filename.toLowerCase().includes(searchParams.filename.toLowerCase())) 
        // (!searchParams.address || user.address.toLowerCase().includes(searchParams.address.toLowerCase())) &&
        // (!searchParams.email || user.email.toLowerCase().includes(searchParams.email.toLowerCase())) &&
        // (!searchParams.phone_number || user.phone_number.includes(searchParams.phone_number))
      );
    });
  };

  const filteredData = filterData();
  const totalPages = Math.ceil((filteredData?.length ?? 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData?.slice(startIndex, startIndex + itemsPerPage);
  console.log("current data", currentData);

  const openModal = (user: User, editMode = false) => {
    setCurrentUser(user);
    setIsEditMode(editMode);
    setIsModalOpen(true);
  };

  const openConfirmationModal = (user: User) => {
    setCurrentUser(user);
    setIsConfirmationModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleSave = (updatedUser: User) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(`http://192.168.1.121:5000/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        return response.json();
      })
      .then(data => {
        // Update logic here if needed
      })
      .catch(error => console.error('Error updating user:', error));

    closeModal();
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {isFormVisible && (
        <form className="mb-4">
          Search Filename here
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {/* <input
              type="text"
              name="applicantId"
              value={searchParams.applicantId}
              onChange={handleInputChange}
              placeholder="Applicant ID"
              className="px-4 py-2 border rounded"
            /> */}
            <input
              type="text"
              name="filename"
              value={searchParams.filename}
              onChange={handleInputChange}
              placeholder="Name"
              className="px-4 py-2 border rounded"
            />
            {/* <input
              type="text"
              name="address"
              value={searchParams.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="px-4 py-2 border rounded"
            /> */}
            {/* <input
              type="text"
              name="email"
              value={searchParams.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="px-4 py-2 border rounded"
            /> */}
            {/* <input
              type="text"
              name="phone_number"
              value={searchParams.phone_number}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="px-4 py-2 border rounded"
            /> */}
          </div>
        </form>
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4 border-b border-gray-300">
              <th className="py-4 px-4 font-medium text-black dark:text-white"></th>
              <th className="min-w-[220px] py-4 px-4 font-large text-black xl:pl-11">
                Applicant ID
              </th>
              <th className="min-w-[220px] py-4 px-4 font-large text-black xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 font-large text-black">
                Address
              </th>
              <th className="min-w-[120px] py-4 px-4 font-large text-black">
                Email
              </th>
              <th className="py-4 px-4 font-large text-black">
                Phone Number
              </th>
              <th className="py-4 px-4 font-large text-black ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((user, index) => (
              <tr key={index} className='border-b border-gray-300'>
                <td className="grid py-5 place-items-center">
                  <div className="rounded-full overflow-hidden border border-black-500 h-25 w-25 self-center ">
                    <PhotoComponent photoFilename={user.photo_filename} />
                  </div>
                </td>
                <td className="py-5 pl-9 xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.applicantId}
                  </h5>
                </td>
                <td className="py-5 pl-9 xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.photo_filename}
                  </h5>
                </td>
                <td className="py-5">
                  <p className="text-black dark:text-white">
                    {user.address}
                  </p>
                </td>
                <td className="py-5 px-4">
                  <p className="text-black dark:text-white">
                    {user.email}
                  </p>
                </td>
                <td className="py-5 px-4">
                  <p className="text-black dark:text-white">
                    {user.phone_number}
                  </p>
                </td>
                <td className="py-5 px-4">
                  <div className="flex items-center space-x-1">
                    <button className="hover:text-primary" onClick={() => openModal(user, false)}>
                    <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM2.16855 9C3.0873 10.5687 5.3623 13.4187 9 13.4187C12.6373 13.4187 14.9123 10.5687 15.8311 9C14.9123 7.43124 12.6373 4.58124 9 4.58124C5.3623 4.58124 3.0873 7.43124 2.16855 9Z"
                          fill=""
                        />
                        <path
                          d="M9 11.625C7.73125 11.625 6.7075 10.6012 6.7075 9.33249C6.7075 8.06374 7.73125 7.03999 9 7.03999C9.2325 7.03999 9.45001 7.24374 9.45001 7.49999C9.45001 7.75624 9.2325 7.95999 9 7.95999C8.2325 7.95999 7.6275 8.56499 7.6275 9.33249C7.6275 10.1 8.2325 10.705 9 10.705C9.7675 10.705 10.3725 10.1 10.3725 9.33249C10.3725 9.11874 10.5562 8.93499 10.77 8.93499C10.9838 8.93499 11.1675 9.11874 11.1675 9.33249C11.1675 10.6012 10.1438 11.625 9 11.625Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary" onClick={() => openModal(user, true)}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.57495 12.68L1.6437 16.0513C1.59 16.2363 1.6437 16.4363 1.78745 16.56C1.85245 16.625 1.93995 16.6613 2.03245 16.6613C2.0687 16.6613 2.1112 16.6613 2.14745 16.6475L5.5187 15.7163L14.7375 6.4975L11.5025 3.2625L2.57495 12.68ZM5.0662 15.1163L2.67745 15.8225L3.3837 13.4338L9.3602 7.4575L11.5025 9.59999L5.0662 15.1163ZM16.0112 3.3775L14.6237 1.99C14.1849 1.55125 13.515 1.55125 13.0762 1.99L11.985 3.08125L15.22 6.31625L16.3112 5.22499C16.75 4.78625 16.75 4.11625 16.3112 3.6775H16.0112Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary" onClick={() => openConfirmationModal(user)}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.4375 4.005L14.0062 0.57375C13.485 0.0525 12.6537 0.0525 12.1325 0.57375L1.05124 11.655C0.877491 11.8287 0.758741 12.055 0.707491 12.3025L0.0187406 15.8412C-0.0187594 16.03 0.0474906 16.2212 0.180991 16.3537C0.287241 16.46 0.425991 16.5112 0.574991 16.5112C0.610991 16.5112 0.652491 16.5075 0.688741 16.4987L4.22749 15.81C4.47499 15.7587 4.70124 15.64 4.87499 15.4662L15.9562 4.385C16.4775 3.86375 16.4775 3.0325 15.9562 2.51125L17.4375 4.005ZM4.22749 14.2662L1.58099 14.7837L2.09874 12.1375L11.3487 2.8875L13.6125 5.15125L4.22749 14.2662ZM15.0187 3.47499L14.0575 4.43625L11.7937 2.1725L12.755 1.21125C12.8487 1.1175 12.9902 1.1175 13.084 1.21125L15.5152 3.64249C15.6087 3.73625 15.6087 3.8775 15.5152 3.97125H15.0187Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
     <div className="flex justify-between items-center mt-4">
         <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
          >
            Next
          </button>
        </div>
      </div>

      {isModalOpen && currentUser && (
        <Modal
          isOpen={isModalOpen}
          user={currentUser}
          onClose={closeModal}
          onSave={handleSave}
          isEditMode={isEditMode}
        />
      )}

      {isConfirmationModalOpen && currentUser && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          user={currentUser}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={() => {
            // Confirm delete logic here
            setIsConfirmationModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ApplicantData;

