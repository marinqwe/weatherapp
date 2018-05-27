import React from 'react';
import { Redirect } from 'react-router-dom';
import ListItem from './ListItem';
import LoadingPage from './LoadingPage';
import Header from './Header';
import { SearchForm } from './SearchForm';
import { getGroupData } from '../utils/api';
import { convertTemp, getUnits, setUnits } from '../utils/unitSwitch';
import { UNITS } from '../utils/units';
import { sortByName, sortByTemp, reverseSortByName, reverseSortByTemp } from '../utils/sortValue';
import { getCityCoords } from '../utils/helpers';
import api from '../api';
import ErrorPage from './Error';


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: '',
            coords: {
                lat: 0,
                lon: 0
            },
            groupData: [],
            fireRedirect: false,
            city: '',
            error: '',
            geocodeErr: '',
            loading: true
        };
    }
    componentDidMount() {
        const unit = getUnits();
        this.setState(
            () => ({
                unit
            }),
            () => {
                getGroupData(unit)
                    .then(res => {
                        this.setState(() => ({
                            groupData: res,
                            loading: false
                        }));
                    })
                    .catch(error => {
                        this.setState(() => ({
                            error,
                            loading: false
                        }));
                    });
            }
        );
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.unit !== this.state.unit) {
            const unit = this.state.unit;
            setUnits(unit);
        }
    }
    componentWillUnmount() {
        console.log('Component will unmount');
    }
    onInputChange = e => {
        const city = e.target.value;
        this.setState({ city });
    };
    submitForm = e => {
        e.preventDefault();
        if (!this.state.city || this.state.city.trim() === '') {
            this.setState(() => ({ error: 'Please enter a city name correctly to get the forecast.' }));
        } else {
            const city = this.state.city;
            getCityCoords(city).then(res => {
                this.setState(() => ({
                    error: '',
                    coords: {
                        lat: res.lat,
                        lon: res.lng
                    },
                    fireRedirect: true
                }));
            }).catch(error => {
                this.setState(() => ({
                    geocodeErr: error,
                    coords: {
                        lat: null,
                        lon: null
                    },
                    fireRedirect: true
                }))
            })
        }
    };
    onSortChange = e => {
        const groupData = [].concat(this.state.groupData);
        if (e.target.value === 'aNames') {
            this.setState(() => ({
                groupData: sortByName(groupData)
            }));
        } else if (e.target.value === 'dNames') {
            this.setState(() => ({
                groupData: reverseSortByName(groupData)
            }));
        } else if (e.target.value === 'aTemps') {
            this.setState(() => ({
                groupData: sortByTemp(groupData)
            }));
        } else if (e.target.value === 'dTemps') {
            this.setState(() => ({
                groupData: reverseSortByTemp(groupData)
            }));
        }
    };
    onUnitChange = e => {
        const prevUnit = getUnits();
        if (e.target.value === UNITS.KELVIN) {
            this.changeUnit(prevUnit, UNITS.KELVIN);
        } else if (e.target.value === UNITS.CELSIUS) {
            this.changeUnit(prevUnit, UNITS.CELSIUS);
        } else if (e.target.value === UNITS.FAHRENHEIT) {
            this.changeUnit(prevUnit, UNITS.FAHRENHEIT);
        }
    };
    changeUnit = (from, to) => {
        const groupData = [].concat(this.state.groupData);
        this.setState(() => ({
            unit: to,
            groupData: convertTemp(from, to, groupData)
        }));
    };

    render() {
        const errMsg = 'Oops! Fetching data failed. Please try again.';
        const { error, geocodeErr, unit, city, coords, loading, fireRedirect, groupData } = this.state;
        if (loading) {
            return <LoadingPage />;
        }
        if (error) {
            return <ErrorPage error={error} message={errMsg} />;
        }
        return (
            <div>
                <Header
                    onUnitChange={this.onUnitChange}
                    onSortChange={this.onSortChange}
                    currentUnit={unit}
                    location={this.props.location.pathname}
                />
                <div className="background">
                    <div className="content-container">
                        <div className="list-body">
                            {groupData.map(obj => (
                                <ListItem key={obj.id} value={obj} units={unit} />
                            ))}
                        </div>
                        <SearchForm
                            error={error}
                            submitForm={this.submitForm}
                            city={city}
                            onInputChange={this.onInputChange}
                        />
                        {fireRedirect && (
                            <Redirect
                                to={{
                                    pathname: `/${city}`,
                                    state: {
                                        units: `${unit}`,
                                        name: `${city}`,
                                        lat: `${coords.lat}`,
                                        lon: `${coords.lon}`,
                                        geocodeErr: `${geocodeErr}`
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default DashboardPage;
