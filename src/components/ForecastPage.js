import React from 'react';
import { Link } from 'react-router-dom';
import { getForecastData } from '../utils/api';
import moment from 'moment';
import { MyMapComponent } from './GoogleMap';
import Header from './Header';
import LoadingPage from './LoadingPage';
import { ForecastItem } from './ForecastItem';
import { getMaxTemp, getMinTemp } from '../utils/helpers';

class ForecastPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastData: [],
            maxTemp: '',
            minTemp: '',
            loading: true,
            hasError: false
        };
    }
    componentDidMount() {
        const q = this.props.match.params.q;
        const units = this.props.location.state.units;
        getForecastData(q, units).then(res => {
            if (res === undefined) {
                this.setState(() => ({ hasError: true }));
                this.handleError();
            } else {
                this.setState(() => ({
                    forecastData: res,
                    maxTemp: getMaxTemp(res),
                    minTemp: getMinTemp(res),
                    loading: false
                }));
            }
        });
    }
    handleError = () => {
        if (this.state.hasError === true) {
            this.props.history.push({
                pathname: '/',
                state: {
                    error: 'City not found. Make sure you got the name casing correct.'
                }
            });
        }
    };
    render() {
        const { location } = this.props;
        const lon = parseFloat(location.state.lon);
        const lat = parseFloat(location.state.lat);
        const units = location.state.units;
        const { forecastData, maxTemp, minTemp } = this.state;
        if (this.state.loading) {
            return <LoadingPage />;
        }
        return (
            <div>
                <Header />
                <div className="background">
                    <div className="content-container">
                        <div className="forecast__title">{this.props.location.state.name} forecast</div>
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
                    <div className="google-map">
                        <MyMapComponent isMarkerShown lat={lat} lon={lon} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ForecastPage;
