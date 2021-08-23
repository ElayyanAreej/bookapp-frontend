import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import BooksCard from './BooksCard';


class MyFavoriteBooks extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books:[],
      showData:false
    }
  }
  getBooks = async (e) => {
    e.preventDefault();
    console.log("hiiii");

    
    let booksData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
    console.log(`${process.env.REACT_APP_SERVER}/books`);
    console.log(booksData);

    this.setState ({
      books: booksData.data,
      showData:true
    })
    console.log(this.state.books)
  }
  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        
        {this.state.showData &&
          this.state.books.map((item, idx) => {
            return (
              <BooksCard
                Key={idx}
                title={item.title}
                description={item.description} 
                status={item.status}
                email={item.email}/>
              )})
                }

        <button onClick={this.getBooks}>view the books</button>
      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;
