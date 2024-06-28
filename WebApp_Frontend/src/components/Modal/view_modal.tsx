import React from 'react';
import PhotoComponent from '../PhotoDisplay';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name?: string;
    mobile_number?: string;
    email?: string;
    address?: string;
    photo_filename?: string;
  } | null;
  isEditMode: boolean;
  onSave: (user: any) => void; // You might want to replace 'any' with a more specific type
  children?: React.ReactNode; // Add children property
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  user,
  isEditMode,
  onSave,
  children
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = React.useState(user || {});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  
  const handleSave = () => {
    const updatedUser = { ...formData }; // Save the updated user
    onSave(updatedUser);
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
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {isEditMode ? 'Edit' : 'View'} Personal Information
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
                          onChange={handleChange}
                          disabled={!isEditMode}
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
                        onChange={handleChange}
                        disabled={!isEditMode}
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
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                {isEditMode ? (<h3 className="font-medium text-black dark:text-white">
                  Edit your photo
                </h3>) : (<h3 className="font-medium text-black dark:text-white">
                  Photo
                </h3>)}
              </div>
              <div className="p-7">
                <PhotoComponent photoFilename={formData.photo_filename || ''} />
                {isEditMode && (
                <form action="#">
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V8.66671C8.66634 9.0349 8.36786 9.33337 7.99967 9.33337C7.63148 9.33337 7.33301 9.0349 7.33301 8.66671V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.4715 4.5286C4.74402 4.25609 5.18893 4.25609 5.46144 4.5286L7.99997 7.06713L10.5385 4.5286C10.811 4.25609 11.2559 4.25609 11.5284 4.5286C11.801 4.80112 11.801 5.24603 11.5284 5.51854L8.52836 8.51854C8.25585 8.79105 7.81094 8.79105 7.53843 8.51854L4.53843 5.51854C4.26591 5.24603 4.26591 4.80112 4.53843 4.5286Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF (max, 800 X 800px)</p>
                    </div>
                  </div>
                  <button
                  // onClick={handleUpload}
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md border border-primary bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Upload
                  </button>
                </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
