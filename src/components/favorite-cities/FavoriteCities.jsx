import React from 'react';
import {observer} from 'mobx-react';
import './FavoriteCities.css';
import { useHistory } from "react-router-dom";
import { Setters } from '../../utils/setters';
import { Getters } from '../../utils/getters';


function FavoriteCities() {
    const history = useHistory(); 

    function showWeather(item) {

        Setters.setSelectedLocation({
            cityName:item.cityName,
            key:item.cityKey
        });

        Setters.setCurrentDayWeather();
        if(history) history.push('/weather');
        
    }
   
    return (
        <div className="favorite-cities">
            {
                Getters.getFavorites().length > 0 
                ?
                Getters.getFavorites().map((item,index) => (
                    <div 
                        key={index.toString()}
                        className="favorite-city"
                    >
                        <div className="favorite-city-name">{item.cityName}</div>
                        <div>{item.cityWeather.tempC}</div>
                        <div className="weather-description">{item.cityWeather.weatherDescription}</div>
    
    
                        <button 
                            className="favorite-weather-btn"
                            onClick={()=> {showWeather(item)}}
                        >
                            See weather
                        </button>
                    </div>
                ))
                :
                <div className="no-favorites">No favorite cities</div>
            }
        </div>
    )
  
 };
 
export default  observer(FavoriteCities);