import './App.css'
import { useState } from 'react';
const App=()=>{
  
  const [City, setCity] = useState("")
  const [ WeatherData, setWeatherData] = useState({});
  const [temp, setTemp] = useState("")
  const [feels, setfeels] = useState("")

  const getTheData=(event)=>
        {
            event.preventDefault();
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=c0095a7dcd1c17c29ec96725579fbae0`).then(response=>response.json()
            ).then(
                data=>setWeatherData(data)
              );
            const kelvinTemp=WeatherData.main.temp-273.15;
            setTemp(Math.round(kelvinTemp))
            const kelvinFeels=WeatherData.main.feels_like-273.15;
            setfeels(Math.round(kelvinFeels));
            setCity(City(""));

        }

  return (
    <>
    <div className='appTitle'>
           <h3> Weather Application</h3>
    </div>
    
    <div className='app'>
      <div className="search">
        <form onSubmit={getTheData} >
          <input
                  type="text" 
                  placeholder="Enter City Name"
                  required  
                  title="Please Enter A Valid City Name"
                  value={City}
                  id="input"
                  onChange={e=>setCity(e.target.value)}
                  />
          <input 
                  type="submit"
                  value="Get Data" 
                  // onClick={inputValidate} 
                  />
        </form>
      </div>
                    {/* //displaying container */}
      <div className="container">

      {/* //top section  */}
        <div className="top">
              <div className="location">
              <p>{WeatherData.name}</p>
                   {
                    WeatherData.sys?<p>{WeatherData.sys.country}</p>:null
                   }
              </div>
              <div className="temp">
                      {
                        WeatherData.weather?<h1>{temp}ºC</h1>:null
                      }
              </div>
              <div className="desc">
                      {
                        WeatherData.weather?<p>{WeatherData.weather[0].main}</p>:null
                      }
              </div>
        </div>

      {/* bottom section  */}
        <div className="bottom">
              <div className="feels">
                    {
                      WeatherData.weather?<p>{feels}ºC</p>:null
                    }
                    <p> Feels Like</p>
              </div>
              <div className="humidity">
                    {
                      WeatherData.weather?<p>{WeatherData.main.humidity}%</p>:null
                    }
                    <p> humidity</p>
              </div>
              <div className="wind">
              {
                WeatherData.weather?
                <p>{WeatherData.wind.speed.toFixed()} MPM</p>:null
              }
                <p> wind</p>
              </div>
            </div>
              {
                  WeatherData.cod==="404"?
                <p style={{fontSize:"18px"}}> City Not Found,<br /> Please Enter A Valid City...</p>:<></>
              }
      </div>

    </div> 
    </>

  );
}
export default App;
