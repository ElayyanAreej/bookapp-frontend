import React, { Component } from 'react'

export class AddBookForm extends Component {
    addBookAndHandelClose =  (e) => {
        e.preventDefault();
        this.props.addBook(e);
        this.props.handleClose();
    }
    render() {
        return (
            <div>
                 <form onSubmit={this.addBookAndHandelClose}>
                    <input type="text" name='title' placeholder='Book title' />
                    <input type="text" name='description' placeholder='Book description' />
                    <input type="text" name='status' placeholder='Book status' />

                    <input type="submit" value="Add Book" />
                </form>
        
            </div>
        )
    }
}

export default AddBookForm
