import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "AIzaSyDEXnGL3RyA7UIWdJuD4_tnKVmWLBy9ztc";
const apiUrl = "https://www.googleapis.com/books/v1/volumes";

const booksAdapter = createEntityAdapter({});

const initialState = booksAdapter.getInitialState({
    status: 'idle',
    error: null
});

export const fetchBooksBySearch = createAsyncThunk('books/fetchBooksBySearch', async (searchName) => {
    const response = await axios.get(`${apiUrl}?q=intitle:${searchName}&key=${apiKey}`);
    return response.data.items;
});

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBooksBySearch.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchBooksBySearch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload, state.entities)
                booksAdapter.setAll(state, action.payload);
            })
            .addCase(fetchBooksBySearch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

    }
});


export default booksSlice.reducer;

export const {
    selectAll: selectAllBooks,
    selectById: selectedBookById,
    selectIds: selectBooksIds
} = booksAdapter.getSelectors(state => state.books)