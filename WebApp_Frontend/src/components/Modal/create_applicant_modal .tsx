// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import useCreateUser from '../../hooks/useCreateUser';
import { useState } from 'react';
import Toast from '../Toast/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormDataType {
  name: string;
  applicant_id: string;
  address: string;
  email: string;
  mobile_number: string;
}

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  user?: {
    applicant_id?: string;
    name?: string;
    mobile_number?: string;
    email?: string;
    address?: string;
    photo_filename?: string;
  } | null;
  isEditMode?: boolean;
  onSave?: (user: any) => void;
  children?: React.ReactNode;
};

const CreateApplicantModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  user,
  isEditMode = false,
  onSave,
  children,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<FormDataType>({
    name: user?.name || '',
    applicant_id: user?.applicant_id || '',
    address: user?.address || '',
    email: user?.email || '',
    mobile_number: user?.mobile_number || '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const { isLoading, error, createUser } = useCreateUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setPreviewURL(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveAndUpload = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!selectedFile) {
      Toast('Please select a photo to upload!', 'error');
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('applicantId', formData.applicant_id);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('mobile_number', formData.mobile_number);
    formDataToSend.append('photo', selectedFile);
  
    try {
      const response = await createUser(formDataToSend);
      console.log('Response:', response);
  
      if (response) {
        onSave?.({ ...formData, photo_filename: selectedFile.name });
        console.log('Showing success toast');
        Toast(response.message , "success");
        onClose?.();
      }
    } catch (err) {
      console.error('Error creating user:', err);
      Toast('Error creating user!', 'error');
    }
  };
  
  
  

  return (
    <>
    <div className="fixed mt-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-h-screen overflow-y-auto w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute text-xl top-0 right-2 text-gray-800 hover:text-gray-800"
        >
          &times;
        </button>
        {children}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSaveAndUpload}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="mb-4">
                    <label className="mb-3 block text-sm font-medium text-black" htmlFor="applicant_id">
                      Applicant ID
                    </label>
                    <input
                      type="text"
                      name="applicant_id"
                      value={formData.applicant_id}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditMode}
                        className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="mobile_number"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        disabled={!isEditMode}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="col-span-5 xl:col-span-2">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Profile Photo</h3>
                      </div>
                      <div className="p-7">
                        <div className="mb-4">
                          <label className="block text-gray-700" htmlFor="photo">
                            Upload Photo
                          </label>
                          <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            accept="image/*"
                            className="mt-2"
                          />
                          {previewURL && (
                            <img src={previewURL} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default CreateApplicantModal;
