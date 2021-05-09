import { useState } from 'react';
import axios from 'axios';

function App() {
  //state
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState('');
  //evets
  const weatherInput = e => {
    setInput(e.target.value);
  };
  const searchWeather = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}&aqi=no`
      )
      .then(res => {
        setWeather(res.data);
        console.log(res.data);
      })
      .catch(err => alert("Xato so'rov yuborildi"));
    setInput('');
  };
  return (
    <div className='bg-gray-50 min-h-screen sm:p-6 px-6 py-32 flex flex-col items-center justify-center App'>
      <h1 className='text-6xl sm:text-8xl mb-20 text-yellow-300 font-bold'>
        <span className='text-blue-400'>W</span>
        <span className='text-red-400'>o</span>
        <span className='text-yellow-400'>o</span>
        <span className='text-blue-400'>g</span>
        <span className='text-green-400'>l</span>
        <span className='text-red-400'>e</span>
        <span className='block text-lg sm:text-2xl font-normal'>
          weather app
        </span>
      </h1>
      <div className='sm:w-auto w-full mb-20'>
        <input
          onChange={weatherInput}
          value={input}
          className='w-full sm:w-auto mb-5 sm:mb-0 rounded-lg outline-none shadow-lg py-3 px-4 sm:px-8 text-lg mr-5 sm:text-2xl'
          type='text'
        />
        <button
          onClick={searchWeather}
          className='w-full sm:w-auto rounded-lg shadow-lg py-3 px-4 sm:px-8 text-lg sm:text-2xl bg-blue-400 text-white focus:outline-none hover:bg-blue-300 transition-all duration-300 ease-out'
        >
          Search
        </button>
      </div>
      {weather && (
        <div className='w-full sm:w-auto flex sm:justify-between justify-center items-center rounded-lg shadow-lg p-6 sm:py-10 sm:px-16 bg-white'>
          <div className='flex flex-col justify-between items-center mr-10'>
            <h1 className='text-2xl'>{weather.current.condition.text}</h1>
            <div className='flex justify-between items-center'>
              <img src={weather.current.condition.icon} alt='' />
              <h3>{weather.current.temp_c}&#8451;</h3>
            </div>
          </div>
          <div>
            <h1>{weather.location.country}</h1>
            <h1>{weather.location.region}</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
