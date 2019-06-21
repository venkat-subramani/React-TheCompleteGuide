import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import classes from './Book.css';

const Book = props => {
    const { book, loggedInUser } = props;
    
    let issued = false;
    if(loggedInUser && loggedInUser.activeBooks){
        const bookIssued = loggedInUser.activeBooks.find(active => book.id === active.id);
        if(bookIssued){
            issued = true;
        }
    }
    book.availableCopies = Number(book.availableCopies);
    book.totalCopies = Number(book.totalCopies);

    return (
        <Card className={classes.Card}>
            <CardMedia
                className={classes.CardCover}
                image={book.imageUrl}
                title={book.title}
            />
            <div className={classes.CardDetails}>
                <CardContent className={classes.CardContent}>
                    <Typography variant="headline">{book.title}</Typography>
                    <Typography variant="subheading" color="textSecondary">
                        {book.authors}
                    </Typography>
                    { props.isAdmin ? <Typography variant="body1">
                        Copies: {book.availableCopies}/{book.totalCopies}
                    </Typography> : null }
                    { !props.isAdmin ? <Typography variant="body1">
                        Available Copies: {book.availableCopies}
                    </Typography> : null}
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={props.viewDetails}>
                        Details
                    </Button>
                    { props.isAdmin ? <Button size="small" color="primary" onClick={props.editBook}>
                        Edit
                    </Button> : null }
                    { props.isAdmin ? <Button size="small" color="primary" onClick={props.deleteBook} disabled={book.totalCopies !== book.availableCopies}>
                        Delete
                    </Button>: null }
                    { !props.isAdmin ? <Button size="small" color="primary" onClick={props.issueBook} disabled={book.availableCopies === 0 || issued}>
                        {!issued ? 'Issue': 'Issued'}
                    </Button>: null }
                    {/* { !props.isAdmin ? <Button size="small" color="primary" onClick={props.returnBook} disabled={!issued}>
                        Return
                    </Button>: null } */}
                </CardActions>
            </div>
        </Card>
    )
};
  
export default Book;