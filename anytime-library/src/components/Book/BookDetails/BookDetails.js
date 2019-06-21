import React from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import classes from './BookDetails.css';

const BookDetails = props => {
    let modal = null;
    if (props.open){
        const { book } = props;

        modal = (
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.open}
            onClose={props.handleClose}>
                <div className={classes.Modal}>
                    <Card className={classes.Card}>
                        <div className={classes.CardDetails}>
                            <CardContent className={classes.CardContent}>
                                <CardMedia
                                    className={classes.CardCover}
                                    image={book.imageUrl}
                                    title={book.title}
                                />
                                <Typography variant="headline">{book.title}</Typography>
                                <Typography variant="subheading" color="textSecondary">
                                    {book.authors}<br/>
                                    Category: {book.categories}<br/>
                                    Rating: {book.averageRating} ({book.ratingsCount})<br/>
                                    ISBN: {book.isbn}<br/>
                                </Typography><br/>
                                <Typography variant="body1">
                                    {book.description}
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                    <SimpleModalWrapped />
                </div>
            </Modal>
        )
    }
  
    return (
    <div>
        {modal}
    </div>
    );
}
  
// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = BookDetails;
  
export default SimpleModalWrapped;