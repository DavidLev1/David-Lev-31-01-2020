import React from 'react'
import './DailyForecast.css'

const DailyForecast = props => {
    return (
        <div className="daily-forecast-container daily-forecast-info">
            <p>{props.currentDate}</p>
            <p>{props.minTemp}-{props.maxTemp}°C</p>

            <span className="tag-header">Day:</span>&nbsp;
            <span>{props.dayForecast}</span>
            <br/>
            <span className="tag-header">Night:</span>&nbsp;
            <span>{props.nightForecast}</span>
        </div>
    )
}

export default DailyForecast
