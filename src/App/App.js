import React  from "react";
import './App.css';

const cityDB = {
  'kerala': 'url(assets/images/cities/kerala.jpg)',
  'gujarat': 'url(assets/images/cities/gujarat.jpg)',
  'hyderabad': 'url(assets/images/cities/hyderabad.jpg)',
  'jaipur': 'url(assets/images/cities/jaipur.jpg)',
  'goa': 'url(assets/images/cities/beach.jpg)',
  'chennai': 'url(assets/images/cities/chennai.jpg)',
  'kolkata': 'url(assets/images/cities/kolkata.jpg)',
  'ladakh': 'url(assets/images/cities/mountain.jpg)',
  'leh': 'url(assets/images/cities/mountain.jpg)',
  'kashmir': 'url(assets/images/cities/mountain.jpg)',
  'jammu': 'url(assets/images/cities/mountain.jpg)',
  'paris': 'url(assets/images/countries/france.jpg)',
  'ooty': 'url(assets/images/cities/munnar.jpg)',
  'kodaikanal': 'url(assets/images/cities/munnar.jpg)',
  'munnar': 'url(assets/images/cities/munnar.jpg)',
  'mysore': 'url(assets/images/cities/mysore.jpg)',
  'pune': 'url(assets/images/cities/pune.jpg)',
  'punjab': 'url(assets/images/cities/punjab.jpg)',
  'shimla': 'url(assets/images/cities/shimla.jpg)',
  'ahamedabad': 'url(assets/images/cities/gujarat.jpg)',
  'vishakapatanam': 'url(assets/images/cities/town.jpg)',
  'surat': 'url(assets/images/cities/town.jpg)',
  'bhopal': 'url(assets/images/cities/chennai.jpg)',
  'noida': 'url(assets/images/cities/town.jpg)',
  'karnataka': 'url(assets/images/cities/mysore.jpg)',
  'telungala': 'url(assets/images/cities/town.jpg)',
  '': 'url(assets/images/cities/town.jpg)',
  'andaman and nicobar': 'url(assets/images/cities/beach.jpg)',
  'lakshadweep': 'url(assets/images/cities/beach.jpg)',
  'pudhucherry': 'url(assets/images/cities/beach.jpg)',
  'assam': 'url(assets/images/cities/munnar.jpg)',
  'nagaland': 'url(assets/images/cities/nagaland.jpg)',
  'sikkim': 'url(assets/images/cities/sikkim.jpg)',
  'manipur': 'url(assets/images/cities/sikkim.jpg)',
  'mizoram': 'url(assets/images/cities/sikkim.jpg)',
  'tripura': 'url(assets/images/cities/nagaland.jpg)',
  'arunachal pradhesh': 'url(assets/images/cities/nagaland.jpg)',
  'bihar': 'url(assets/images/cities/bihar.jpg)',
  'hariyana': 'url(assets/images/countries/india.jpg)',
  'chandigarh': 'url(assets/images/cities/town.jpg)',
  'orrisa': 'url(assets/images/cities/town.jpg)',
  'uttar pradhesh': 'url(assets/images/cities/nagaland.jpg)',
  'uttarakhand': 'url(assets/images/cities/nagaland.jpg)',
  'kochi': 'url(assets/images/cities/kerala.jpg)',
  'himachal pradhesh': 'url(assets/images/cities/shimla.jpg)',
  'jharkhand': 'url(assets/images/cities/town.jpg)',
  'meghalaya': 'url(assets/images/cities/meghalaya.jpg)',
  'west bengal': 'url(assets/images/cities/kolkata.jpg)',
  'andra pradhesh': 'url(assets/images/cities/hyderabad.jpg)',
  'tamil nadu': 'url(assets/images/cities/chennai.jpg)',
}

