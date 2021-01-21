import './App.css';
import React, { Component } from 'react'
import Weather from './Components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Formwerther from './Components/Formwerther';



//api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const API_key ="5a51cfc9d0ceeed17462267bf3ce0dac"
 class App extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
       city: undefined,
       country: undefined,
       icon: undefined,
       main: undefined,
       celsius: undefined,
       temp_max: undefined,
       temp_min:undefined,
       description: "",
       error: false 
     };
     this.weathericon={
       Thunderstrom:"wi-thunderstorm",
        Drizzle:"wi-sleet",
        Rain:"wi-strom-showers",
        Snow:"wi-snow",
        Atmosphere:"wi-fog",
        Clear: "wi-day-sunny",
        clouds: "wi-day-fog"
     }
   }
   calCelsius (temp){
     let cell = Math.floor(temp-273.15);
     return cell
   }
   get_Weathericon(icons, rangeld ){
     switch(true){
       case rangeld>=200&&rangeld<=232:
         this.setState({icon:this.weathericon.Thunderstrom});
         break;
       case rangeld>=300&&rangeld<=332:
         this.setState({icon:this.weathericon.Drizzle});
         break;
         case rangeld>=500&&rangeld<=531:
          this.setState({icon:this.weathericon.Rain});
          break;
          case rangeld>=600&&rangeld<=622:
            this.setState({icon:this.weathericon.Snow});
            break;
            case rangeld>=701&&rangeld<=732:
              this.setState({icon:this.weathericon.Atmosphere});
              break;
              case rangeld>=800:
                this.setState({icon:this.weathericon.Clear});
                break;
                case rangeld>=801&&rangeld<=829:
                  this.setState({icon:this.weathericon.clouds});
                  break; 
                  default:
                    this.setState({icon:this.weathericon.clouds});
      
     }
   }
   getWeather= async(event)=>{
     event.preventDefault();
     const city = event.target.elements.city.value;
     const country = event.target.elements.country.value;
     if(city && country){
      const api_call  = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      const response = await api_call.json();
      
      this.setState({
        city:`${response.name},${response.sys.country}`,
  
        celsius:this.calCelsius(response.main.temp),
        temp_max:this.calCelsius(response.main.temp_max),
        temp_min:this.calCelsius(response.main.temp_min),
        description:response.weather[0].description,
      });
      this.get_Weathericon(this.weathericon,response.weather[0].id)
     }else{
       this.setState({error: true});
     }
   }
   
  render() {
    return (
      <div className="App">
        <Formwerther loadweather={this.getWeather} eror={this.state.error}/>
      <Weather 
      city={this.state.city} 
      country={this.state.country}
      temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description = {this.state.description}
      weathericon={this.state.icon}
      />
        </div>
    )
  }
}

export default App;
