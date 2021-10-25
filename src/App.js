import React  from "react";
import './styles.css';
import Location from "./Location";
import SearchBox from "./SearchBox";
import Card from './Card';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location:'Leh',
      bgImage: '',
      apiLocation: '',
      date: "",
      temp: "",
      condition: "",
      weatherIcon: '',
      time: '',
      windSpeed: '',
      windDir: '',
      gust: '',
      humidity: '',
      pressure: '',
      precip: '',
      display: 'block'
    }
  }

  storeLocation = e => {
    this.setState({location: e.target.value})
  }

  setWeatherState = (weather) => {
    let {
      locInfo,
      currentDate,
      time,
      temperature,
      condition,
      weatherIcon,
      windSpeed,
      windDir,
      gust,
      humidity,
      pressure,
      precip
    } = weather;
    this.setState({
      apiLocation: locInfo,
      date: currentDate.toDateString(),
      temp: `${temperature}°C`,
      condition: condition,
      weatherIcon: weatherIcon,
      time: time,
      humidity: `Humidity: ${humidity}%`,
      pressure: `Pressure: ${pressure}PSI`,
      precip: `Precipitation: ${precip}mm`,
      gust:`Gust: ${gust}Kph`,
      windDir: `Wind Direction: ${windDir}`,
      windSpeed: `Wind Speed: ${windSpeed}Kph`
    })
  } 

  setError = (message,suggestion) => {
    this.setState({
      bgImage: 'assets/images/404.png',
      apiLocation: message,
      date: '',
      time: '',
      location:"",
      temp: suggestion,
      weatherIcon: '',
      condition: '' 
    })
  }

  setBgImage = (location) => {
    let apiKey = 'UFHf9k2ZVA-QZUwhyEnVVOUMUW4XetMIgsov2BN2jrQ';
    let baseUrl = 'https://api.unsplash.com/search/photos/';
    fetch(`${baseUrl}?query=${location}&client_id=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      this.setState({bgImage: data.results[Math.floor(Math.random() * 5)].urls.regular})
    })
    .catch(err => {
      console.log(err);
      this.setState({bgImage: 'assets/images/404.png'});
    })
  }

  setWeather = (location) => {
    let apiKey = 'a4b66ce8120a4f2cb4d173237212210';
    let baseUrl = 'https://api.weatherapi.com/v1/';
    fetch(`${baseUrl}current.json?key=${apiKey}&q=${location}`)
    .then(response => response.json())
    .then(weatherData => {
      let fetchLocation = weatherData.location.name;
      this.setBgImage(fetchLocation);
      let d = new Date();
      let weather = {
        locInfo: `${fetchLocation}, ${weatherData.location.country}`,
        currentDate: new Date(weatherData.current.last_updated),
        time: `${d.getUTCHours()}: ${d.getUTCMinutes()} UTC`,
        temperature: Math.round(weatherData.current.temp_c),
        condition: weatherData.current.condition.text,
        weatherIcon: weatherData.current.condition.icon,
        windSpeed: weatherData.current.wind_kph,
        windDir: weatherData.current.wind_dir,
        gust: weatherData.current.gust_kph,
        humidity: weatherData.current.humidity,
        pressure: weatherData.current.pressure_in,
        precip: weatherData.current.precip_mm
      }
      this.setWeatherState(weather);
    })
    .catch(err => {
      console.log(err);
      this.setError('Unknown Location','Try a different Location');
    })
  }

  clickHandler = () => {
    this.setWeather(this.state.location);
    this.setState({location: ''});
  }

  enterKeyHandler = (e) => {
    if(e.key === 'Enter') {
      this.setWeather(this.state.location);
      this.setState({location: ''});
    }
  }

  componentDidMount() {
    this.setWeather(this.state.location);
  }

  scrollHandler = e => {
    let scrollT = Number(e.target.scrollTop);
    let scrollH = Number(e.target.scrollHeight);
    let divH = Number(e.target.offsetHeight);
    if(scrollT + divH >= scrollH ) {
      this.setState({display: 'none'});
    } else {
      this.setState({display: 'block'});
    }
  }

  render() {
    let {
      location,
      bgImage,
      apiLocation,
      date,
      temp,
      condition,
      weatherIcon,
      time,
      humidity,
      pressure,
      precip,
      gust,
      windDir,
      windSpeed,
      display
    } = this.state;
    return (
  
      <div id='container-overlay' onScroll={this.scrollHandler}>
        <img src={bgImage} className='bg-image' alt='background' />
        <div className='main-container'>
        <SearchBox onAction={this.storeLocation} enterKeyHandler={this.enterKeyHandler} clickHandler={this.clickHandler} location={location} />
        <Location loc={apiLocation} date={date} time={time} />
        <div className='card-container'>
        <Card img={weatherIcon} data1={temp} data2={condition} />
        <Card img={false} data1={windSpeed} data2={windDir} data3={gust} />
        <Card img={false} data1={humidity} data2={pressure} data3={precip} />
        </div>
        </div>
        <img src='assets/icons/down-arrow-svgrepo-com.svg' alt='arrow' id='arrow' style={{display: display}}/>
      </div>
    ) 
  }
}