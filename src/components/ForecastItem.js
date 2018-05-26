import React from 'react';
import moment from 'moment';
import { UNITS } from '../utils/units';

export const ForecastItem = ({ day, units, maxTemp, minTemp}) => (
    <div className="forecast-item">
        {units === UNITS.CELSIUS && (
            <div>
                {day.main.temp === maxTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__max">{Math.round(parseFloat(day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;C</div>
                    </div>
                ) : day.main.temp === minTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__min">{Math.round(parseFloat(day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;C</div>
                    </div>
                ) : (
                    <div className="forecast-temp">
                        <div className="forecast-temp__num">{Math.round(parseFloat(day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;C</div>
                    </div>
                )}
            </div>
        )}
        {units === UNITS.KELVIN && (
            <div>
                {day.main.temp === maxTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__max">{Math.round(parseFloat(day.main.temp))}</div>
                        <div className="forecast-temp__unit"> K</div>
                    </div>
                ) : day.main.temp === minTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__min">{Math.round(parseFloat(day.main.temp))}</div>
                        <div className="forecast-temp__unit"> K</div>
                    </div>
                ) : (
                    <div className="forecast-temp">
                        <div className="forecast-temp__num">{Math.round(parseFloat(day.main.temp))}</div>
                        <div className="forecast-temp__unit"> K</div>
                    </div>
                )}
            </div>
        )}
        {units === UNITS.FAHRENHEIT && (
            <div>
                {day.main.temp === maxTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__max">{Math.round(parseFloat(day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;F</div>
                    </div>
                ) : day.main.temp === minTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__min">{Math.round(parseFloat(day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;F</div>
                    </div>
                ) : (
                    <div className="forecast-temp">
                        <div className="forecast-temp__num">{Math.round(parseFloat(day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;F</div>
                    </div>
                )}
            </div>
        )}
        <div className="forecast-day">{moment(day.dt_txt).format('dddd')}</div>
        <div className="forecast-date">{moment(day.dt_txt).format('LL')}</div>
    </div>
);
