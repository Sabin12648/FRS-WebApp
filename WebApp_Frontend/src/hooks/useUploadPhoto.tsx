import { useState } from 'react';
import axios from 'axios';
import endpoints from '../constant/apiEndpoints';

const useUploadPhoto = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadUserPhoto = async (userId: string, file: File) => {
    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('photo', file);

    const token = localStorage.getItem('token');
    if (!token) {
      setIsUploading(false);
      setUploadError('No token found');
      return;
    }

    try {
      const response = await axios.put(
        endpoints.user.uploadUserPhoto(userId),
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setIsUploading(false);
      return response.data.photo_filename;
    } catch (error) {
      setIsUploading(false);
      setUploadError((error as Error).message);
      throw error;
    }
  };

  return { isUploading, uploadError, uploadUserPhoto };
};

export default useUploadPhoto;
