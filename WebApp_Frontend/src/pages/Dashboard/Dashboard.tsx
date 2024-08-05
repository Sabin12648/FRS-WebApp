import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardDataStats from '../../components/CardDataStats';
import useFetchUserData from '../../hooks/userFetchUserData';
import { Link } from 'react-router-dom';
import CardSpinner from '../../components/CardSpinner';
import CreateApplicantModal from '../../components/Modal/create_applicant_modal ';
// import CreateApplicantModal from '../../components/Modal/create_applicant_modal';

const Dashboard: React.FC = () => {
  const { userData = [], error, isLoading } = useFetchUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Retrieve token from localStorage or context
  const token = localStorage.getItem('token'); // Ensure this key matches what you use for storage

  // Log token when the component mounts
  console.log("Token on component mount:", token);

  const openModal = () => {
    // Log token when opening the modal
    console.log("Token when opening modal:", token);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DefaultLayout>
      <>
        <h3 className="text-4xl text-black dark:text-white">
          Welcome to FRS Management System
        </h3>  

        <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Total Uploads" 
            total={isLoading ? <CardSpinner /> : (userData?.length || 0)}
          >
            <Link className='hover:underline' to='/Tables'>View more</Link>
          </CardDataStats>
          <div className='place-content-end'>
            <button
              onClick={openModal} 
              className="h-10 w-50 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {"+ Add Applicant"}
            </button>
          </div>
        </div>

        {isModalOpen && (
          <CreateApplicantModal
            onClose={closeModal}
            isOpen={isModalOpen}
            isEditMode={true}
          />
        )}
      </>
    </DefaultLayout>
  );
};

export default Dashboard;

