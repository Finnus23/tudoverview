"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Canteen() {
  const { id } = useParams();


  useEffect(() => {

  }, [])

  return (
    <div>
      ads
      {id}
    </div>
  );
}
