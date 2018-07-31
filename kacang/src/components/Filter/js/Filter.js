import React from 'react';
import FilterItem from './FilterItem';
import '../less/filter';

const Filter = (props) => (
    <ul className={ 'filter filter-' + props.type}>
        { props.children }
        { props.more }
    </ul>
);

export { FilterItem };
export default Filter;
