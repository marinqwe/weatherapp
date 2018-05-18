import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';

export const SearchForm = props => (
    <div className="form-content">
        <div className="text-input-title">Search for 5 day forecast of any city...</div>
        {props.error && <div className="error">{props.error}</div>}
        <form className="form" onSubmit={props.submitForm}>
            <div className="form-input-note">
            <input
                className="text-input"
                type="text"
                placeholder="Search..."
                value={props.city || ''}
                onChange={props.onInputChange}
            />
            <div className="form-note">Note: City names must be capitalized properly.</div>
            </div>
            <button className="button"><FontAwesomeIcon icon={faSearch}/></button>
        </form>
    </div>
);
