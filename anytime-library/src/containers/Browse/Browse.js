import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Book from '../../components/Book/Book';
import BookDetails from '../../components/Book/BookDetails/BookDetails';
import classes from './Browse.css';

class Browse extends Component {
    state = {
        open: false,
        book: null
    };

    componentDidMount() {
        this.props.onFetchBooks();
        this.props.getLoggedInUser();
    };

    viewBookDetails = (book) => {
        this.setState({ open: true, book: book });
    };

    handleClose = () => {
        this.setState({ open: false, book: null });
    };

    issueBook = (book) => {
        if(book.availableCopies > 0){
            book.availableCopies--;
            const user = {
                ...this.props.loggedInUser,
            }
            const now = (new Date()).toString();
            if(!user.activeBooks){
                user.activeBooks = [];
            }
            user.activeBooks.push({
                ...book,
                issuedOn: now
            });
            this.props.onIssueBook(book, user);
        }
    }

    render(){
        let books = <Spinner />
        if(!this.props.loading && !this.props.userLoading){
            books = (
                this.props.books.map(book => (
                    <Book 
                        key={book.id} 
                        book={book}
                        viewDetails={() => this.viewBookDetails(book)} 
                        issueBook={() => this.issueBook(book)}
                        isAdmin={this.props.isAdmin}
                        loggedInUser={this.props.loggedInUser} />
                ))
            )
        }
        return (
            <div className={classes.Browse}>
                {books}
                {this.state.open ?
                    <BookDetails open={this.state.open} handleClose={this.handleClose} book={this.state.book} />
                    : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        books: state.books.books,
        loading: state.books.loading,
        userLoading: state.users.loading,
        isAdmin: state.auth.isAdmin,
        loggedInUser: state.users.loggedInUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLoggedInUser: () => dispatch(actions.getLoggedInUser()),
        onFetchBooks: () => dispatch(actions.fetchBooks()),
        onIssueBook: (book, user) => dispatch(actions.issueBook(book, user)),
        onReturnBook: (book, user) => dispatch(actions.returnBook(book, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse);