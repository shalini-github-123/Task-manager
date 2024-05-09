import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios'; // Import axios

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/user/signup', {
        email,
        password
      });

      const json = response.data;

      if (response.status !== 200) {
        setIsLoading(false);
        setError(json.error);
      } else {
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: json });

        // Update loading state
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setIsLoading(false);
      setError('Failed to sign up');
    }
  };

  return { signup, isLoading, error };
};
