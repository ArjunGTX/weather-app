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
    this.isValid = true;
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

  setError = (message) => {
    this.setState({
      bgImage: 'assets/images/404.png',
      apiLocation: message,
      display: 'none'
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
      this.isValid = true;
      this.setState({display: 'block'})
    })
    .catch(err => {
      console.log(err);
      this.isValid = false;
      this.setError('Unknown Location');
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
    console.log(scrollH);
    console.log(scrollT);
    console.log(divH);
    if(scrollT + divH >= scrollH-150 ) {
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
    if(this.isValid) {
      return (
  
        <div id='container-overlay' onScroll={this.scrollHandler}>
          <img src={bgImage} className='bg-image' alt=''/>
          <div className='main-container'  >
            <div className='logo'>
            <img src='assets/icons/cloudy.png' alt='' className='logo-image'/>
            <p className='logo-text'>MOODY WEATHER</p>
            </div>
          <SearchBox onAction={this.storeLocation} enterKeyHandler={this.enterKeyHandler} clickHandler={this.clickHandler} location={location} />
          <Location loc={apiLocation} date={date} time={time} />
          <div className='card-container'>
          <Card img={weatherIcon} data1={temp} data2={condition} />
          <Card img={false} data1={windSpeed} data2={windDir} data3={gust} />
          <Card img={false} data1={humidity} data2={pressure} data3={precip} />
          </div>
          <footer>
            <p>© <a href='https://arjundev.netlify.app'>Arjun.Dev</a></p>
            <div className='socialmedia'>
            <a href= 'https://www.linkedin.com/in/arjunvc'>
                <img src="assets/icons/icons8-linkedin.svg" alt=''/>
              </a>
              <a href= 'https://github.com/ArjunGTX'>
                <img src="assets/icons/icons8-octocat.svg" alt=''/>
              </a>
              <a href= 'https://www.twitter.com/im_arjunvc'>
                <img src="assets/icons/icons8-twitter.svg" alt=''/>
              </a>
            </div>
            <p>Powered by <a href='https://unsplash.com'>unsplash</a> & <a href='https://www.weatherapi.com'>Weather Api</a>.</p>
          </footer>
          </div>
          <img src='assets/icons/down-arrow-svgrepo-com.svg' alt='arrow' id='arrow' style={{display: display}}/>
        </div>
      ) 
    } else {
      return (
  
        <div id='container-overlay' onScroll={this.scrollHandler}>
          <img src={bgImage} className='bg-image' alt='background' />
          <div className='main-container'>
          <SearchBox onAction={this.storeLocation} enterKeyHandler={this.enterKeyHandler} clickHandler={this.clickHandler} location={location} />
          <Location loc={apiLocation} date= '' time='' />
        </div>
        </div>
      ) 
    }
   
  }
}
