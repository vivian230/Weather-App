// Import React, Effect Hooks for the app.
import React, {useEffect, useState} from 'react'

// Import the stylesheets for the app.
import './App.css'

// Import the search button for the app.
import { AiOutlineSearch } from 'react-icons/ai';

// Import components for the App.
import HourlyForecast from "./modules/HourlyForecast"
import OverallInfo from './modules/OverallInfo';
import TodayWeather from './modules/TodayWeather';

// Declare the list of available ski places.
// The dictionary includes the name of the place, following by its code for further information fetch.
const availableSkiPlaces = {
        "Alpine Meadows" : "alpine-meadows",
        "Alyeska": "alyeska",
        "Angel Fire": "angel-fire",
        "Arapaho": "arapahoe-basin",        
        "Aspen Mountain": "aspen-mountain",        
        "Beaver Creek": "beavercreek",
        "Big Sky": "big-sky",
        "Bolton": "bolton-valley",        
        "Breckenridge": "breck",
        "Bretton Woods": "brettonwoods",
        "Brian Head": "brianhead",
        "Bridger": "bridger-bowl",
        "Brighton": "brighton",
        "Burke": "burke-mountain",
        "Buttermilk": "buttermilk",        
        "Camelback": "camelback"
};

// The render of main app.
export default function App() {

  // Create a variable "currentLocation", which get the data via the function "setCurrentLocation" 
  // to store weather information of the current location.
  const [currentLocation, setCurrentLocation] = useState([]);

  // The function to get the current location, with the permission from the user.
  function getLocation() {
    if (navigator.geolocation) {
      
      // The function that gets the current location of the user.
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  // The function to apply the current location to the variable "currentLocation".
  function showPosition(position) {
    getPreviewInfo(position.coords.latitude,position.coords.longitude);
  }

  // The call to fetch weather data, based on latitude and longitude, which used for current location.
  const getPreviewInfo = async (latitude, longitude) => {
    var url = "http://api.weatherapi.com/v1/forecast.json?key=3e16eca31970473694c182729231403&q="+latitude+","+longitude+"&days=2&aqi=no&alerts=no";    
    const response = await fetch(url);
    const data = await response.json();


    // Store the current location to the variable.
    return setCurrentLocation(data);
  }

  // The call of the function getLocation(), which fetch the data with the current location input, and store it into the variable "currentLocation".
  useEffect(() => {
    getLocation();
  })

  // Create a variable "weatherData", which get the data via the function "setWeatherData" 
  // to store weather information of the input location.
  const [weatherData, setWeatherData] = useState([{}])

  // Create a variable "skiData", which get the data via the function "setSkiData" 
  // to store resorts' lifts information of the input location.
  const [skiData, setSkiData] = useState([{}])

  // Create a variable "city", which get the data via the function "setCity" 
  // to store the city name, which will be inputed into the fetch function.
  const [city, setCity] = useState("")

  // Create a variable to store the API key, in case of the change of API key in the future.
  const apiKey = '3e16eca31970473694c182729231403';


  // Default option for the fetching of the resorts' lifts information, which is needed by the specific API.
  const options = {
    method: 'GET',
    
    // Default information about the key & host of the API fetch.
    headers: {
      'X-RapidAPI-Key': 'c82693ab22msh8b01b549654cf72p1ca4ffjsnacff17f700e9',
      'X-RapidAPI-Host': 'ski-resorts-and-conditions.p.rapidapi.com'
    }

  };
  
  // The function that runs to get the weather and ski information after the user input the city and hits enter.
  const getWeather = (event) => {

    // If the user hits enter.
    if (event.key === "Enter") {

      // The API call of the desired city to receive the weather information of that city.
      fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2&aqi=no&alerts=no`).then(
        
      // Format the response to the JSON format.
      response => response.json()

      // Extract the response information for appropirate variables and uses.
      ).then(
        data => {  

          // Store the data into the "weatherData" variable.
          setWeatherData(data)

          // Store the city into the "city" variable.
          setCity("")

          // Store the current weather data into the "skiData" variable.
          setSkiData(data)

          // If the fetch is sucessful, and the data is usable.
          if (!data.error) {

            // Loop through the list of available ski places to fetch the appropriate address.
            for (var i = 0; i < Object.keys(availableSkiPlaces).length; i++) {

              // If the location is available & ready to fetch.
              if (data.location.name === Object.keys(availableSkiPlaces)[i]) {

                // The API call of the desired location to receive the ski resorts' information of that location.
                fetch(`https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort/${Object.values(availableSkiPlaces)[i]}`, options).then(
                
                // Format the response to the JSON format.
                response => response.json()
                ).then(
                  data => {  

                    // Extract the response ski resorts' information for the "skiData" variable.
                    setSkiData(data)
                  })
              }
            }
          }          
        }
      )     
    }
  }
    

  // Create the variable "data" to store the specific weather information of the location.
  var data = weatherData;

  // If the user hasn't inputed the city ,
  // By default, if the permission is accepted, the app will return the user location's weather.
  if (weatherData.length === 1) {

    // Set the data to the user's location.
    data = currentLocation;
  }
  
  // display all weather data
  return (
    <div className="backg">
      
      {/* Header of the App*/}
      <div>
        <b className="heading">Ski Weather App</b>        
      </div>


      <div className="container">

          {/* The user's input for the desired location.*/}
          <div className="input">
            <AiOutlineSearch className="icon" />
            <input 
              className="input" 
              placeholder="Search for a ski resort or city" 
              onChange={e => setCity(e.target.value)} 
              value={city}
              onKeyPress={getWeather}
            />
          </div>


          {/* If the desired location is existed*/}
          <div>      
            {typeof data.location === 'undefined' ? (
              <div>                
              </div>
            ): (              
              <div className="weather-data">                                  
                <OverallInfo weatherData={data}/>                                       
                <HourlyForecast weatherData={data}/>                                                
                <TodayWeather weatherData={data} skiData={skiData}/>
              </div>
            )}


            {/* If the desired location is NOT existed*/}
            {data.error ? (
                <p className="error-message">City not found.</p>
            ) : (
              <></>
            )}

          </div>
      </div>
    </div>
  )  
}
