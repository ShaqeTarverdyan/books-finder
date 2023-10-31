import React from 'react';
import { useSelector } from 'react-redux';

import { selectBooksIds, selectedBookById } from './booksSlice';

const Book = ({ bookId }) => {
    const book = useSelector(state => selectedBookById(state, bookId));
    return (
        <div>{book.volumeInfo.title}</div>
    )
}
export const BooksList = () => {
    const status = useSelector(state => state.books.status);
    const error = useSelector(state => state.books.error);
    const booksIds = useSelector(selectBooksIds);

    let content;
    if(status === 'idle') {
        content = <div>Please type your favorite book name</div>
    } else if(status === 'loading') {
        content = <div>Loading ...</div>
    } else if(status === 'succeeded') {
        content = 
            <>
                <h2>Books by result</h2>
                {
                    booksIds.map(id => (
                        <Book key={id} bookId={id}/>
                    ))
                }
            </>
    } else if(status === 'failed') {
        content = <div>{error.message}</div>
    }
    return (
        <section>
            {content}
        </section>
    )
}