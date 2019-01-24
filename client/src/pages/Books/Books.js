import React, { Component } from 'react';
import SaveBtn from '../../components/SaveBtn';
import { Col, Row, Container } from '../../components/Grid';
import { Input, FormBtn } from '../../components/Form';
import { List, ListItem } from '../../components/List';
import API from '../../utils/API';

export default class Books extends Component {
  // Setting our component's initial state
  state = {
    books: [],
    savedBooks: [],
    title: '',
    author: '',
    synopsis: '',
    search: ''
  };

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ savedBooks: res.data }))
      .catch(err => console.log(err));
  };

  // Load books from MongoDB
  componentDidMount() {
    this.loadBooks();
  }

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
      .then(() => this.loadBooks())
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

  // Handle to search book
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBooks();
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <div className="search-elements">
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
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {this.state.books.length ? (
              <List>
                <Col size="md-12">
                  <h2>Search Results</h2>
                  {this.state.books.map(book => {
                    const isPresentInSavedBooks = !!this.state.savedBooks.find(
                      savedBook => {
                        return savedBook.id === book.id;
                      }
                    );

                    let saveBtnMarkup = undefined;

                    if (!isPresentInSavedBooks) {
                      saveBtnMarkup = (
                        <SaveBtn
                          data-id={book.id}
                          data-authors={book.volumeInfo.authors}
                          data-description={book.volumeInfo.description}
                          data-title={book.volumeInfo.title}
                          data-image={book.volumeInfo.imageLinks.smallThumbnail}
                          data-link={book.volumeInfo.previewLink}
                          onClick={this.saveBook}
                        />
                      );
                    }
                    return (
                      <ListItem key={book.id}>
                        <Row>
                          <Col size="md-2">
                            <img
                              src={book.volumeInfo.imageLinks.smallThumbnail}
                              alt={book.volumeInfo.title}
                            />
                          </Col>
                          <Col size="md-8">
                            <a href={'/books/' + book.id}>
                              <strong>
                                {book.volumeInfo.title} by{' '}
                                {book.volumeInfo.authors}
                              </strong>
                            </a>
                            <p>{book.volumeInfo.description}</p>
                          </Col>
                          <Col size="md-2">{saveBtnMarkup}</Col>
                        </Row>
                      </ListItem>
                    );
                  })}
                </Col>
              </List>
            ) : (
              <h3 className="text-center">
                Get started by searching for a book!
              </h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
