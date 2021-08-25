import React, { Component } from 'react';
import UpdateBookForm1 from './UpdateBookForm.css';

export class UpdateBookForm extends Component {
    render() {
        return (
            <div>
                 <form onSubmit={this.props.updateBookToApiServer}>
                     <lable>Book title</lable>
                    <input type="text" name="title" defaultValue={this.props.chosenBookToUpdateData.title} />
                    <br/>
                    <lable>Book description</lable>
                    <textarea rows="4" cols="50" name='description' defaultValue={this.props.chosenBookToUpdateData.description} />
                    <br/>
                    <lable>Book status</lable>
                    <input type="text" name='status'  defaultValue={this.props.chosenBookToUpdateData.status} />
                    <br/>
                    <input type="submit" value="Save Changes" />
                </form>
        
            </div>
        )
    }
}

export default UpdateBookForm;
