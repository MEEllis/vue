import React, { Component,Fragment } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
class ModalDrag extends Component {

  render() {
    const {children } = this.props;
    return (
      <Fragment>
            {[...children]}
      </Fragment>
    );
  }
}



export default ModalDrag;
