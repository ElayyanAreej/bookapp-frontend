import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import BooksCard from "./BooksCard";
import AddBookForm from "./AddBookForm";
import BookModel from "./BookModel.js";
import UpdateBookForm from "./UpdateBookForm.js";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showData: false,
      showModel: false,
      chosenBookToUpdateData: {},
      showToDataUpdata: false,
    };
  }

  handleClose = () => {
    this.setState({
      showModel: false,
    });
  };

  handleShow = () => {
    this.setState({
      showModel: true,
    });
  };
  //to render directly
  componentDidMount = async (e) => {
    // e.preventDefault();
    console.log("render books componentDidMount");
    const { user } = this.props.auth0;

    console.log(user);

    let booksData = await axios.get(
      `${process.env.REACT_APP_SERVER}/books?email=${user.email}`
    );
    console.log(`${process.env.REACT_APP_SERVER}/books`);
    console.log(booksData);

    this.setState({
      books: booksData.data,
      showData: true,
    });
    console.log(this.state.books);
  };

  addBook = async (e) => {
    e.preventDefault();
    console.log("add book functio");
    const { user } = this.props.auth0;

    let bookInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
      email: user.email,
    };
    console.log(bookInfo);
    let bookData = await axios.post(
      `${process.env.REACT_APP_SERVER}/addBook`,
      bookInfo
    );
    this.setState({
      books: bookData.data,
    });
    this.componentDidMount();
  };

  deleteBook = async (bookID) => {
    const { user } = this.props.auth0;

    let bookData = await axios.delete(
      `${process.env.REACT_APP_SERVER}/deleteBook/${bookID}?email=${user.email}`
    );
    console.log(
      `${process.env.REACT_APP_SERVER}/deleteBook/${bookID}?email=${user.email}`
    );
    this.setState({
      books: bookData.data,
    });
    this.componentDidMount();
  };

  updateBook = async (bookID) => {
    console.log("in update fun");
    //to clear it first
    await this.setState({
      showToDataUpdata: false,
    });

    // show the data to user
    let chosenBookInfo = this.state.books.find((book) => {
      return book._id === bookID;
    });
    console.log(chosenBookInfo);

    this.setState({
      chosenBookToUpdateData: chosenBookInfo,
      showToDataUpdata: true,
    });
  };

  updateBookToApiServer = async (e) => {
    e.preventDefault();
    console.log("updateBookToApiServer");
    const { user } = this.props.auth0;

   let updatedBookInfo={
      title:e.target.title.value,
      description:e.target.description.value,
      status:e.target.status.value,
    };
    console.log("updated data",updatedBookInfo);

    let BookID = this.state.chosenBookToUpdateData._id;
    let booksData = await axios.put(`${process.env.REACT_APP_SERVER}/updateBook/${BookID}?email=${user.email}`, updatedBookInfo);
    this.setState({
      books: booksData.data
    })
    this.componentDidMount();
  };
  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <button onClick={this.handleShow}>Add A Book! </button>
        {/* <AddBookForm addBook={this.addBook} /> */}
        <BookModel
          handleShow={this.handleShow}
          handleClose={this.handleClose}
          showModel={this.state.showModel}
          addBook={this.addBook}
        />
        {this.state.showToDataUpdata && (
          <UpdateBookForm
            chosenBookToUpdateData={this.state.chosenBookToUpdateData}
            updateBookToApiServer={this.updateBookToApiServer}
          />
        )}

        {this.state.showData &&
          this.state.books.map((item, idx) => {
            return (
              <BooksCard
                Key={idx}
                bookId={item._id}
                title={item.title}
                description={item.description}
                status={item.status}
                email={item.email}
                deleteBook={this.deleteBook}
                updateBook={this.updateBook}
              />
            );
          })}
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
