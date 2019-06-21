import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Stocks.css';
import Book from '../../components/Book/Book';
import BookDetails from '../../components/Book/BookDetails/BookDetails';
import AddBook from '../../components/Book/AddBook/AddBook';

class Stocks extends Component {
    state = {
        add: false,
        open: false,
        book: null,
        editBook: null
    };

    componentDidMount() {
        this.props.onFetchBooks();
    };

    viewBookDetails = (book) => {
        this.setState({ open: true, book: book });
    };

    openAddBookDialog = (book) => {
        this.setState({ add: true, editBook: book });
    };

    openEditBookDialog = (book) => {
        this.setState({ add: true, editBook: book });
    }
    
    handleClose = () => {
        this.setState({ open: false, book: null, add: false });
    };

    saveBook = (book) => {
        if(!book.id){
            this.props.onAddBook(book);
        } else {
            this.props.onEditBook(book);
        }
        this.setState({add: false });
    }

    render() {
        let books = <Spinner />
        if(!this.props.loading){
            books = (
                this.props.books.map(book => (
                    <Book 
                        key={book.id} 
                        book={book}
                        viewDetails={() => this.viewBookDetails(book)}
                        editBook={() => this.openEditBookDialog(book)} 
                        deleteBook={() => this.props.onDeleteBook(book)}
                        isAdmin={this.props.isAdmin} />
                ))
            )
        }

        return (
            <div className={classes.Stocks}>
                <Button variant="contained" color="secondary" className={classes.addButton} onClick={() => this.openAddBookDialog('new')}>
                    Add New Book&emsp;
                    <AddCircleIcon  />
                </Button>
                {books}
                {this.state.open ?
                    <BookDetails open={this.state.open} handleClose={this.handleClose} book={this.state.book} />
                    : null }
                {this.state.add ?
                    <AddBook 
                        add={this.state.add} 
                        handleClose={this.handleClose} 
                        book={this.state.editBook}
                        saveBook={(book) => this.saveBook(book)} />
                    : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        books: state.books.books,
        loading: state.books.loading,
        isAdmin: state.auth.isAdmin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchBooks: () => dispatch(actions.fetchBooks()),
        onAddBook: (book) => dispatch(actions.addNewBook(book)),
        onEditBook: (book) => dispatch(actions.editBook(book)),
        onDeleteBook: (book) => dispatch(actions.deleteBook(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stocks);