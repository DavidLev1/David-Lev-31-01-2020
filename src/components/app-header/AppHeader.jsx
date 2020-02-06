import React, { useState } from 'react';
import './AppHeader.css';
import { NavLink } from 'react-router-dom';


const AppHeader =  () => {
    const [themeToGet, setThemeToGet] = useState('Show Dark Screen');

    return (
        <div>
            <nav style={{color: 'black'}}>
                <span>
                    <NavLink
                        to="/weather"
                        className="link"
                        activeClassName={'active-weather-link'}
                    >
                        weather
                    </NavLink>
                </span>
                &emsp;
                <span>
                    <NavLink 
                        to="/favoriteCities"
                        className="link"
                        activeClassName={'active-favorites-link'}
                    >
                        favorites
                    </NavLink>
                </span>
                <br/>
                 
                <button
                    className="change-pallet-btn"
                    onClick={
                        () => setThemeToGet( prev => {
                            if(prev==='Show Dark Screen') {
                                setThemeToGet('Show Light Screen')
                                const bodyContent = document.getElementsByTagName("body")[0];
                                bodyContent.style.background = 'linear-gradient(90deg, #3D6B69 0%, #185E63 100%)';
                            }
                            else {
                                setThemeToGet('Show Dark Screen')
                                const bodyContent = document.getElementsByTagName("body")[0];
                                bodyContent.style.background = 'linear-gradient(90deg, #2F8AA9 0%, #8ABECC 100%)';
                            }
                        })
                    }
                >
                    {themeToGet}
                </button>
            </nav>
        </div>
    )   
}

export default AppHeader
