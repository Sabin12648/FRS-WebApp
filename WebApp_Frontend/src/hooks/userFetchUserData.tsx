import { useState, useEffect } from 'react';
import endpoints from '../constant/apiEndpoints';

interface UserData {
  name: string;
  applicantId : number;
  photo_filename : string ;
  address : string;
  email : string;
  phone_number : string;

  // Add other user properties as needed
}

interface UseFetchUserDataResult {
  userData: UserData[] | null;
  error: string | null;
  isLoading: boolean;
}

const useFetchUserData = (): UseFetchUserDataResult => {
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setError('No token found');
      setLoading(false);
      return;
    }

    fetch(endpoints.user.getAll, {
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
        if (!Array.isArray(data)) {
          throw new Error('Received data is not an array');
        }
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching or processing user data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { userData, error, isLoading };
};

export default useFetchUserData;
