import React, {useState} from 'react';
import axios from 'axios';
import './index.scss';

const WeatherReminder = () => {
   const [date, setDate] = useState('');
   const [city, setCity] = useState('');
   const [forecast, setForecast] = useState(null);
   const [error, setError] = useState(null);

   const apiKey = '9GKTEDN6JW6J8LSK7GBL9Z69X';

   const getWeatherForecast = async () => {
      if (!date || !city) {
         setError('Please provide both city and date.');
         return;
      }

      setError(null);

      try {
         const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date}?key=${apiKey}`,
         );
         setForecast(response.data);
      } catch (err) {
         setError('Error fetching weather data.');
      }
   };

   return (
      <div>
         <div className="p-3 mb-3">
            <h1 className="mb-2 font-bold">Weather Reminder</h1>
            <div className="flex items-center">
               <label htmlFor="" className="font-bold">
                  City:
               </label>
               <input type="text" id="city" name="city" className="ml-2" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="flex items-center my-2">
               <label htmlFor="" className="font-bold">
                  Date:
               </label>
               <input type="date" id="date" name="date" className="ml-2" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <button
               className="bg-color-2 w-full mt-3 transition hover:bg-color-2-hover border border-color-2 hover:border-color-2-hover rounded-4 p-2 capitalize text-color-white text-xs"
               onClick={getWeatherForecast}>
               Get Weather Forecast
            </button>

            {error && <p style={{color: 'red'}}>{error}</p>}
         </div>

         {forecast && (
            <div className="forecast p-3">
               <h2>
                  Weather Forecast for <span className="font-bold">{city}</span> on <span className="font-bold">{date}</span>
               </h2>
               <p>
                  <span className="font-bold">Condition:</span> {forecast.days[0].conditions}
               </p>
               <p>
                  <span className="font-bold">Temperature:</span> {forecast.days[0].temp} °C
               </p>
               <p>
                  <span className="font-bold">Precipitation:</span> {forecast.days[0].precip} mm
               </p>
            </div>
         )}
      </div>
   );
};

export default WeatherReminder;
