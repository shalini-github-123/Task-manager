import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/user/login', {
        email,
        password
      });

      if (response.status === 200) {
        const json = response.data;
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));
        // update the auth context
        dispatch({ type: 'LOGIN', payload: json });
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
