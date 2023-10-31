import { configureStore } from "@reduxjs/toolkit";

import booksReducer from "./components/books/booksSlice";


export default configureStore({
    reducer: {
        books: booksReducer
    }
})