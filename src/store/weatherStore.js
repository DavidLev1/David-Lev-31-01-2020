import { observable, action } from "mobx";


class WeatherStore {
  @observable displayedCityName = '';
  @observable locationSuggestions = [];
  @observable error = "";

  @observable selectedLocation = {
    cityName:'Tel Aviv',
    key: '215854',
    countryName:'Israel'
  };
  @observable isNewCitySelected = false;

  @observable currentDateWeather = {};
  @observable fiveDaysForecast = [];

  @observable favorites = [];
  @observable isInFavorites = false;


  @action.bound
  setCurrentDateWeather(weatherItem) {
    this.currentDateWeather = weatherItem;
    this.displayedCityName = this.selectedLocation.cityName;
    const favoriteItemIndex = this.favorites.findIndex( item => item.cityKey === this.selectedLocation.key);
    this.isInFavorites = favoriteItemIndex > -1 ? true : false;
    this.isNewCitySelected = false;
    
  }
  
  @action.bound
  setFiveDaysForecast(fiveDaysWeatherItem) {
    this.fiveDaysForecast = fiveDaysWeatherItem;
  }

  @action.bound
  setSelectedLocation(locationItem) {
    this.selectedLocation = locationItem;
    this.locationSuggestions = [];
    this.isNewCitySelected = true;
  }

  @action.bound
  resetToNewCity() {
    this.isNewCitySelected = false;
    this.locationSuggestions = [];
    this.displayedCityName = '';
  }

  @action.bound
  setLocationSuggestions(locations) {
    this.locationSuggestions = locations;
  }

  @action.bound
  onFavoriteChoice() {
    
     if (this.isInFavorites) this.removeFavoriteLocation();
     else this.addFavoriteLocation();
  }

  addFavoriteLocation() {
    const favoriteItem = {
      cityKey: this.selectedLocation.key,
      cityName: this.selectedLocation.cityName, 
      cityWeather: this.currentDateWeather
    }
    this.favorites.push(favoriteItem);
    this.isInFavorites = true;
  }

  
  removeFavoriteLocation() {
      this.favorites =  this.favorites.filter( item => item.cityKey !== this.selectedLocation.key);
      this.isInFavorites = false;
  }
}

export const weatherStore = new WeatherStore();
