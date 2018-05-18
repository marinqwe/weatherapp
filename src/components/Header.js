import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faEye from '@fortawesome/fontawesome-free-solid/faEye';
import Dropdown from './Dropdown';

const Header = props => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/">
                    <h1>
                        <FontAwesomeIcon className="eye" icon={faEye} /> Skying spies
                    </h1>
                </Link>
                <div className="navbar__items">
                    {props.location === '/' && <Dropdown onSortChange={props.onSortChange} />}
                    {props.location === '/' && (
                        <ButtonGroup
                            className="input-group__item"
                            type="radio"
                            name="options"
                            value={props.currentUnit}
                        >
                            <Button onClick={props.onUnitChange} className="button__pick" value="metric">
                                &deg;C
                            </Button>
                            <Button onClick={props.onUnitChange} className="button__pick" value="imperial">
                                &deg;F
                            </Button>
                            <Button onClick={props.onUnitChange} className="button__pick" value="">
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
