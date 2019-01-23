import React, { Component } from 'react';
import { Col, Row, Container } from '../../components/Grid';
import DeleteBtn from '../../components/DeleteBtn';
import { List, ListItem } from '../../components/List';
import API from '../../utils/API';

export default class Saved extends Component {
  // Setting our component's initial state
  state = {
    savedBooks: []
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

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <h2>Saved Books</h2>
            {this.state.savedBooks.length ? (
              <List>
                {this.state.savedBooks.map(book => {
                  return (
                    <ListItem key={book.id}>
                      <Row>
                        <Col size="md-2">
                          <img src={book.image} alt={book.title} />
                        </Col>
                        <Col size="md-8">
                          <a href={book.link}>
                            <strong>
                              {book.title} by {book.authors}
                            </strong>
                          </a>
                          <p>{book.description}</p>
                        </Col>
                        <Col size="md-2">
                          <DeleteBtn onClick={() => this.deleteBook(book.id)} />
                        </Col>
                      </Row>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3 className="text-center">No Saved Books to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
