import React, { Component } from "react";
import { observer } from "mobx-react";

import './Weather.css';

import GeneralInfo from "../general-info/GeneralInfo";
import CitiesSearchForm from "../cities-search-form/CitiesSearchForm";
import LocationsSuggestions from "../locations-suggestions/LocationsSuggestions";
import WeatherInfo from "../weather-info/WeatherInfo";
import DailyForecast from "../daily-forecast/DailyForecast";

import { getFormattedDate } from "../../utils/visual-design";
import { Setters } from "../../utils/setters";
import { weatherStore } from "../../store/weatherStore";

@observer
class Weather extends Component {
  constructor(props) {
    super(props);
    this.store = weatherStore;
  }

  componentDidMount() {
    this.setDefaultCurrentDayWeather();
    this.setDefault5DaysForecast();
  }

  setDefaultCurrentDayWeather = Setters.setDefaultCurrentDayWeather;
  setDefault5DaysForecast = Setters.setDefault5DaysForecast;
  setCurrentDayWeather = Setters.setCurrentDayWeather;
  set5DaysForecast = Setters.set5DaysForecast;
  setLocationAutoComplete = Setters.setLocationAutoComplete;
  setSelectedLocation = Setters.setSelectedLocation;
  setWeatherData = Setters.setWeatherData;
  

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 general-info">
              <GeneralInfo />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 form">
              <CitiesSearchForm
                getWeatherMethod={this.setWeatherData}
                inputChanged={this.setLocationAutoComplete}
                error={this.store.error}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 form">
              <LocationsSuggestions
                suggestions={this.store.locationSuggestions}
                getSelectedLocation={this.setSelectedLocation}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 weather-info">
              {this.store.currentDateWeather.tempC && (
                <WeatherInfo
                  currentCityName={this.store.displayedCityName}
                  currentDate={this.store.currentDateWeather.currentDate}
                  tempC={this.store.currentDateWeather.tempC}
                  tempF={this.store.currentDateWeather.tempF}
                  isDayTime={this.store.currentDateWeather.isDayTime}
                  isInFavorites = {this.store.isInFavorites}
                  container={this.props.toasterContainer}
                  weatherDescription={
                    this.store.currentDateWeather.weatherDescription
                  }
                  invokedFavorites = {this.store.onFavoriteChoice}
                />
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 weather-info">
              {this.store.fiveDaysForecast.map((item, index) => (
                <DailyForecast
                  key={index.toString()}
                  currentDate={getFormattedDate(item.Date)}
                  minTemp={item.Temperature.Minimum.Value}
                  maxTemp={item.Temperature.Maximum.Value}
                  dayForecast={item.Day.IconPhrase}
                  nightForecast={item.Night.IconPhrase}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
