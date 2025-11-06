'use client';

import Exams from '@/components/exams';
import { useAccessToken } from '@/components/useAccessToken';
import { ExamIcon, QrCodeIcon, UserIcon } from '@phosphor-icons/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Profile() {
  const { isLoggedIn, removeToken, accessToken } = useAccessToken();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);
  const [showCourses, setShowCourses] = useState(false);
  const [QRCode, setQRCode] = useState(null);

  const [selected, setSelected] = useState('general');

  useEffect(() => {
    setLoading(true);
    if (!accessToken) return;

    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/user/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(res.data.user);
        console.log(res.data.user);
        setLoading(false);
        setShowCourses(true);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [accessToken]);

  const handleFetchCourses = async () => {
    if (courses) {
      setShowCourses(!showCourses);
      return;
    }

    try {
      const res = await axios.get('http://localhost:3001/api/user/courses', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setCourses(res.data.courses);
    } catch (err) {
      console.error('Error fetching Courses:', err);
    }
  };

  const handleFetchQRCode = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/user/qrcode', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setQRCode(JSON.stringify(res.data));
    } catch (err) {
      console.error('Error fetching QR-Code:', err);
    }
  };

  if (!isLoggedIn)
    return <div className="text-center text-white mt-10">Nicht eingeloggt</div>;
  if (loading)
    return <div className="text-center text-white mt-10">Lädt...</div>;

  return (
    <div>
      <div>
        <div>
          <h1 className="flex justify-center items-center text-2xl font-bold">
            Student-Profile
          </h1>

          <span className="flex justify-center items-center">
            {user.givenname} {user.sn}
          </span>
          <button
            onClick={removeToken}
            className="flex mr-auto ml-auto px-4 py-1 mb-5 bg-red-500 hover:bg-red-600 rounded-lg transition-all"
          >
            Logout
          </button>
          <div className="w-full flex justify-between mb-5">
            <button
              className={`border-2 w-full flex border-blue-900 justify-center items-center transition-colors duration-200 ${
                selected === 'general' ? 'bg-blue-900' : ' text-blue-900'
              }`}
              onClick={() => setSelected('general')}
            >
              <UserIcon
                color={selected === 'general' ? 'black' : 'blue'}
                size={40}
              />
            </button>

            <button
              className={`border-2 w-full flex border-blue-900 justify-center items-center transition-colors duration-200 ${
                selected === 'qr' ? 'bg-blue-900' : ' text-blue-900'
              }`}
              onClick={() => {
                setSelected('qr');
                handleFetchQRCode();
              }}
            >
              <QrCodeIcon
                color={selected === 'qr' ? 'black' : 'blue'}
                size={40}
              />
            </button>

            <button
              className={`border-2 w-full flex border-blue-900 justify-center items-center transition-colors duration-200 ${
                selected === 'exams' ? 'bg-blue-900' : ' text-blue-900'
              }`}
              onClick={() => {
                setSelected('exams');
                handleFetchCourses();
              }}
            >
              <ExamIcon
                color={selected === 'exams' ? 'black' : 'blue'}
                size={40}
              />
            </button>
          </div>
        </div>

        {selected === 'qr' && (
          <div className="grid text-center items-center justify-center">
            <QRCodeCanvas
              value={QRCode}
              size={200}
              bgColor="black"
              fgColor="#1e3a8a"
              includeMargin={true}
              level="H"
            />
            <span className="text-[#1e3a8a] font-extrabold">
              {user['x-de-tudortmund-matr']}
            </span>
          </div>
        )}

        {selected === 'exams' && courses && (
          <Exams exams={courses} setShowCourses={setShowCourses} />
        )}
        {selected === 'general' && (
          <div className="flex flex-col gap-3 p-4 border-2 border-blue-900 rounded-2xl">
            <div className="flex flex-col text-blue-900">
              <span className="font-semibold text-sm uppercase tracking-wide text-blue-800">
                Rolle:
              </span>
              <span>{user.roles?.[0]}</span>
            </div>

            <div className="flex flex-col text-blue-900">
              <span className="font-semibold text-sm uppercase tracking-wide text-blue-800">
                Matrikelnummer:
              </span>
              <span>{user['x-de-tudortmund-matr']}</span>
            </div>

            <div className="flex flex-col text-blue-900">
              <span className="font-semibold text-sm uppercase tracking-wide text-blue-800">
                Name:
              </span>
              <span>{user.name}</span>
            </div>

            <div className="flex flex-col text-blue-900">
              <span className="font-semibold text-sm uppercase tracking-wide text-blue-800">
                Vorname:
              </span>
              <span>{user.givenname}</span>
            </div>

            <div className="flex flex-col text-blue-900">
              <span className="font-semibold text-sm uppercase tracking-wide text-blue-800">
                Nachname:
              </span>
              <span>{user.sn}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
