import * as React from 'react';

import NewNote from './NewNote';

class ModalChild extends React.Component {


  render() {
    if (this.props.modalMode === "new") {
      return <NewNote closeModal={this.props.closeModal} fetchNotes={this.props.fetchNotes}/>
    } else {
      <div>MODAL UPDATE</div>
    }
  }
}

export default ModalChild;
