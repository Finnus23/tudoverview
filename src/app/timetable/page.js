'use client';

import { useAccessToken } from '@/components/useAccessToken';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Timetable = () => {
  const { isLoggedIn, accessToken } = useAccessToken();

  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log('Timetable updated:', timetable);
  }, [timetable]);

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);

    const fetchTimetable = async () => {
      const date = new Date().toISOString().split('T')[0];

      try {
        const res = await axios.get(
          'http://localhost:3001/api/user/timetable',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { date },
          }
        );
        setTimetable((prev) => [...prev, res.data.timetable]);
        console.log(timetable);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Timetable', err);
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [accessToken]);

  if (!isLoggedIn) {
    return <div>You are not logged in.</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  const next = async () => {
    setIndex((prev) => Math.min(prev + 1, 6));

    console.log(index + 1, timetable[index]);

    if (!timetable[index + 1]) {
      try {
        const indexDate = new Date(
          Date.now() + (index + 1) * (1000 * 60 * 60 * 24)
        )
          .toISOString()
          .split('T')[0];

        const res = await axios.get(
          'http://localhost:3001/api/user/timetable',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { date: indexDate },
          }
        );

        console.log(timetable);
        setTimetable((prev) => [...prev, res.data.timetable]);

        console.log(timetable);
      } catch (err) {
        console.error('Error fetching Timetable', err);
      }
    }
  };
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={prev} disabled={index === 0}>
          ◀
        </button>
        <span>
          {index + 1} / {6 + 1}
        </span>
        <button onClick={next} disabled={index === 6}>
          ▶
        </button>
      </div>

      <div className="overflow-hidden w-screen h-screen border rounded-2xl shadow-md relative">
        <motion.div
          className="flex"
          animate={{ x: -index * window.innerWidth }} // Slide auf volle Breite
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              className="w-screen flex flex-col bg-gray-800 text-white"
              key={i}
            >
              {timetable[i] ? (
                timetable[i].map((item, j) => (
                  <div
                    key={j}
                    className="w-full h-[100px] flex items-center justify-center border-b border-gray-600"
                  >
                    <span className="text-white text-lg font-medium">
                      {item.name}
                    </span>
                  </div>
                ))
              ) : (
                <div className="w-full h-[100px] flex items-center justify-center">
                  <span>Loading...</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Timetable;
