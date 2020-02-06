import React from "react";
import "./LocationsSuggestions.css";

const LocationsSuggestion = props => {
  return (
    props.suggestions.length > 0 && (
      <div className="suggestions-container">
        {props.suggestions.map(location => (
          <button
            key={location.key.toString()}
            className="select-btn"
            onClick={() => props.getSelectedLocation(location)}
          >
            {location.cityName}, {location.countryName}
          </button>
        ))}
      </div>
    )
  );
};

export default LocationsSuggestion;
