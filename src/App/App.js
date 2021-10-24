import React  from "react";
import './App.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location:'Paris',
      bgImage: '',
      apiLocation: '',
      date: "",
      temp: "",
      condition: "",
      weatherIcon: '',
      time: ''
    }
  }

  storeLocation = e => {
    this.setState({location: e.target.value})
  }

  setWeatherState = (locInfo,currentDate,temperature,condition,weatherIcon,time) => {
    this.setState({
      apiLocation: locInfo,
      date: currentDate.toDateString(),
      temp: `${temperature}°C`,
      condition: condition,
      weatherIcon: weatherIcon,
      time: time
    })
  } 

  setError = (message,suggestion) => {
    this.setState({
      bgImage: 'assets/images/404.png',
      apiLocation: message,
      date: '',
      location:"",
      temp: suggestion,
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
      let locInfo = `${fetchLocation}, ${weatherData.location.country}`;
      let currentDate = new Date(weatherData.current.last_updated);
      let d = new Date();
      let time = `${d.getUTCHours()}: ${d.getUTCMinutes()} UTC`;
      let temperature = Math.round(weatherData.current.temp_c);
      let condition = weatherData.current.condition.text;
      let weatherIcon = weatherData.current.condition.icon;
      this.setWeatherState(locInfo,currentDate,temperature,condition,weatherIcon,time);
      console.log(weatherIcon);
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

  render() {
    let {
      location,
      bgImage,
      apiLocation,
      date,
      temp,
      condition,
      weatherIcon,
      time
    } = this.state;
    return (
  
      <div className='container-overlay'>
        <img src={bgImage} className='bg-image' alt='background' />
        <div className='main-container'>
        <div className='search-container'>
          <input className='loc-input' type= 'text' onChange={this.storeLocation} onKeyPress={this.enterKeyHandler} value={location} autoFocus/>
          <button className='search-btn' onClick={this.clickHandler}>
          <img className='search' src='assets/icons/icons8-search.svg' alt='search-icon'/>
          </button>
        </div>
        <div className='location-container'>
          <p className='location'>{apiLocation}</p>
          <p className='date'>{`${date} ${time}`}</p>
        </div>
        <div className='weather'>
          <div className='temp-holder'>
          <img src={weatherIcon} alt='icon' className='weather-icon' />
          <p className='temperature'>{temp}</p>
          </div>
          <p className='condition'>{condition}</p>
        </div>
        </div>
        </div>
  
    ) 
  }
}