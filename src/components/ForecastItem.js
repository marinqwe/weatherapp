import React from 'react';
import moment from 'moment';

export const ForecastItem = props => (
    <div className="forecast-item">
        {props.units === 'metric' && (
            <div>
                {props.day.main.temp === props.maxTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__max">{Math.round(parseFloat(props.day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;C</div>
                    </div>
                ) : props.day.main.temp === props.minTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__min">{Math.round(parseFloat(props.day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;C</div>
                    </div>
                ) : (
                    <div className="forecast-temp">
                        <div className="forecast-temp__num">{Math.round(parseFloat(props.day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;C</div>
                    </div>
                )}
            </div>
        )}
        {props.units === '' && (
            <div>
                {props.day.main.temp === props.maxTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__max">{Math.round(parseFloat(props.day.main.temp))}</div>
                        <div className="forecast-temp__unit"> K</div>
                    </div>
                ) : props.day.main.temp === props.minTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__min">{Math.round(parseFloat(props.day.main.temp))}</div>
                        <div className="forecast-temp__unit"> K</div>
                    </div>
                ) : (
                    <div className="forecast-temp">
                        <div className="forecast-temp__num">{Math.round(parseFloat(props.day.main.temp))}</div>
                        <div className="forecast-temp__unit"> K</div>
                    </div>
                )}
            </div>
        )}
        {props.units === 'imperial' && (
            <div>
                {props.day.main.temp === props.maxTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__max">{Math.round(parseFloat(props.day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;F</div>
                    </div>
                ) : props.day.main.temp === props.minTemp ? (
                    <div className="forecast-temp">
                        <div className="forecast-temp__min">{Math.round(parseFloat(props.day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;F</div>
                    </div>
                ) : (
                    <div className="forecast-temp">
                        <div className="forecast-temp__num">{Math.round(parseFloat(props.day.main.temp))}</div>
                        <div className="forecast-temp__unit">&deg;F</div>
                    </div>
                )}
            </div>
        )}
        <div className="forecast-day">{moment(props.day.dt_txt).format('dddd')}</div>
        <div className="forecast-date">{moment(props.day.dt_txt).format('LL')}</div>
    </div>
);
