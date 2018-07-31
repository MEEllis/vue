import React from 'react';

const FilterItem = (props) => (
    <li className="filter-item">
        <div className="filter-item-label">{ props.label }</div>
        <div className="filter-item-main">{ props.children }</div>
    </li>
);

export default FilterItem;
