'use client';

import { useAccessToken } from '@/components/useAccessToken';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { isLoggedIn, removeToken, accessToken } = useAccessToken();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
  setLoading(true);
  if (!accessToken) return;

  const fetchUserData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(res.data.user);
      setUser(res.data.user);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setLoading(false);
    }
  };

  fetchUserData();
}, [accessToken]);


const handleFetchCourses = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/user/courses", {
        headers: { Authorization: `Bearer: ${accessToken}`}
    });

    setCourses(res.data);
    console.log(res.data);
  } catch (err) {
    console.error("Error fetching Courses:", err);
  }
}


  if (!isLoggedIn) {
    return <div>Not logged in</div>;
  }

  if(loading) {
    return <div>Loading</div>
  }

  return (
    <div>
      <button onClick={() => removeToken()}>Logout</button>
      <div className='text-white'>
        {user.givenname}
        {user.sn}
      </div>
      <button onClick={() => handleFetchCourses()}>COurses</button>
      <div>
        
      </div>
    </div>
  );
}
