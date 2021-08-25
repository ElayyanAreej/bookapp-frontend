import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Bookscard from "./BooksCard.css";

class BooksCard extends React.Component {
  deleteBookFun = () =>{
    this.props.deleteBook(this.props.bookId)
}
updateBookFun = () =>{
  this.props.updateBook(this.props.bookId)
}
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.description}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            Status:{this.props.status}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Email:{this.props.email}
          </Card.Subtitle>
          <Button variant="primary" onClick={this.deleteBookFun}>Delete</Button>
          <Button variant="primary" onClick={this.updateBookFun}>update</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default BooksCard;
