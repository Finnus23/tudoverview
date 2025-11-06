"use client";

import axios from "axios";
import { useEffect, useState } from "react";




const Canteens = () => {

    const [canteens, setCanteens] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        setLoading(true);

        const fetchCanteens = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/canteens");

                const canteens = res.data.canteens;

                setCanteens(canteens);

                console.log(res.data);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching Canteens", err);
                setLoading(false);
            }

            
        }

        fetchCanteens();
    }, [])


    if(loading) {
        return(
            <div>Loading...</div>
        );
    }

    return(
       <div>
        {canteens.map((canteen) => (
            <div key={canteen.id}>
                {canteen.name.de}
            </div>
        ))}
       </div>
    );
}


export default Canteens;