import React from 'react';

const Dropdown = props => (
    <div className="input-group">
        <div className="input-group__item">
            <select className="select" onChange={props.onSortChange}>
                <option>Sort data...</option>
                <option value="aNames">Ascending names</option>
                <option value="dNames">Descending names</option>
                <option value="aTemps">Ascending temperatures</option>
                <option value="dTemps">Descending temperatures</option>
            </select>
        </div>
        
    </div>
);

export default Dropdown;
