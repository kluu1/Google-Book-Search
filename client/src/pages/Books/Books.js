import React, { Component } from 'react';
import SaveBtn from '../../components/SaveBtn';
import DeleteBtn from '../../components/DeleteBtn';
import { Col, Row, Container } from '../../components/Grid';
import { Input, FormBtn } from '../../components/Form';
import { List, ListItem } from '../../components/List';
import API from '../../utils/API';

export default class Books extends Component {
  // Setting our component's initial state
  state = {
    books: [],
    title: '',
    author: '',
    synopsis: '',
    search: ''
  };

  loadBooks = () => {
    // API.getBooks()
    //   .then(res =>
    //     this.setState({ books: res.data, title: "", author: "", synopsis: "" })
    //   )
    //   .catch(err => console.log(err));
  };

  // Search for books
  searchBooks = () => {
    API.searchBooks(this.state.search)
      .then(res => this.setState({ books: res.data.items }))
      .catch(err => console.log(err));
  };

  saveBook = event => {
    // Destructure data from SaveBtn clicked
    const {
      id,
      authors,
      title,
      description,
      link,
      image
    } = event.target.dataset;
    // Save the book into MongoDB
    API.saveBook({
      id,
      authors,
      title,
      description,
      link,
      image
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  // Handle change inputs
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBooks();
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <form>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Book to search"
              />
              <FormBtn
                disabled={!this.state.search}
                onClick={this.handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <h1>Results</h1>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book.id}>
                      <img
                        src={book.volumeInfo.imageLinks.smallThumbnail}
                        alt={book.volumeInfo.title}
                      />
                      <a href={'/books/' + book.id}>
                        <strong>
                          {book.volumeInfo.title} by {book.volumeInfo.authors}
                        </strong>
                      </a>
                      <SaveBtn
                        data-id={book.id}
                        data-authors={book.volumeInfo.authors}
                        data-description={book.volumeInfo.description}
                        data-title={book.volumeInfo.title}
                        data-image={book.volumeInfo.imageLinks.smallThumbnail}
                        data-link={book.volumeInfo.previewLink}
                        onClick={this.saveBook}
                      />
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
