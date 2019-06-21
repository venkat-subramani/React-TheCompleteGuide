import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import classes from './AddBook.css';
import { BookFields } from './BookFields';

class AddBook extends Component {
    state = {
        book: null,
        disableSave: true
    };

    componentDidMount() {
        if(this.props.book === 'new'){
            let newBook = {};
            BookFields.forEach(f => {
                newBook[f.field] = "";
            });
            this.setState({
                book: { ...newBook }
            });
        } else {
            this.setState({
                book: { ...this.props.book }
            });
        }
    }

    handleChange = prop => event => {
        this.setState({
            book: {
                ...this.state.book,
                [prop]: event.target.value
            }
        });
    };

    checkValid = () => {
        if(this.state.book){
            let invalidFields = 0;
            BookFields.forEach(input => {
                if(input.required){
                    const invalid = this.state.book[input.field].length === 0;
                    if(invalid){
                        invalidFields++;
                    }
                }
            });
            if(invalidFields > 0){
                this.setState({disableSave: true});
            } else {
                this.setState({disableSave: false});
            }
        }
    }

    render(){
        let bookDialog = null;
        if(this.state.book){
            let textFields = null;
            textFields = BookFields.map((input,index) => {
                return (
                    <TextField
                        key={index}
                        id={input.field}
                        label={input.label}
                        type={input.type}
                        className={classes.textField}
                        value={this.state.book[input.field]}
                        onChange={this.handleChange(input.field)}
                        onBlur={this.checkValid}
                        margin="normal"
                        multiline={input.multiline}
                        rows={input.rows}
                        helperText={input.helperText}
                        style={{width: input.width}}
                        autoFocus={input.autofocus}
                        required={input.required}
                    />
                )
            });

            bookDialog = (
                <Modal
                open={this.props.add}
                onClose={this.props.handleClose}
                aria-labelledby="book-dialog-title">
                    <div className={classes.Modal}>
                        <Typography variant="title" gutterBottom>Add or Edit a Book</Typography>
                        <form className={classes.container} noValidate autoComplete="off">
                            {textFields}
                        </form>
                        <br/><br/>
                        <div style={{float: 'right'}}>
                            <Button onClick={this.props.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => this.props.saveBook(this.state.book)} color="primary" disabled={this.state.disableSave}>
                                Save
                            </Button>
                        </div>
                    </div>
                </Modal>
            )
        }
        return (
            <div>
                {bookDialog}
            </div>
        )
    }
};

export default AddBook;