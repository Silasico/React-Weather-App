import search from "./images/search.png"
import { useState } from "react"

function App() {
  const [cityName, setCityName] = useState("")
  const [resources, setResources] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const apiKey = "aaa3601499338c4768c741c0e8592f10"
  const apiCall = "https://api.openweathermap.org/data/2.5/weather?"
  
  const getWeather = async (city) => {
    if (city) {
      const res = await fetch(apiCall + `q=${city}&appid=${apiKey}&units=metric`)
      const data = await res.json()
      if (await data.cod == 404) {
        setErrorMessage(data.message)
        setResources()
      } else {
        setResources(await data);
        setErrorMessage("")
      }
    } else {
      setErrorMessage("Please enter a city to search")
    }
  }
  
  return (
    <div className="App">
      <div className = "search">
        <input 
          type = "text" 
          placeholder = "Enter your city" 
          value = {cityName}
          onChange = {(e) => setCityName(e.target.value)}
        />
        <button onClick = {() => getWeather(cityName)}><img src = "./images/search.png" alt = ""/></button>
        {errorMessage && <h2>{errorMessage}</h2>}
      </div>
      
      <div className = "weather" style = {resources ? {display: "block"} : {display: "none"}}>
        <div className = "temperature">
          <img src = {resources && `./images/${resources.weather[0].main.toLowerCase()}.png`} alt = ""/>
          <h1>{resources && Math.round(resources.main.temp)}°C</h1>
          <h2>{resources && resources.name}</h2>
          <p>(Lon: {resources && Math.round(resources.coord.lon)}° Lat: {resources && Math.round(resources.coord.lat)}°)</p> 
        </div>
        <div className = "more-info">
          <div className = "col">
            <img src = "./images/humidity.png" alt = ""/>
            <div>
              <h4 className = "humidity">{resources && resources.main.humidity}%</h4>
              <p>Humidity</p>
            </div>
          </div>
          <div className = "col">
            <img src = "./images/wind.png" alt = ""/>
            <div>
              <h4 className = "wind-speed">{resources && resources.wind.speed}km/h</h4>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
