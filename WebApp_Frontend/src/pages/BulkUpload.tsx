import React, { useState, ChangeEvent, FormEvent } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import { toast } from "react-toastify";

const BulkUpload: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(fileList);
      const filePreviews = Array.from(fileList).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(filePreviews);
    } else {
      setPreviews([]);
    }
  };

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!files || files.length === 0) {
      setErrorMessage("Please select files to upload");
      return;
    }
  
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (let i = 0; i < files.length; i++) {
      if (!allowedTypes.includes(files[i].type)) {
        setErrorMessage("Unsupported file type: " + files[i].type);
        return;
      }
      if (files[i].size > maxSize) {
        setErrorMessage("File size should not exceed 5MB: " + files[i].name);
        return;
      }
    }
  
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    setUploading(true);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/upload_photos", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Upload successful:", result);
        toast.success('Upload successful');
        setFiles(null);
        setPreviews([]);
      } else {
        const error = await response.json();
        console.error("Upload failed:", error);
        setErrorMessage("Upload failed: " + error.message);
        toast.error("Upload failed: " + error.message);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error uploading files");
      setErrorMessage("Error uploading files");
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="BulkUpload" />

      <div className="flex flex-col gap-10">
        <form id="uploadForm" encType="multipart/form-data" onSubmit={handleUpload}>
          <div
            id="FileUpload"
            className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              onChange={handleFileChange}
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
                <span className="text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="mt-1.5">SVG, PNG, JPG or GIF (max, 800 X 800px)</p>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-5.5 text-red-500">
              {errorMessage}
            </div>
          )}

          {previews.length > 0 && (
            <div className="mb-5.5 h-full w-full grid grid-cols-2 gap-4">
              {previews.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    className="h-full w-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md border border-primary bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default BulkUpload;
