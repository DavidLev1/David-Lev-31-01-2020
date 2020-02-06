import React, { useState } from 'react';

import './WeatherInfo.css';


const WeatherInfo = props => {
    const [degreeTypeToGet, setDegreeTypeToGet] = useState('Show °F');
    const favoritesBtnText = props.isInFavorites ? 'Remove from favorites' : 'Add to favorites';
    
    return (
        <div>
            <button 
                className="favorites-btn" 
                onClick={ ()=> {
                    props.invokedFavorites();
                    
                    !props.isInFavorites && 
                        props.container.success(
                            `${props.currentCityName} has been added to favorites`, 
                            ``, 
                            {closeButton: false}       
                        )
                    props.isInFavorites && 
                        props.container.info(
                            `${props.currentCityName} has been removed from favorites`, 
                            ``, 
                            {closeButton: true}
                        )
                }}
            >
                {favoritesBtnText}
            </button>     

            <div className="weather-city-name">{props.currentCityName}</div>

            <div className="weather-data">
                { props.tempC &&
                    <div>
                        <p>{props.currentDate}</p>
                        
                        {
                            degreeTypeToGet==='Show °F' 
                            ?
                            <p>{props.tempC}</p>
                            :
                            <p>{props.tempF}</p>
                        }
                        <button
                            className="degree-btn"
                            onClick={ 
                                () => setDegreeTypeToGet(prev => {
                                    if(prev==='Show °F') setDegreeTypeToGet('Show °C');
                                    else setDegreeTypeToGet('Show °F');
                                })
                            }
                        >
                            {degreeTypeToGet}
                        </button>
                        <p className="weather-description"> 
                            {
                                props.weatherDescription
                                ?
                                <span>{props.weatherDescription}</span>
                                :
                                <span>No Weather Description</span>
                            }
                        </p>
                    </div>
                }  
            </div>
            
        </div>
    )
}


export default WeatherInfo
