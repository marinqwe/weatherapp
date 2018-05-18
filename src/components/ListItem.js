import React from 'react';
import { Link } from 'react-router-dom';
import WeatherIcon from 'react-icons-weather';
import { capitalizeFirstLetter } from '../utils/helpers';

const ListItem = props => (
    <div className="list-item">
        <Link
            className="list-link"
            to={{
                pathname: `/${props.value.name},${props.value.sys.country}`,
                state: {
                    name: `${props.value.name}`,
                    lon: `${props.value.coord.lon}`,
                    lat: `${props.value.coord.lat}`,
                    units: `${props.units}`
                }
            }}
        >
            <div>
                {props.value.name}, {props.value.sys.country}
            </div>
        </Link>
        <div className="list-item__content">
            {props.units === 'metric' && (
                <div className="list-item__temp">
                    <div className="list-item__num">{Math.round(parseFloat(props.value.main.temp))}</div>
                    <div className="list-item__unit">&deg;C</div>
                </div>
            )}
            {props.units === '' && (
                <div className="list-item__temp">
                    <div className="list-item__num">{Math.round(parseFloat(props.value.main.temp))}</div>
                    <div className="list-item__unit"> K</div>
                </div>
            )}
            {props.units === 'imperial' && (
                <div className="list-item__temp">
                    <div className="list-item__num">{Math.round(parseFloat(props.value.main.temp))}</div>
                    <div className="list-item__unit">&deg;F</div>
                </div>
            )}
            <div className="list-desc-icon">
                <WeatherIcon className="wicon" name="owm" iconId={`${props.value.weather[0].id}`} />
                <div className="list-item__description">{capitalizeFirstLetter(props.value.weather[0].description)}</div>
            </div>
        </div>
    </div>
);
export default ListItem;
