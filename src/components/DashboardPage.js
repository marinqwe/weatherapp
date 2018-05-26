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
import Geocode from 'react-geocode';
import api from '../api';

Geocode.setApiKey(`${api.mapKey}`);

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
                getGroupData(unit).then(res => {
                    this.setState(() => ({
                        groupData: res,
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
            Geocode.fromAddress(`${this.state.city}`).then(res => {
                const { lat, lng } = res.results[0].geometry.location;
                this.setState(() => ({
                    error: '',
                    coords: {
                        lat: lat,
                        lon: lng
                    },
                    fireRedirect: true
                }));
                // console.log(this.state);
            });
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
        const error = this.props.location.state || false;
        if (this.state.loading) {
            return <LoadingPage />;
        }
        return (
            <div>
                <Header
                    onUnitChange={this.onUnitChange}
                    onSortChange={this.onSortChange}
                    currentUnit={this.state.unit}
                    location={this.props.location.pathname}
                />
                <div className="background">
                    <div className="content-container">
                        {typeof error.error === 'string' && <div className="error">{error.error}</div>}
                        <div className="list-body">
                            {this.state.groupData.map(obj => (
                                <ListItem key={obj.id} value={obj} units={this.state.unit} />
                            ))}
                        </div>
                        <SearchForm
                            error={this.state.error}
                            submitForm={this.submitForm}
                            city={this.state.city}
                            onInputChange={this.onInputChange}
                        />
                        {this.state.fireRedirect && (
                            <Redirect
                                to={{
                                    pathname: `/${this.state.city}`,
                                    state: {
                                        units: `${this.state.unit}`,
                                        name: `${this.state.city}`,
                                        lat: `${this.state.coords.lat}`,
                                        lon: `${this.state.coords.lon}`
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
