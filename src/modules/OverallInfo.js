// This component returns the Overall Information, 
// which includes the name, country, temperature of the location.
const OverallInfo = (props) => {
    
    // Collect the argument into the variable "weatherData".
    const {weatherData} = props;
    return (
        <div>
            <div className="location-div">                
                <p className="city">{weatherData?.location?.name}</p>
                <div className ="country">
                    <p> {weatherData?.location?.country}</p>                
                </div>
            </div>            
            <div className="temp-div">
                <img src={weatherData?.current?.condition?.icon} alt="weather-icon"></img>
                <p className="temp">{weatherData?.current?.temp_c}°C</p>                                
            </div>
        </div>
    );
}

// Render the component.
export default OverallInfo;
