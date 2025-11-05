import { useEffect, useState } from 'react';

export function useAccessToken() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const expiresIn = sessionStorage.getItem('expiresIn');
    if (!token) return;

    if (Date.now() - Number(expiresIn) > 1780 * 1000) {
      removeToken();
      return;
    }
    setAccessToken(token);
  }, []);

  const saveToken = (token) => {
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('expiresIn', Date.now());
    setAccessToken(token);
  };

  const removeToken = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('expiresIn');
    window.location.reload();
  };

  return {
    accessToken: accessToken,
    saveToken,
    removeToken,
    isLoggedIn: !!accessToken,
  };
}
