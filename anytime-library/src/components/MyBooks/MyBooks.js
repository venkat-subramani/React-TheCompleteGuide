import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './MyBooks.css';

class MyBooks extends Component {
    componentDidMount() {
        this.props.getLoggedInUser();
    };

    returnBook = (book) => {
        book.availableCopies++;
        const user = {
            ...this.props.loggedInUser,
        }
        const bookIndex = user.activeBooks.findIndex(activeBook => activeBook.id === book.id);
        user.activeBooks.splice(bookIndex, 1);
        const now = (new Date()).toString();
        if(!user.historyBooks){
            user.historyBooks = [];
        }
        user.historyBooks.push({
            ...book,
            returnedOn: now
        });
        this.props.onReturnBook(book, user);
    }

    render(){
        const CustomTableCell = withStyles(theme => ({
            head: {
              backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
            },
            body: {
              fontSize: 14,
            },
        }))(TableCell);
        
        let activeBookList = <Spinner />
        const noActiveBooks = (
            <Paper className={classes.ActiveBooks} elevation={1}>
                <Typography variant="headline" component="h3">
                    No Active books are available to return.
                </Typography>
                <Typography variant="caption">
                    Please browse books in library from Browse section
                </Typography>
            </Paper>
        );

        if(this.props.loggedInUser){
            const {activeBooks} = this.props.loggedInUser;
            if(activeBooks){
                activeBookList = (
                    <Paper className={classes.ActiveBooks}>
                        <h2 className={classes.header}>Active Books</h2>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>S.No</CustomTableCell>
                                    <CustomTableCell>Book Name</CustomTableCell>
                                    <CustomTableCell>Issued On</CustomTableCell>
                                    <CustomTableCell>Action</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activeBooks.map((book, index) => {
                                    return (
                                    <TableRow key={book.id}>
                                        <CustomTableCell component="th" scope="row">{index + 1}</CustomTableCell>
                                        <CustomTableCell>{book.title}</CustomTableCell>
                                        <CustomTableCell>{book.issuedOn}</CustomTableCell>
                                        <CustomTableCell>
                                            <Button size="small" color="primary" onClick={() => this.returnBook(book)}>
                                                Return
                                            </Button>
                                        </CustomTableCell>
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                )
            } else {
                activeBookList = noActiveBooks;
            }
        }
        return (
            <div className={classes.MyBooks}>
                {activeBookList}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.users.loading,
        loggedInUser: state.users.loggedInUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLoggedInUser: () => dispatch(actions.getLoggedInUser()),
        onReturnBook: (book, user) => dispatch(actions.returnBook(book, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);