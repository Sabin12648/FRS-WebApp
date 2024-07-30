import { useState } from 'react';
import endpoints from '../constant/apiEndpoints';

interface CreateUserResponse {
  message: string;
  encoding: any[]; // Adjust based on your backend response
}

interface CreateUserError {
  message: string;
}

interface UseCreateUser {
  isLoading: boolean;
  error: CreateUserError | null;
  createUser: (formData: FormData) => Promise<CreateUserResponse | null>;
}

const useCreateUser = (): UseCreateUser => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<CreateUserError | null>(null);

  const createUser = async (formData: FormData): Promise<CreateUserResponse | null> => {
    setIsLoading(true);

    try {
      const response = await fetch(endpoints.user.uploadUser, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`, // Adjust if necessary
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user.');
      }

      const data: CreateUserResponse = await response.json();
      setIsLoading(false);
      return data;
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        console.error('API error:', error.message);
        setError({ message: error.message });
      } else {
        console.error('Unexpected error:', String(error));
        setError({ message: String(error) });
      }
      return null;
    }
  };

  return {
    isLoading,
    error,
    createUser,
  };
};

export default useCreateUser;
