import React, { useEffect, useState } from 'react';
import Modal from '../Modal/view_modal';
import PhotoComponent from '../PhotoDisplay';

type User = {
  name: string;
  address: string;
  email: string;
  mobile_number: string;
  photo_filename: string;
  [key: string]: any;
};

const TableThree: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    fetch('http://127.0.0.1:5000/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) { 
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          throw new Error('Received empty response from server');
        }
        setUserData(data);
      })
      .catch(error => console.error('Error fetching or processing user data:', error));
  }, []);

  const openModal = (user: User, editMode = false) => {
    setCurrentUser(user);
    setIsEditMode(editMode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  // const handleSave = (updatedUser: User) => {
  //   // Logic to save the updated user details goes here
  //   console.log('Updated User:', updatedUser);
  //   closeModal();
  // };

  const handleSave = (updatedUser: User) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    fetch(`http://127.0.0.1:5000/users/${updatedUser.id}`, {
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
        console.log('User updated successfully:', data);
        // Assuming the response contains the updated user data, update userData state
        setUserData(prevUserData =>
          prevUserData.map(user => (user.id === updatedUser.id ? data : user))
        );
      })
      .catch(error => console.error('Error updating user:', error));
  
    closeModal();
  };
  
  
console.log("currentuser",currentUser)
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white"></th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">
                Address
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Phone Number
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index} className='border-b border-gray-300'>
                <td className="grid py-5 place-items-center">
                  <div className="rounded-full overflow-hidden border border-black-500 h-25 w-25 self-center ">
                  <PhotoComponent photoFilename={user.photo_filename} /></div>
                </td>
                <td className="py-5 pl-9 xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.name}
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
                    {user.mobile_number}
                  </p>
                </td>
                <td className="py-5 px-4">
                  <div className="flex items-center space-x-3.5">
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
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM2.20606 9C3.01856 10.525 5.43106 13.4594 9 13.4594C12.5686 13.4594 14.9811 10.525 15.7936 9C14.9811 7.475 12.5686 4.54062 9 4.54062C5.43106 4.54062 3.01856 7.475 2.20606 9ZM9 11.3906C7.67806 11.3906 6.60931 10.3219 6.60931 9C6.60931 7.67812 7.67806 6.60937 9 6.60937C10.3218 6.60937 11.3906 7.67812 11.3906 9C11.3906 10.3219 10.3218 11.3906 9 11.3906ZM9 7.87499C8.36743 7.87499 7.87493 8.36749 7.87493 8.99999C7.87493 9.63249 8.36743 10.125 9 10.125C9.63255 10.125 10.1251 9.63249 10.1251 8.99999C10.1251 8.36749 9.63255 7.87499 9 7.87499Z"
                          fill="currentColor"
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
                          d="M2.25 13.5V15.75H4.5L12.315 7.935L10.065 5.685L2.25 13.5ZM14.6925 5.5575C14.8687 5.38127 14.8687 5.10874 14.6925 4.9325L13.0675 3.3075C12.8913 3.13127 12.6187 3.13127 12.4425 3.3075L11.25 4.5L13.5 6.75L14.6925 5.5575Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && currentUser && (
          <Modal
            isOpen={isModalOpen}
            user={currentUser}
            onClose={closeModal}
            isEditMode={isEditMode}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default TableThree;

