import React from 'react';
import { getForecastData } from '../utils/api';
import { MyMapComponent } from './GoogleMap';
import Header from './Header';
import LoadingPage from './LoadingPage';
import { ForecastItem } from './ForecastItem';
import { getMaxTemp, getMinTemp } from '../utils/helpers';
import ErrorPage from './Error';

class ForecastPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastData: [],
            maxTemp: '',
            minTemp: '',
            loading: true,
            error: ''
        };
    }
    componentDidMount() {
        const q = this.props.match.params.q;
        const units = this.props.location.state.units;
        getForecastData(q, units)
            .then(res => {
                this.setState(() => ({
                    forecastData: res,
                    maxTemp: getMaxTemp(res),
                    minTemp: getMinTemp(res),
                    loading: false
                }));
            })
            .catch(error => {
                this.setState(() => ({
                    loading: false,
                    error
                }));
            });
    }
    render() {
        const errMsg = 'Oops! Forecast not found. Make sure you got the city name correct.';
        const { location } = this.props;
        const lon = parseFloat(location.state.lon);
        const lat = parseFloat(location.state.lat);
        const units = location.state.units;
        const { forecastData, maxTemp, minTemp, error, loading } = this.state;
        if (loading) {
            return <LoadingPage />;
        }
        if (error) {
            return <ErrorPage error={error} message={errMsg} />;
        }
        return (
            <div>
                <Header />
                <div className="background">
                    <div className="content-container">
                        <div className="forecast__title">{location.state.name} forecast</div>
                        <div className="forecast-body">
                            {forecastData.map((day, i) => (
                                <ForecastItem
                                    key={day.dt}
                                    day={day}
                                    units={units}
                                    minTemp={minTemp}
                                    maxTemp={maxTemp}
                                />
                            ))}
                        </div>
                    </div>
                    {location.geocodeErr ? (
                        <div className="error">City coordinates not found.</div>
                    ) : (
                        <div className="google-map">
                            <MyMapComponent isMarkerShown lat={lat} lon={lon} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ForecastPage;
