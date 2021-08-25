import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import AddBookForm from './AddBookForm'

class BookModel extends React.Component {

  render() {
    return (
   <>

      <Modal show={this.props.showModel} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding Book</Modal.Title>
        </Modal.Header>
        <AddBookForm addBook={this.props.addBook} handleClose={this.props.handleClose}/>
        <Modal.Footer>
        
        
        </Modal.Footer>
      </Modal>
    </>
      
      );
  }
}

export default BookModel;
