import { useState } from 'react';
import axios from 'axios';

function App() {
  //state
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState('');
  const [validOn, setValidOn] = useState('hidden');
  const [requestOn, setRequestOn] = useState('hidden');
  //evets
  const weatherInput = e => {
    setInput(e.target.value);
  };
  const searchWeather = () => {
    if (input.trim() !== '') {
      setValidOn('hidden');
      setValidOn('hidden');
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}&aqi=no`
        )
        .then(res => {
          setWeather(res.data);
          console.log(res.data);
        })
        .catch(err => {
          setValidOn('hidden');
          setRequestOn('block');
          setTimeout(() => setRequestOn('hidden'), 5000);
        });
    } else {
      setRequestOn('hidden');
      setValidOn('block');
      setTimeout(() => setValidOn('hidden'), 5000);
    }
  };
  return (
    <div className='bg-gray-50 sm:max-w-xl m-auto min-h-screen sm:px-6 px-6 py-32 flex flex-col items-center justify-center App'>
      <h1 className='text-6xl sm:text-8xl mb-20 text-yellow-300 font-bold'>
        <span className='text-blue-400'>W</span>
        <span className='text-red-400'>o</span>
        <span className='text-yellow-400'>o</span>
        <span className='text-blue-400'>g</span>
        <span className='text-green-400'>l</span>
        <span className='text-red-400'>e</span>
        <span className='text-2xl sm:text-4xl text-blue-200'>v2</span>
        <span className='block text-lg sm:text-2xl font-normal'>
          weather app
        </span>
      </h1>
      <div className='w-full mb-5'>
        <input
          onChange={weatherInput}
          value={input}
          className='w-full sm:w-auto mb-5 sm:mb-0 rounded-lg outline-none shadow-lg py-3 px-4 sm:px-12 text-lg mr-5 sm:text-2xl text-blue-400'
          type='text'
        />
        <button
          onClick={searchWeather}
          className='w-full sm:w-auto rounded-lg shadow-lg py-3 px-4 sm:px-8 text-lg sm:text-2xl bg-blue-400 text-white focus:outline-none hover:bg-blue-300 transition-all duration-300 ease-out'
        >
          Search
        </button>
      </div>
      {/* Error */}
      <div className='w-full mb-10'>
        <div
          className={`${validOn} mb-2 w-full flex sm:justify-between justify-center items-center rounded-lg shadow-lg p-6 sm:py-3 sm:px-16 text-white bg-red-400`}
        >
          <h1>Error!!! Please enter your request</h1>
          <span className='animate-ping w-3 h-3 bg-red-500 rounded-full'></span>
        </div>
        <div
          className={`${requestOn} mb-2 w-full flex sm:justify-between justify-center items-center rounded-lg shadow-lg p-6 sm:py-3 sm:px-16 text-white bg-red-400`}
        >
          <h1>Error!!! Can't find your request</h1>
          <span className='animate-ping w-3 h-3 bg-red-500 rounded-full'></span>
        </div>
      </div>
      {/* Card */}
      {weather && (
        <div className='w-full flex sm:justify-between justify-center items-center rounded-lg shadow-lg p-6 sm:py-10 sm:px-16 bg-white'>
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
