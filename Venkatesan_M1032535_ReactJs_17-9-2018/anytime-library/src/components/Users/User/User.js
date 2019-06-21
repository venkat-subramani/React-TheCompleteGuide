import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
});

const User = (props) => {
    const { classes } = props;
    let userDetails = null;
    if(props.user.activeBooks){
        userDetails = (
            <div>
                <p>Active Books</p>
                <ul>
                    {props.user.activeBooks.map((book, index) => {
                        return (
                            <li key={book.id + index}>
                                {book.title}&emsp;-&emsp;Issued on {book.issuedOn}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    } else {
        userDetails = "No Active books for this user."
    }
    return (
        <ExpansionPanel expanded={props.expanded} onChange={props.clicked}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <p className={classes.heading}>{props.index + 1})&emsp;{props.user.email}</p>
                <p className={classes.secondaryHeading}>Registered on: {props.user.registeredOn}</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {userDetails}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default withStyles(styles)(User);