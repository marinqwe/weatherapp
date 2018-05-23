import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import ListItem from './ListItem';
import LoadingPage from './LoadingPage';
import Header from './Header';
import { SearchForm } from './SearchForm';
import { getGroupData } from '../utils/api';
import { unitSwitch } from '../utils/unitSwitch';
import { sortByName, sortByTemp, reverseSortByName, reverseSortByTemp } from '../utils/sortValue';
import Geocode from 'react-geocode';
import api from '../api';

Geocode.setApiKey(`${api.mapKey}`);

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            units: 'metric',
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
        try {
            const json = localStorage.getItem('units');
            const units = JSON.parse(json);

            if (units || units === '') {
                this.setState(
                    () => ({ units: units }),
                    () => {
                        getGroupData(units).then(res => {
                            this.setState(() => ({
                                groupData: res,
                                loading: false
                            }));
                        });
                    }
                );
            } else {
                const defaultUnits = this.state.units;
                getGroupData(defaultUnits).then(res => {
                    this.setState(() => ({
                        groupData: res,
                        loading: false
                    }));
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.units !== this.state.units) {
            const json = JSON.stringify(this.state.units);
            localStorage.setItem('units', json);
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
        if (e.target.value === '') {
            const kelvin = '';
            this.changeUnits(kelvin);
        } else if (e.target.value === 'metric') {
            const metric = 'metric';
            this.changeUnits(metric);
        } else if (e.target.value === 'imperial') {
            const imperial = 'imperial';
            this.changeUnits(imperial);
        }
    };
    changeUnits = units => {
        const groupData = [].concat(this.state.groupData);
        this.setState(prevState => ({
            units: units,
            groupData: unitSwitch(prevState.units, units, groupData)
        }));
    };
    
    render() {
        const error = this.props.location.state || false;
        let renderDashboard;
        if (this.state.loading) {
            renderDashboard = <LoadingPage />;
        } else {
            renderDashboard = (
                <div>
                    <Header
                        onUnitChange={this.onUnitChange}
                        onSortChange={this.onSortChange}
                        currentUnit={this.state.units}
                        location={this.props.location.pathname}
                    />
                    <div className="background">
                        <div className="content-container">
                        {(typeof error.error === 'string') &&
                            <div className="error">{error.error}</div>
                        }
                            <div className="list-body">
                                {this.state.groupData.map(obj => (
                                    <ListItem key={obj.id} value={obj} units={this.state.units} />
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
                                            units: `${this.state.units}`,
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

        return <div>{renderDashboard}</div>;
    }
}
export default DashboardPage;
