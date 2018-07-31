import React from 'react';
import ReactDOM from 'react-dom';

// Icon Style
import '../less/icon';

// svg
import fold from '../images/fold.svg';
import retract from '../images/retract.svg';
import triangle from '../images/triangle.svg';

// Icon Component
import Icon from './Icon';

ReactDOM.render(
  <div>
    <ul>
      <li><Icon glyph={fold} width={40} height={40} /></li>
      <li><Icon glyph={retract} width={40} height={40} /></li>
      <li><Icon glyph={triangle} width={40} height={40} /></li>
    </ul>
  </div>,
  document.getElementById('app')
);
