'use client';

import Exams from '@/components/exams';
import { useAccessToken } from '@/components/useAccessToken';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { isLoggedIn, removeToken, accessToken } = useAccessToken();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);

  const [showCourses, setShowCourses] = useState(false);

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
      setShowCourses(true);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setLoading(false);
    }
  };

  fetchUserData();
}, [accessToken]);


const handleFetchCourses = async () => {
  if(courses) {
    setShowCourses(!showCourses);
    return;
  };
  try {
    const res = await axios.get("http://localhost:3001/api/user/courses", {
        headers: { Authorization: `Bearer: ${accessToken}`}
    });

    setCourses(res.data.courses);
    console.log(res.data.courses);
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
      {
        showCourses && courses && (
          <div>
              <Exams exams={courses} setShowCourses={setShowCourses}/>
          </div>
        )
      }
    </div>
  );
}
