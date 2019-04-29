import React, { Component } from 'react'
import Axios from 'axios';

import NotesList from './NotesList';
import WithLoading from './WithLoading';
import Logout from './Logout';

import getToken from '../helperFunctions/getToken';

import { Note } from '../interfaces/Note';

interface NotesState {
  notes?: Note[]
  isLoading?: boolean
}

const WithLoadingNotesList = WithLoading(NotesList);

export default class Home extends Component<{}, NotesState> {

  state = {
    notes: [],
    isLoading: false
  }


  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const token = getToken();
      const response = await Axios({
        method: 'get',
        url: '/api/notes',
        headers: {
          'authorization': token
        }
      });
      this.setState({ isLoading: false, notes: response.data });
    } catch (error) {
      console.log(error.response);
    }
  }


  render() {
    return (
      <div>
        <p>Your Dashboard</p>
        <Logout />
        <WithLoadingNotesList isLoading={this.state.isLoading} notes={this.state.notes} />
      </div>
    );
  }
}
