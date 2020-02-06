import React from 'react'
import './CitiesSearchForm.css'
import { observer } from 'mobx-react';
import { weatherStore } from './../../store/weatherStore';


const CitiesSearchForm = props => {
    return (
        <div>
            <form onSubmit={props.getWeatherMethod}  autoComplete="off">
                {
                    (!weatherStore.isNewCitySelected) &&
                    <input 
                        type="text" 
                        name="city" 
                        placeholder="Insert City"  
                        onChange={props.inputChanged}
                    />
                }

                {
                    weatherStore.isNewCitySelected && 
                        <label>
                            {weatherStore.selectedLocation && weatherStore.selectedLocation.cityName}  
                            {weatherStore.selectedLocation.cityName && ','} 
                            {weatherStore.selectedLocation && weatherStore.selectedLocation.countryName}
                        </label>
                }

                &ensp;

                <button 
                    disabled={
                        (!weatherStore.selectedLocation) || 
                        (weatherStore.selectedLocation && weatherStore.selectedLocation.cityName==='')
                    } 
                >
                    Show Weather
                </button>       
            </form>
            
            <p className="error">{props.error}</p> 
        </div>  
    )
}

export default observer(CitiesSearchForm)
