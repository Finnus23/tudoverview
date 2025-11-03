import { useEffect, useState } from 'react';

export function useAccessToken() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    setAccessToken(token);
  }, []);

  const saveToken = (token) => {
    sessionStorage.setItem('accessToken', token);
    setAccessToken(token);
  };

  const removeToken = () => {
    sessionStorage.removeItem('accessToken');
    window.location.reload();
  };

  return { accessToken, saveToken, removeToken, isLoggedIn: !!accessToken };
}
