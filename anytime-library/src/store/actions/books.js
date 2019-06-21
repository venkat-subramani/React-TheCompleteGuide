import * as actionTypes from './actionTypes';
import db from '../../axios-atl';

export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    }
}

export const loadingFail = error => {
    return {
        type: actionTypes.LOADING_FAIL,
        error: error
    }
}

export const fetchBooksSuccess = books => {
    return {
        type: actionTypes.FETCH_BOOKS_SUCCESS,
        books: books
    }
}

export const fetchBooks = (token, userId) => {
    return dispatch => {
        dispatch(loadingStart());
        db.get('/books.json')
            .then(res => {
                const fetchedBooks = [];
                for(let key in res.data){
                    fetchedBooks.push({
                        id: key,
                        ...res.data[key]
                    })
                }
                dispatch(fetchBooksSuccess(fetchedBooks));
            })
            .catch(error => {
                dispatch(loadingFail(error));
            })
    }
}

export const addNewBookSuccess = book => {
    return {
        type: actionTypes.ADD_NEW_BOOK_SUCCESS,
        book: book
    }
}

export const addNewBook = book => {
    return dispatch => {
        dispatch(loadingStart());
        db.post('/books.json', book)
            .then(res => {
                const newBook = {...book};
                newBook.id= res.data.name;
                dispatch(addNewBookSuccess(newBook));
            })
            .catch(error => {
                dispatch(loadingFail(error));
            })
    }
}

export const editBookSuccess = book => {
    return {
        type: actionTypes.EDIT_BOOK_SUCCESS,
        book: book
    }
}

export const editBook = book => {
    return dispatch => {
        dispatch(loadingStart());
        db.patch('/books/' + book.id + '/.json', book)
            .then(res => {
                dispatch(editBookSuccess(res.data));
            })
            .catch(error => {
                dispatch(loadingFail(error));
            })
    }
}

export const deleteBookSuccess = book => {
    return {
        type: actionTypes.DELETE_BOOK_SUCCESS,
        book: book
    }
}

export const deleteBook = book => {
    return dispatch => {
        dispatch(loadingStart());
        db.delete('/books/' + book.id + '/.json')
            .then(res => {
                dispatch(deleteBookSuccess(book));
            })
            .catch(error => {
                dispatch(loadingFail(error));
            })
    }
}

export const updateUserWithBook = user => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
        user: user
    }
}

export const userLoadingStart = () => {
    return {
        type: actionTypes.USER_LOADING_START
    }
}

export const userLoadingFail = error => {
    return {
        type: actionTypes.USER_LOADING_FAIL,
        error: error
    }
}

export const issueBook = (book, user) => {
    return dispatch => {
        dispatch(loadingStart());
        db.patch('/books/' + book.id + '/.json', book)
            .then(res => {
                dispatch(editBookSuccess(res.data));
                dispatch(userLoadingStart());
                db.patch('/users/' + user.id + '/.json', user)
                    .then(response => {
                        dispatch(updateUserWithBook(user));
                    })
                    .catch(error => {
                        dispatch(userLoadingFail(error));
                    })
            })
            .catch(err => {
                dispatch(loadingFail(err));
            })
    }
}

export const returnBook = (book, user) => {
    return dispatch => {
        dispatch(loadingStart());
        db.patch('/books/' + book.id + '/.json', book)
            .then(res => {
                dispatch(editBookSuccess(res.data));
                dispatch(userLoadingStart());
                db.patch('/users/' + user.id + '/.json', user)
                    .then(response => {
                        dispatch(updateUserWithBook(user));
                    })
                    .catch(error => {
                        dispatch(userLoadingFail(error));
                    })
            })
            .catch(err => {
                dispatch(loadingFail(err));
            })
    }
}