// // import React, { useEffect, useState } from 'react';
// // import PhotoComponent from '../PhotoDisplay';
// // import axios from 'axios';

// // type ModalProps = {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   user: {
// //     id? : string;
// //     name?: string;
// //     mobile_number?: string;
// //     email?: string;
// //     address?: string;
// //     photo_filename?: string;
// //   } | null;
// //   isEditMode: boolean;
// //   onSave: (user: any) => void; // You might want to replace 'any' with a more specific type
// //   children?: React.ReactNode; // Add children property
// // };

// // const Modal: React.FC<ModalProps> = ({
// //   isOpen,
// //   onClose,
// //   user,
// //   isEditMode,
// //   onSave,
// //   children
// // }) => {
// //   if (!isOpen) return null;

// //   const [formData, setFormData] = React.useState(user || {});
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [previewURL, setPreviewURL] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (selectedFile) {
// //       const url = URL.createObjectURL(selectedFile);
// //       setPreviewURL(url);

// //       // Cleanup the URL object when the component is unmounted or the file changes
// //       return () => URL.revokeObjectURL(url);
// //     } else {
// //       setPreviewURL(null);
// //     }
// //   }, [selectedFile]);

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
// //   ) => {
// //     const { name, value } = e.target;
// //     if (e.target instanceof HTMLInputElement && e.target.files && e.target.files.length > 0) {
// //       const file = e.target.files[0];
// //       setSelectedFile(file);
// //     } else {
// //       setFormData((prev) => ({
// //         ...prev,
// //       [name]: value,
// //       }));
// //     }
// //   };
// //   // const handleChange = (
// //   //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
// //   // ) => {
// //   //   const { name, value } = e.target;
// //   //   if (e.target.type === 'file' && e.target.files) {
// //   //     const file = e.target.files[0];
// //   //     setSelectedFile(file);
// //   //     const url = URL.createObjectURL(file);
// //   //     setPreviewURL(url);
// //   //   } else {
// //   //     setFormData((prev) => ({
// //   //       ...prev,
// //   //       [name]: value,
// //   //     }));
// //   //   }
// //   // };
  


  
// //   const handleSave = () => {
// //     const updatedUser = { ...formData }; // Save the updated user
// //     onSave(updatedUser);
// //   };

// //   const handleUpload = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!selectedFile || !formData.photo_filename) return;
  
// //     const uploadFormData = new FormData();
// //     uploadFormData.append('photo', selectedFile);

// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       console.error('No token found');
// //       return;
// //     }
  
// //     try {
// //       const response = await axios.put(
// //         `http://127.0.0.1:5000/users/${user?.id}/update_photo`,
// //         uploadFormData,
// //         {
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'multipart/form-data',
// //           },
// //         },
// //       );
  
// //       // Update the photo filename in the formData state
// //       setFormData((prev) => ({
// //         ...prev,
// //         photo_filename: response.data.photo_filename,
// //       }));
// //     } catch (error) {
// //       console.error('Error uploading file:', error);
// //       // Handle error (e.g., show error message to user)
// //     }
// //   };
  
  

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
// //       <div className="bg-white p-6 rounded-lg shadow-lg relative max-h-screen overflow-y-auto w-full max-w-4xl">
// //         <button
// //           onClick={onClose}
// //           className="absolute text-xl top-0 right-2 text-gray-800 hover:text-gray-800"
// //         >
// //           &times;
// //         </button>
// //         {children}
// //         <div className="grid grid-cols-5 gap-8">
// //           <div className="col-span-5 xl:col-span-3">
// //             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
// //               <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
// //                 <h3 className="font-medium text-black dark:text-white">
// //                   {isEditMode ? 'Edit' : 'View'} Personal Information
// //                 </h3>
// //               </div>

// //               <div className="p-7">
// //                 <form>
// //                   <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
// //                     <div className="w-full sm:w-1/2">
// //                       <label
// //                         className="mb-3 block text-sm font-medium text-black dark:text-white"
// //                         htmlFor="fullName"
// //                       >
// //                         Full Name
// //                       </label>
// //                       <div className="relative">
// //                         <input
// //                           type="text"
// //                           name="name"
// //                           value={formData.name || ''}
// //                           onChange={handleChange}
// //                           disabled={!isEditMode}
// //                           className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
// //                         />
// //                       </div>
// //                     </div>
// //                     <div className="w-full sm:w-1/2">
// //                       <label
// //                         className="mb-3 block text-sm font-medium text-black dark:text-white"
// //                         htmlFor="phoneNumber"
// //                       >
// //                         Phone Number
// //                       </label>
// //                       <input
// //                         type="text"
// //                         name="mobile_number"
// //                         value={formData.mobile_number || ''}
// //                         onChange={handleChange}
// //                         disabled={!isEditMode}
// //                         className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="mb-4">
// //                     <label className="block text-gray-700">Address</label>
// //                     <input
// //                       type="text"
// //                       name="address"
// //                       value={formData.address || ''}
// //                       onChange={handleChange}
// //                       disabled={!isEditMode}
// //                       className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
// //                     />
// //                   </div>
// //                   <div className="mb-4">
// //                     <label className="block text-gray-700">Email Address</label>
// //                     <input
// //                       type="text"
// //                       name="email"
// //                       value={formData.email || ''}
// //                       onChange={handleChange}
// //                       disabled={!isEditMode}
// //                       className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
// //                     />
// //                   </div>
// //                   {isEditMode && (
// //                     <button
// //                       type="button"
// //                       onClick={handleSave}
// //                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //                     >
// //                       Save
// //                     </button>
// //                   )}
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="col-span-5 xl:col-span-2">
// //             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
// //               <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
// //                 {isEditMode ? (<h3 className="font-medium text-black dark:text-white">
// //                   Edit your photo
// //                 </h3>) : (<h3 className="font-medium text-black dark:text-white">
// //                   Photo
// //                 </h3>)}
// //               </div>
// //               <div className="p-7">
// //                 <PhotoComponent photoFilename={formData.photo_filename || ''} />
// //                 {isEditMode && (
// //                 <form action='#'>
// //                   <div
// //                     id="FileUpload"
// //                     className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
// //                   >
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       onChange={handleChange}
// //                       className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
// //                     />
// //                     <div className="flex flex-col items-center justify-center space-y-3">
// //                       <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
// //                         <svg
// //                           width="16"
// //                           height="16"
// //                           viewBox="0 0 16 16"
// //                           fill="none"
// //                           xmlns="http://www.w3.org/2000/svg"
// //                         >
// //                           <path
// //                             fillRule="evenodd"
// //                             clipRule="evenodd"
// //                             d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
// //                             fill="#3C50E0"
// //                           />
// //                           <path
// //                             fillRule="evenodd"
// //                             clipRule="evenodd"
// //                             d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V8.66671C8.66634 9.0349 8.36786 9.33337 7.99967 9.33337C7.63148 9.33337 7.33301 9.0349 7.33301 8.66671V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
// //                             fill="#3C50E0"
// //                           />
// //                           <path
// //                             fillRule="evenodd"
// //                             clipRule="evenodd"
// //                             d="M4.4715 4.5286C4.74402 4.25609 5.18893 4.25609 5.46144 4.5286L7.99997 7.06713L10.5385 4.5286C10.811 4.25609 11.2559 4.25609 11.5284 4.5286C11.801 4.80112 11.801 5.24603 11.5284 5.51854L8.52836 8.51854C8.25585 8.79105 7.81094 8.79105 7.53843 8.51854L4.53843 5.51854C4.26591 5.24603 4.26591 4.80112 4.53843 4.5286Z"
// //                             fill="#3C50E0"
// //                           />
// //                         </svg>
// //                       </span>
// //                       <p>
// //                         <span className="text-primary">Click to upload</span> or
// //                         drag and drop
// //                       </p>
// //                       <p className="mt-1.5">SVG, PNG, JPG or GIF (max, 800 X 800px)</p>
// //                     </div>
// //                   </div>
// //                   <button
// //                   onClick={handleUpload}
// //                     type="submit"
// //                     className="inline-flex items-center justify-center rounded-md border border-primary bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
// //                   >
// //                     Upload
// //                   </button>
// //                 </form>
// //                 )}
// //                 {previewURL && (
// //                   <div className="mt-4">
// //                     <p>Image Preview:</p>
// //                     <img src={previewURL} alt="Selected" className="w-32 h-32 object-cover" />
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Modal;

// import React, { useEffect, useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import PhotoComponent from '../PhotoDisplay';
// import axios from 'axios';

// type ModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   user: {
//     id?: string;
//     name?: string;
//     mobile_number?: string;
//     email?: string;
//     address?: string;
//     photo_filename?: string;
//   } | null;
//   isEditMode: boolean;
//   onSave: (user: any) => void;
//   children?: React.ReactNode;
// };

// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   user,
//   isEditMode,
//   onSave,
//   children,
// }) => {
//   if (!isOpen) return null;

//   const [formData, setFormData] = useState(user || {});
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewURL, setPreviewURL] = useState<string | null>(null);