const countryDB = {
  'india': 'url(assets/images/countries/india.jpg)',
  'china': 'url(assets/images/countries/china.jpg)',
  'canada': 'url(assets/images/countries/canada.jpg)',
  'united states of america': 'url(assets/images/countries/usa.jpg)',
  'brazil': 'url(assets/images/countries/brazil.jpg)',
  'japan': 'url(assets/images/countries/japan.jpg)',
  'nepal': 'url(assets/images/countries/nepal.jpg)',
  'africa': 'url(assets/images/countries/africa.jpg)',
  'russia': 'url(assets/images/countries/russia.jpg)',
  'france': 'url(assets/images/countries/france.jpg)',
  'italy': 'url(assets/images/countries/italy.jpg)',
  'australia': 'url(assets/images/countries/australia.jpg)',
  'antartica': 'url(assets/images/countries/antartica.jpg)',
  'germany': 'url(assets/images/countries/germany.jpg)',
  'south korea': 'url(assets/images/countries/korea.jpg)',
  'north korea': 'url(assets/images/countries/korea.jpg)',
  'south africa': 'url(assets/images/countries/mexico.jpg)',
  'nigeria': 'url(assets/images/countries/mexico.jpg)',
  'mexico': 'url(assets/images/countries/mexico.jpg)',
  'egypt': 'url(assets/images/countries/europe2.jpg)',
  'spain': 'url(assets/images/countries/europe3.jpg)',
  'netherlands': 'url(assets/images/countries/europe.jpg)',
  'singapore': 'url(assets/images/countries/singapore.jpg)',
  'switzerland': 'url(assets/images/countries/switzerland.jpg)',
  'sweden': 'url(assets/images/countries/switzerland.jpg)',
  'belgium': 'url(assets/images/countries/europe.jpg)',
  'vietnam': 'url(assets/images/countries/desert.jpg)',
  'saudi arabia': 'url(assets/images/countries/desert.jpg)',
  'oman': 'url(assets/images/countries/desert.jpg)',
  'cuba': 'url(assets/images/countries/desert.jpg)',
  'bhutan': 'url(assets/images/countries/bhutan.jpg)',
  'kuwait': 'url(assets/images/countries/desert.jpg)',
  'united kingdom': 'url(assets/images/cities/london.jpg)',
  'united arab emirates': 'url(assets/images/cities/dubai.jpg)',
}

const randomDB = [
  'url(assets/images/random/town.jpg)',
  'url(assets/images/random/street3.jpg)',
  'url(assets/images/random/street2.jpg)',
  'url(assets/images/random/street.jpg)',
  'url(assets/images/random/street5.jpg)',
  'url(assets/images/random/street7.jpg)',
  'url(assets/images/random/street4.jpg)',
  'url(assets/images/random/street6.jpg)',
  'url(assets/images/random/town2.jpg)',
]

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location:'Paris',
      country: '',
      bgImage: 'url(assets/images/cities/paris.jpg)',
      apiLocation: '',
      date: "",
      temp: "",
      condition: ""
    }
  }

  storeLocation = e => {
    this.setState({location: e.target.value})
  }
 
  setBG = (loc,locDB) => {
    this.setState({bgImage: locDB[loc]});
  }

  setWeatherState = (locInfo,country,currentDate,temperature,condition) => {
    this.setState({
      country: country,
      apiLocation: locInfo,
      date: currentDate.toDateString(),
      temp: `${temperature}°C`,
      condition: condition

    })
  } 

  setError = message => {
    this.setState({
      bgImage: 'url(assets/images/not-found/404.png)',
      apiLocation: 'Unknown Location',
      date: '',
      location:"",
      temp: '',
      condition: '' 
    })
  }
  
  getWeatherUpdate = (location,locDB,locBg) => {
    let apiKey = 'a4b66ce8120a4f2cb4d173237212210 ';
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
    .then(response => response.json())
    .then(weatherData => {
      let locInfo = `${weatherData.location.name}, ${weatherData.location.country}`;
      let country = weatherData.location.country.toLowerCase();
      let currentDate = new Date(weatherData.current.last_updated);
      let temperature = weatherData.current.temp_c;
      let condition = weatherData.current.condition.text;
      this.setWeatherState(locInfo,country,currentDate,temperature,condition);
      if(!locBg) {
        if(locDB.hasOwnProperty(country)) {
          this.setBG(country,locDB);
        } else {
          this.setBG(Math.floor(Math.random() * randomDB.length),randomDB);
        }
      } else {
        this.setBG(locBg.toLowerCase(),locDB);
      }
    })
    .catch(err => {
      console.log(err);
      this.setError('Unknown Location');
    })
  }

  clickHandler = () => {
    let location = this.state.location.toLowerCase();
    if(cityDB.hasOwnProperty(location)) {
      this.getWeatherUpdate(location,cityDB,location);
    } else if(countryDB.hasOwnProperty(location)) {
      this.getWeatherUpdate(location,countryDB,location);
    } else {
      this.getWeatherUpdate(location,countryDB,false)
    } 
  }

  componentDidMount() {
    this.getWeatherUpdate(this.state.location,cityDB,this.state.location);
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
  
      <div className='container-overlay' style={{backgroundImage: bgImage}}>
        <div className='main-container'>
        <div className='search-container'>
          <input className='loc-input' type= 'text' onChange={this.storeLocation} value={location} />
          <button className='search-btn' onClick={this.clickHandler}>
          <img className='search' src='assets/icons/icons8-search.svg' alt='search-icon'/>
          </button>
        </div>
        <div className='weather-container'>
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