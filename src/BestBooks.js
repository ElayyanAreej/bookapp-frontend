import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import BooksCard from './BooksCard';
import AddBookForm from './AddBookForm';



class MyFavoriteBooks extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books:[],
      showData:false
    }
  }
  
  //componentDidMount()
  componentDidMount = async (e) => {
    // e.preventDefault();
    console.log("render books componentDidMount");
    const { user } = this.props.auth0;

    console.log(user);

    
    let booksData = await axios.get(`${process.env.REACT_APP_SERVER}/books?email=${user.email}`);
    console.log(`${process.env.REACT_APP_SERVER}/books`);
    console.log(booksData);
    
    this.setState ({
      books: booksData.data,
      showData:true
    })
    console.log(this.state.books)
  }

  addBook = async (e) =>{
    e.preventDefault();
console.log("add book functio");
const { user } = this.props.auth0;


let bookInfo = {
  title:e.target.title.value,
  description: e.target.description.value,
  status:e.target.status.value,
  email: user.email
}
console.log(bookInfo);
let bookData = await axios.post(`${process.env.REACT_APP_SERVER}/addBook`,bookInfo)
this.setState({
  books: bookData.data
}) 
this.componentDidMount();
  }

  deleteBook= async (bookID) =>{
    const { user } = this.props.auth0;

    let bookData= await axios.delete(`${process.env.REACT_APP_SERVER}/deleteBook/${bookID}?email=${user.email}`)
    console.log(`${process.env.REACT_APP_SERVER}/deleteBook/${bookID}?email=${user.email}`);
    this.setState({
      books: bookData.data
    })
    this.componentDidMount();
  }

  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <AddBookForm addBook={this.addBook}/>

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
                deleteBook = {this.deleteBook}/>
              )})
                }

        {/* <button onClick={this.getBooks}>view the books</button> */}
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
