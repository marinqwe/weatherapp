import React from 'react';
import { Link } from 'react-router-dom';
import WeatherIcon from 'react-icons-weather';
import { capitalizeFirstLetter } from '../utils/helpers';
import { UNITS } from '../utils/units';

const ListItem = ({ value, units }) => (
    <div className="list-item">
        <Link
            className="list-link"
            to={{
                pathname: `/${value.name},${value.sys.country}`,
                state: {
                    name: `${value.name}`,
                    lon: `${value.coord.lon}`,
                    lat: `${value.coord.lat}`,
                    units: `${units}`
                }
            }}
        >
            <div>
                {value.name}, {value.sys.country}
            </div>
        </Link>
        <div className="list-item__content">
            {units === UNITS.CELSIUS && (
                <div className="list-item__temp">
                    <div className="list-item__num">{Math.round(parseFloat(value.main.temp))}</div>
                    <div className="list-item__unit">&deg;C</div>
                </div>
            )}
            {units === UNITS.KELVIN && (
                <div className="list-item__temp">
                    <div className="list-item__num">{Math.round(parseFloat(value.main.temp))}</div>
                    <div className="list-item__unit"> K</div>
                </div>
            )}
            {units === UNITS.FAHRENHEIT && (
                <div className="list-item__temp">
                    <div className="list-item__num">{Math.round(parseFloat(value.main.temp))}</div>
                    <div className="list-item__unit">&deg;F</div>
                </div>
            )}
            <div className="list-desc-icon">
                <WeatherIcon className="wicon" name="owm" iconId={`${value.weather[0].id}`} />
                <div className="list-item__description">{capitalizeFirstLetter(value.weather[0].description)}</div>
            </div>
        </div>
    </div>
);
export default ListItem;
