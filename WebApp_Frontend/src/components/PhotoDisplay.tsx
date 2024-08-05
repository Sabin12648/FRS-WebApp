
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

type PhotoComponentProps = {
  photoFilename: string;
  isEditMode?: boolean;
  setIsEditMode?: Dispatch<SetStateAction<boolean>>;
};

const PhotoComponent: React.FC<PhotoComponentProps> = ({ photoFilename, isEditMode = false}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isEditMode) {
      const token = localStorage.getItem('token');
      axios.get(`http://192.168.1.121:5000/get_image/${photoFilename}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setImageSrc(response.data.image);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the image!", error);
        setLoading(false);
      });
    }
  }, [isEditMode, photoFilename]);

  return (
    <div className="h-full w-full">
      {loading ? <Spinner/> : (
        <img src={imageSrc} alt="User" 
        className="object-cover" 
        />
      )}
    </div>
  );
};

export default PhotoComponent;
