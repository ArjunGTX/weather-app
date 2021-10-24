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
      condition: ""
    }
  }

  storeLocation = e => {
    this.setState({location: e.target.value})
  }

  setWeatherState = (locInfo,currentDate,temperature,condition) => {
    this.setState({
      apiLocation: locInfo,
      date: currentDate.toDateString(),
      temp: `${temperature}°C`,
      condition: condition

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
      let temperature = Math.round(weatherData.current.temp_c);
      let condition = weatherData.current.condition.text;
      this.setWeatherState(locInfo,currentDate,temperature,condition);
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
      condition
    } = this.state;
    return (
  
      <div className='container-overlay'>
        <img src={bgImage} className='bg-image' alt='background' />
        <div className='main-container'>
        <div className='search-container'>
          <input className='loc-input' type= 'text' onChange={this.storeLocation} onKeyPress={this.enterKeyHandler} value={location} />
          <button className='search-btn' onClick={this.clickHandler}>
          <img className='search' src='assets/icons/icons8-search.svg' alt='search-icon'/>
          </button>
        </div>
        <div className='location-container'>
          <p className='location'>{apiLocation}</p>
          <p className='date'>{date}</p>
        </div>
        <div className='weather'>
          <p className='temperature'>{temp}</p><p className='condition'>{condition}</p>
        </div>
        </div>
        </div>
  
    ) 
  }
}