import { getWeather, get5DaysForecast, getCityAutocomplete } from "../api/endpoints";
import { getFormattedDate } from "./visual-design";
import { isOnlyEnglishLetters, isValidMinLength } from "./logical-aid";
import { weatherStore } from "../store/weatherStore";


export class Setters {
  static setWeatherByCityKey = cityKey => {
    getWeather(cityKey)
    .then( localWeatherData => {
      const observationDateTime = new Date(localWeatherData[0].LocalObservationDateTime);
      const observationDate = getFormattedDate(observationDateTime);

      weatherStore.setCurrentDateWeather({
        // Now 'weatherStore.currentDateWeather' includes that object
        currentDate: observationDate,
        tempC: localWeatherData[0].Temperature.Metric.Value + "°C",
        tempF: localWeatherData[0].Temperature.Imperial.Value + "°F",
        weatherDescription: localWeatherData[0].WeatherText
      });
    });
  };
  
  static setDefaultCurrentDayWeather = () => {
    const cityKey = "215854";
    this.setWeatherByCityKey(cityKey);
  };


  static setDefault5DaysForecast = () => {
    const cityKey = "215854";

    get5DaysForecast(cityKey)
    .then( fiveDaysForecastData => {
      const fiveDaysForecast = fiveDaysForecastData.DailyForecasts;
      weatherStore.setFiveDaysForecast(fiveDaysForecast);
    });
  };
  

  static setSelectedLocation = locationItem => {
    weatherStore.setSelectedLocation(locationItem);
  };


  static setCurrentDayWeather = () => {
    this.setWeatherByCityKey(weatherStore.selectedLocation.key);

    getWeather(weatherStore.selectedLocation.key)
      .then( localWeatherData => {
        const observationDateTime = new Date(
          localWeatherData[0].LocalObservationDateTime
        );
        const observationDate = getFormattedDate(observationDateTime);

        weatherStore.setCurrentDateWeather({
          currentDate: observationDate,
          tempC: localWeatherData[0].Temperature.Metric.Value + "°C",
          tempF: localWeatherData[0].Temperature.Imperial.Value + "°F",
          weatherDescription: localWeatherData[0].WeatherText,
          error: ""
        });
      })
      .catch(err => console.log(err));
  };


  static set5DaysForecast = () => {
    get5DaysForecast(weatherStore.selectedLocation.key)
    .then( fiveDaysForecastData => {
        const fiveDaysForecast = fiveDaysForecastData.DailyForecasts;
        weatherStore.setFiveDaysForecast(fiveDaysForecast);
    });
  };
  

  static setLocationAutoComplete = e => {
    const userInput = e.target.value;

    if (!isOnlyEnglishLetters(userInput)) {
      weatherStore.error = "Please enter only english letters";
      weatherStore.locationSuggestions = [];
      return;
    }

    const USER_INPUT_MIN_LENGTH = 3;

    if (!isValidMinLength(userInput, USER_INPUT_MIN_LENGTH)) {
      weatherStore.error = `Please enter at least ${USER_INPUT_MIN_LENGTH} chars`;
      weatherStore.locationSuggestions = [];
      return;
    }

    weatherStore.error = "";

    setTimeout(() => {
      getCityAutocomplete(userInput)
        .then(autoCompleteResults => {
          const locations = autoCompleteResults.map(location => {
            return {
              cityName: location.LocalizedName,
              key: location.Key,
              countryName: location.Country.LocalizedName
            };
          });

          weatherStore.setLocationSuggestions(locations);
        })
        .catch(err => {
          console.log(err);
        });
    }, 500);
  };


  static setWeatherData = e => {
    e.preventDefault();

    this.setCurrentDayWeather();
    this.set5DaysForecast();
    weatherStore.resetToNewCity();
  };

}
