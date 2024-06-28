// import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
// import axios from 'axios';

// type PhotoComponentProps = {
//   photoFilename: string;
//   isEditMode?: boolean;
//   setIsEditMode?: Dispatch<SetStateAction<boolean>>;
// };

// const PhotoComponent: React.FC<PhotoComponentProps> = ({ photoFilename, isEditMode = false }) => {
//   const [imageSrc, setImageSrc] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const token = localStorage.getItem('token');

//     if (!token) {
//         console.error('No token found');
//         return;
//       }
//     if (!isEditMode) {
//       // Fetch the image from the backend with Bearer token
//       axios.get(`http://127.0.0.1:5000/get_image/${photoFilename}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         setImageSrc(response.data.image);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the image!", error);
//         setLoading(false);
//       });
//     }
//   }, [isEditMode, photoFilename]);

//   return (
//     <div className="">
//         {isEditMode ? (
//           <form>
//           </form>
//         ) : (
//           <div className="">
//               {loading ? (
//                 <p>Loading...</p>
//               ) : (
//                 <img src={imageSrc} alt="User" />
            
//               )}
//           </div>
//         )}
//     </div>
//   );
// };

// export default PhotoComponent;



import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

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
      axios.get(`http://127.0.0.1:5000/get_image/${photoFilename}`, {
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img src={imageSrc} alt="User" 
        className="h-full w-full object-cover" 
        />
      )}
    </div>
  );
};

export default PhotoComponent;
