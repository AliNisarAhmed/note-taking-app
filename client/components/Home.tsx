import React, { Component } from 'react'
import Axios from 'axios';
import Modal from 'react-modal';

import NotesList from './NotesList';
import WithLoading from './WithLoading';
import ModalChild from './ModalChild';
import Navbar from './Navbar';

import getToken from '../helperFunctions/getToken';

import { Note } from '../interfaces/Note';
import { ModalModes } from '../interfaces/ModalModes';


interface NotesState {
  notes?: Note[]
  isLoading?: boolean,
  modalIsOpen?: boolean,
  modalChildren?: ModalModes,
  clickedNoteId?: string,
}


const customStyles = {
  content : {
    top                   : '60%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const WithLoadingNotesList = WithLoading(NotesList);

class Home extends Component<{}, NotesState> {

  state = {
    notes: [],
    isLoading: false,
    modalIsOpen: false,
    modalChildren: null,
    clickedNoteId: '',
  }

  setModalChildren = (value: ModalModes) => {
    this.setState({ modalChildren: value });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }


  async componentDidMount() {
    try {
      await this.fetchNotes();
    } catch (error) {
      console.log(error.response);
    }
  }

  fetchNotes = async () => {
    this.setState({ isLoading: true });
    const token = getToken();
    const response = await Axios({
      method: 'get',
      url: '/api/notes',
      headers: {
        'authorization': token
      }
    });
    this.setState({ notes: response.data, isLoading: false });
  }

  handleNoteClick = (noteId:string) => {
    console.log(noteId);
    this.setState({ clickedNoteId: noteId, modalChildren: "show" }, this.openModal);
  }

  handleNoteDelete = async (noteId:string) => {
    console.log(noteId);
    try {
      const response = await Axios({
        method: 'delete',
        url:`/api/notes/${noteId}`,
        headers: {
          authorization: getToken()
        }
      });
      this.closeModal();
      this.fetchNotes();
    } catch (error) {
      console.log(error.response);  
    }
  }


  render() {
    return (
      <div className="home">
        <Navbar openModal={this.openModal} setModalChildren={this.setModalChildren} />
        <div className="container">
          <WithLoadingNotesList 
            isLoading={this.state.isLoading} 
            notes={this.state.notes} 
            handleNoteClick={this.handleNoteClick}
          />
          <Modal 
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            styles={customStyles}
          >
            <ModalChild 
              modalMode={this.state.modalChildren} 
              closeModal={this.closeModal}
              fetchNotes={this.fetchNotes}
              clickedNoteId={this.state.clickedNoteId}
              notes={this.state.notes}
              handleNoteDelete={this.handleNoteDelete}
              />
          </Modal>
        </div>
      </div>
    );
  }
}

export default Home;
