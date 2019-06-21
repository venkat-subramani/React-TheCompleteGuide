import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    books: [],
    loading: false
}

const loadingStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const loadingFail = (state, action) => {
    return updateObject(state, {loading: false});
}

const fetchBooksSuccess = (state, action) => {
    return updateObject(state, {books: action.books, loading: false});
}

const addNewBookSuccess = (state, action) => {
    const books = [ ...state.books ];
    books.push(action.book);
    return updateObject(state, {books: books, loading: false});
}

const editBookSuccess = (state, action) => {
    const books = [ ...state.books ];
    const updatedBookIndex = books.findIndex(book =>  book.id === action.book.id);
    books[updatedBookIndex] = { ...action.book }
    return updateObject(state, {books: books, loading: false});
}

const deleteBookSuccess = (state, action) => {
    const books = [ ...state.books ];
    const deletedBookIndex = books.findIndex(book =>  book.id === action.book.id);
    books.splice(deletedBookIndex, 1);
    return updateObject(state, {books: books, loading: false});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_START: return loadingStart(state, action);
        case actionTypes.LOADING_FAIL: return loadingFail(state, action);
        case actionTypes.FETCH_BOOKS_SUCCESS: return fetchBooksSuccess(state, action);
        case actionTypes.ADD_NEW_BOOK_SUCCESS: return addNewBookSuccess(state, action);
        case actionTypes.EDIT_BOOK_SUCCESS: return editBookSuccess(state, action);
        case actionTypes.DELETE_BOOK_SUCCESS: return deleteBookSuccess(state, action);
        default: return state;
    }
}

export default reducer;