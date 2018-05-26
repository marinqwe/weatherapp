import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faEye from '@fortawesome/fontawesome-free-solid/faEye';
import Dropdown from './Dropdown';
import { UNITS } from '../utils/units';
import { getUnits } from '../utils/unitSwitch';

const Header = ({ onSortChange, onUnitChange, currentUnit, location}) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/">
                    <h1>
                        <FontAwesomeIcon className="eye" icon={faEye} /> Skying spies
                    </h1>
                </Link>
                <div className="header__items">
                    {location === '/' && <Dropdown onSortChange={onSortChange} />}
                    {location === '/' && (
                        <ButtonGroup
                            className="input-group__item"
                            type="radio"
                            name="options"
                            value={currentUnit}
                        >
                            <Button onClick={onUnitChange} className="button__pick" value={UNITS.CELSIUS}>
                                &deg;C
                            </Button>
                            <Button onClick={onUnitChange} className="button__pick" value={UNITS.FAHRENHEIT}>
                                &deg;F
                            </Button>
                            <Button onClick={onUnitChange} className="button__pick" value={UNITS.KELVIN}>
                                K
                            </Button>
                        </ButtonGroup>
                    )}
                </div>
            </div>
        </div>
    </header>
);

export default Header;
