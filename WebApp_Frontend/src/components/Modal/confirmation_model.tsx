import React from 'react';
import PhotoComponent from '../PhotoDisplay';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id? : string;
    name?: string;
    mobile_number?: string;
    email?: string;
    address?: string;
    photo_filename?: string;
  } | null;
  // onSave: (user: any) => void; // You might want to replace 'any' with a more specific type
  children?: React.ReactNode; // Add children property
};

const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  user,
  // onSave,
  children
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = React.useState(user || {});

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };


  
  const handleDelete = async () => {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${user?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        onClose(); // Close the modal on successful delete
      } else {
        const errorResult = await response.json();
        console.error(errorResult.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-h-screen overflow-y-auto w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute text-xl top-0 right-2 text-gray-800 hover:text-gray-800"
        >
          &times;
        </button>
        {children}
        <h3 className="text-3xl font-bold text-black mb-5">
                  Do you want to delete this user?
                </h3>
        <div className="grid grid-cols-5 gap-8">
          
          <div className="col-span-5 xl:col-span-3">
          
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>

              <div className="p-7">
                <form>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ''}
                          // onChange={handleChange}
                          disabled={true}
                          className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="mobile_number"
                        value={formData.mobile_number || ''}
                        // onChange={handleChange}
                        disabled={true}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ''}
                      // onChange={handleChange}
                      disabled={true}
                      className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email || ''}
                      // onChange={handleChange}
                      disabled={true}
                      className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                 
                    {/* <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Delete
                    </button> */}
                  
                </form>
                
              </div>
            </div>
            {/* <div className='flex gap-x-10'> */}
           
                    {/* <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-10"
                    >
                      Cancel
                    </button> */}
            {/* </div> */}
          
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Photo
                </h3>
              </div>
              <div className="p-7">
                <PhotoComponent photoFilename={formData.photo_filename || ''} />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end'>

        <button
                      type="button"
                      onClick={handleDelete}
                      className="px-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-10"
                    >
                      Delete
                    </button>
        </div>
        
      </div>
    </div>
  );
};

export default ConfirmationModal;