//   useEffect(() => {
//     if (selectedFile) {
//       const url = URL.createObjectURL(selectedFile);
//       setPreviewURL(url);

//       return () => URL.revokeObjectURL(url);
//     } else {
//       setPreviewURL(null);
//     }
//   }, [selectedFile]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     if (
//       e.target instanceof HTMLInputElement &&
//       e.target.files &&
//       e.target.files.length > 0
//     ) {
//       const file = e.target.files[0];
//       setSelectedFile(file);
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSave = () => {
//     const updatedUser = { ...formData };
//     onSave(updatedUser);
//   };

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedFile || !formData.photo_filename) return;

//     const uploadFormData = new FormData();
//     uploadFormData.append('photo', selectedFile);

//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No token found');
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:5000/users/${user?.id}/update_photo`,
//         uploadFormData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       setFormData((prev) => ({
//         ...prev,
//         photo_filename: response.data.photo_filename,
//       }));

//       // Show success toast
//       toast.success('Successfully uploaded!', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//       });
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       toast.error('Error uploading file!', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg relative max-h-screen overflow-y-auto w-full max-w-4xl">
//         <button
//           onClick={onClose}
//           className="absolute text-xl top-0 right-2 text-gray-800 hover:text-gray-800"
//         >
//           &times;
//         </button>
//         {children}
//         <div className="grid grid-cols-5 gap-8">
//           <div className="col-span-5 xl:col-span-3">
//             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
//               <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
//                 <h3 className="font-medium text-black dark:text-white">
//                   {isEditMode ? 'Edit' : 'View'} Personal Information
//                 </h3>
//               </div>

//               <div className="p-7">
//                 <form>
//                   <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="fullName"
//                       >
//                         Full Name
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           name="name"
//                           value={formData.name || ''}
//                           onChange={handleChange}
//                           disabled={!isEditMode}
//                           className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                         />
//                       </div>
//                     </div>
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="phoneNumber"
//                       >
//                         Phone Number
//                       </label>
//                       <input
//                         type="text"
//                         name="mobile_number"
//                         value={formData.mobile_number || ''}
//                         onChange={handleChange}
//                         disabled={!isEditMode}
//                         className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700">Address</label>
//                     <input
//                       type="text"
//                       name="address"
//                       value={formData.address || ''}
//                       onChange={handleChange}
//                       disabled={!isEditMode}
//                       className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Email Address</label>
//                     <input
//                       type="text"
//                       name="email"
//                       value={formData.email || ''}
//                       onChange={handleChange}
//                       disabled={!isEditMode}
//                       className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                   {isEditMode && (
//                     <button
//                       type="button"
//                       onClick={handleSave}
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       Save
//                     </button>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div className="col-span-5 xl:col-span-2">
//             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//               <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
//                 {isEditMode ? (
//                   <h3 className="font-medium text-black dark:text-white">
//                     Edit your photo
//                   </h3>
//                 ) : (
//                   <h3 className="font-medium text-black dark:text-white">
//                     Photo
//                   </h3>
//                 )}
//               </div>
//               <div className="p-7">
//                 <PhotoComponent photoFilename={formData.photo_filename || ''} />
//                 {isEditMode && (
//                   <form action="#">
//                     <div
//                       id="FileUpload"
//                       className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
//                     >
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleChange}
//                         className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
//                       />
//                       <div className="flex flex-col items-center justify-center space-y-3">
//                         <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
//                           <svg
//                             width="16"
//                             height="16"
//                             viewBox="0 0 16 16"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
//                               fill="#3C50E0"
//                             />
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V8.66671C8.66634 9.0349 8.36786 9.33337 7.99967 9.33337C7.63148 9.33337 7.33301 9.0349 7.33301 8.66671V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
//                               fill="#3C50E0"
//                             />
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M4.4715 4.5286C4.74402 4.25609 5.18893 4.25609 5.46144 4.5286L7.99997 7.06713L10.5385 4.5286C10.811 4.25609 11.2559 4.25609 11.5284 4.5286C11.801 4.80112 11.801 5.24603 11.5284 5.51854L8.52836 8.51854C8.25585 8.79105 7.81094 8.79105 7.53843 8.51854L4.53843 5.51854C4.26591 5.24603 4.26591 4.80112 4.53843 4.5286Z"
//                               fill="#3C50E0"
//                             />
//                           </svg>
//                         </span>
//                         <p>
//                           <span className="text-primary">
//                             Click to upload
//                           </span>{' '}
//                           or drag and drop
//                         </p>
//                         <p className="mt-1.5">
//                           SVG, PNG, JPG or GIF (max, 800 X 800px)
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={handleUpload}
//                       type="submit"
//                       className="inline-flex items-center justify-center rounded-md border border-primary bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
//                     >
//                       Upload
//                     </button>
//                   </form>
//                 )}
//                 {previewURL && (
//                   <div className="mt-4">
//                     <p>Image Preview:</p>
//                     <img
//                       src={previewURL}
//                       alt="Selected"
//                       className="w-32 h-32 object-cover"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhotoComponent from '../PhotoDisplay';
import axios from 'axios';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id?: string;
    name?: string;
    mobile_number?: string;
    email?: string;
    address?: string;
    photo_filename?: string;
  } | null;
  isEditMode: boolean;
  onSave: (user: any) => void;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  user,
  isEditMode,
  onSave,
  children,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState(user || {});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewURL(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewURL(null);
    }
  }, [selectedFile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (
      e.target instanceof HTMLInputElement &&
      e.target.files &&
      e.target.files.length > 0
    ) {
      const file = e.target.files[0];
      setSelectedFile(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    const updatedUser = { ...formData };
    onSave(updatedUser);
  };

  // const handleUpload = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!selectedFile || !formData.photo_filename) return;

  //   const uploadFormData = new FormData();
  //   uploadFormData.append('photo', selectedFile);

  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     console.error('No token found');
  //     return;
  //   }

  //   try {
  //     const response = await axios.put(
  //       `http://127.0.0.1:5000/users/${user?.id}/update_photo`,
  //       uploadFormData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     // Update the formData state with the new photo_filename from the response
  //     setFormData((prev) => ({
  //       ...prev,
  //       photo_filename: response.data.photo_filename,
  //     }));

  //     // Show success toast
  //     toast.success('Successfully uploaded!', {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 3000,
  //     });
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     toast.error('Error uploading file!', {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 3000,
  //     });
  //   }
  // };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !formData.photo_filename) return;
  
    const uploadFormData = new FormData();
    uploadFormData.append('photo', selectedFile);
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/users/${user?.id}/update_photo`,
        uploadFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      // Update the formData state with the new photo_filename from the response
      setFormData((prev) => ({
        ...prev,
        photo_filename: response.data.photo_filename,
      }));
  
      // Show success toast
      toast.success('Successfully uploaded!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
  
      // Close the modal after successful upload
      onClose();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
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
                {isEditMode ? (
                  <h3 className="font-medium text-black dark:text-white">
                    Edit your photo
                  </h3>
                ) : (
                  <h3 className="font-medium text-black dark:text-white">
                    Photo
                  </h3>
                )}
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
                        onChange={handleChange}
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
                              d="M8 12.667C10.5773 12.667 12.667 10.5773 12.667 8C12.667 5.42267 10.5773 3.33301 8 3.33301C5.42267 3.33301 3.33301 5.42267 3.33301 8C3.33301 10.5773 5.42267 12.667 8 12.667ZM8 14C4.69133 14 2 11.3087 2 8C2 4.69133 4.69133 2 8 2C11.3087 2 14 4.69133 14 8C14 11.3087 11.3087 14 8 14ZM1.99967 9.33337C2.36786 9.33337 2.66634 9.03489 2.66634 8.66671C2.66634 8.29852 2.36786 8.00004 1.99967 8.00004C1.63148 8.00004 1.33301 8.29852 1.33301 8.66671C1.33301 9.03489 1.63148 9.33337 1.99967 9.33337ZM1.99967 10.0001C2.73508 10.0001 3.33301 9.40218 3.33301 8.66671C3.33301 7.9313 2.73508 7.33337 1.99967 7.33337C1.26426 7.33337 0.666336 7.9313 0.666336 8.66671C0.666336 9.40218 1.26426 10.0001 1.99967 10.0001ZM14 9.33337C14.3682 9.33337 14.6667 9.03489 14.6667 8.66671C14.6667 8.29852 14.3682 8.00004 14 8.00004C13.6318 8.00004 13.3333 8.29852 13.3333 8.66671C13.3333 9.03489 13.6318 9.33337 14 9.33337ZM14 10.0001C14.7354 10.0001 15.3333 9.40218 15.3333 8.66671C15.3333 7.9313 14.7354 7.33337 14 7.33337C13.2645 7.33337 12.6667 7.9313 12.6667 8.66671C12.6667 9.40218 13.2645 10.0001 14 10.0001ZM8.00016 9.33337C8.36835 9.33337 8.66683 9.03489 8.66683 8.66671C8.66683 8.29852 8.36835 8.00004 8.00016 8.00004C7.63198 8.00004 7.3335 8.29852 7.3335 8.66671C7.3335 9.03489 7.63198 9.33337 8.00016 9.33337ZM8.00016 10.0001C8.73557 10.0001 9.3335 9.40218 9.3335 8.66671C9.3335 7.9313 8.73557 7.33337 8.00016 7.33337C7.26475 7.33337 6.66683 7.9313 6.66683 8.66671C6.66683 9.40218 7.26475 10.0001 8.00016 10.0001ZM9.33333 4.00004C9.33333 3.63185 9.03485 3.33337 8.66667 3.33337C8.29848 3.33337 8.00001 3.63185 8.00001 4.00004V7.33337H4.66667C4.29848 7.33337 4.00001 7.63185 4.00001 8.00004C4.00001 8.36823 4.29848 8.66671 4.66667 8.66671H8.00001V12C8.00001 12.3682 8.29848 12.6667 8.66667 12.6667C9.03485 12.6667 9.33333 12.3682 9.33333 12V8.66671H12.6667C13.0348 8.66671 13.3333 8.36823 13.3333 8.00004C13.3333 7.63185 13.0348 7.33337 12.6667 7.33337H9.33333V4.00004Z"
                              fill="#3C50E0"
                            />
                          </svg>
                        </span>
                        <p>
                          <span className="text-primary">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                        <p>(max, 800 X 800px)</p>
                      </div>
                    </div>
                    {previewURL && (
                      <div className="mt-2">
                        <img
                          src={previewURL}
                          alt="Preview"
                          className="max-w-xs"
                        />
                      </div>
                    )}
                    <div className="mb-4">
                      <button
                        type="submit"
                        onClick={handleUpload}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;


