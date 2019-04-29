import * as React from 'react';

const AddNote = ({ openModal, setModalChildren }) => {

  function handleClick () {
    openModal();
    setModalChildren("new");
  }

  return (
    <button onClick={handleClick}>Add Note</button>
  );
}

export default AddNote;