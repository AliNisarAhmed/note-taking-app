import * as React from 'react';

const AddNote = ({ openModal, setModalChildren }) => {

  function handleClick () {
    openModal();
    setModalChildren("new");
  }

  return (
    <a onClick={handleClick}>Add Note</a>
  );
}

export default AddNote;