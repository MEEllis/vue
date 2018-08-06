import React, { Component,Fragment } from 'react';
import Draggable from 'react-draggable';


class ModalDrag extends Component {

  render() {
    const {children } = this.props;
    debugger
    return (
      <Fragment>
          <Draggable>
            {[...children]}
          </Draggable>
      </Fragment>
    );
  }
}



export default ModalDrag;
