'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Sun,
  Sunrise,
  Sunset,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  CloudRain,
  Moon,
  CloudMoon,
} from 'lucide-react';
import { MoonStarsIcon } from '@phosphor-icons/react';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/wether');
        setWeather(res.data.wether.currentWeather);

        console.log(res.data.wether);
      } catch (err) {
        console.error('Fehler beim Laden des Wetters:', err);
      }
    };

    fetchWeather();
  }, []);

  if (!weather)
    return (
      <div className="text-blue-900 font-medium animate-pulse">
        Wetterdaten werden geladen...
      </div>
    );

  const {
    temperature,
    temperatureMin,
    temperatureMax,
    windSpeed,
    windDirection,
    pressure,
    precipitation1,
    sunrise,
    sunset,
  } = weather;

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const getWeatherIcon = (weather) => {
    if (Date.now() > sunrise && Date.now() < sunset) {
      if (precipitation1 > 0) {
        return <CloudRain size={40} />;
      } else {
        return <Sun size={40} />;
      }
    } else {
      if (precipitation1 > 0) {
        return <CloudMoon size={40} />;
      } else {
        return <MoonStarsIcon size={40} />;
      }
    }
  };

  return (
    <div className="p-6 border-2 border-blue-900 rounded-2xl shadow-sm max-w-md mx-auto">
      <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2 justify-center">
        {getWeatherIcon(weather)}
      </h2>

      <div className="grid grid-cols-2 gap-4 text-blue-900">
        <div className="flex flex-col items-center justify-center bg-[#252525] rounded-xl p-3 shadow-sm">
          <Thermometer className="text-blue-700 mb-1" size={28} />
          <span className="text-2xl font-semibold">{temperature}°C</span>
          <span className="text-sm text-gray-600">
            Min: {temperatureMin}° | Max: {temperatureMax}°
          </span>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#252525] rounded-xl p-3 shadow-sm">
          <Wind className="text-blue-700 mb-1" size={28} />
          <span className="text-2xl font-semibold">{windSpeed} m/s</span>
          <span className="text-sm text-gray-600">
            Richtung: {Math.round(windDirection)}°
          </span>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#252525] rounded-xl p-3 shadow-sm">
          <Droplets className="text-blue-700 mb-1" size={28} />
          <span className="text-2xl font-semibold">{precipitation1} mm</span>
          <span className="text-sm text-gray-600">Letzte Stunde</span>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#252525] rounded-xl p-3 shadow-sm">
          <Gauge className="text-blue-700 mb-1" size={28} />
          <span className="text-2xl font-semibold">{pressure} hPa</span>
          <span className="text-sm text-gray-600">Luftdruck</span>
        </div>
      </div>

      <div className="flex justify-between mt-6 text-blue-900">
        <div className="flex items-center gap-2">
          <Sunrise className="text-yellow-600" />
          <span className="font-medium">{formatTime(sunrise)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sunset className="text-orange-600" />
          <span className="font-medium">{formatTime(sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
