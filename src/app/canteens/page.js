"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Canteens = () => {
  const [canteens, setCanteens] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/canteens");
        setCanteens(res.data.canteens || []);
      } catch (err) {
        console.error("Error fetching canteens", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCanteens();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 justify-center items-center">
      {canteens.map((canteen) => (
        <div
          key={canteen.id}
          onClick={() => router.push(`/canteen/${canteen.id}`)}
          className="p-4 border rounded-xl shadow-sm hover:shadow-md transition w-32 h-32 flex justify-center items-center"
        >
          <h2 className="font-semibold text-center flex justify-center items-center">{canteen.name.de}</h2>
        </div>
      ))}
    </div>
  );
};

export default Canteens;
