import React from "react";
import Card from "react-bootstrap/Card";
import Bookscard from "./BooksCard.css";

class BooksCard extends React.Component {
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
        </Card.Body>
      </Card>
    );
  }
}

export default BooksCard;
