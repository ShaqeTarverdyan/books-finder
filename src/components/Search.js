import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { fetchBooksBySearch } from './books/booksSlice';


export const Search = () => {
    const dispatch = useDispatch();

    const [searchData, setSearchData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const canSearch = searchData.length && !isLoading;

    const handleSearchData = useCallback((e) => {
        if(canSearch) {
            try {
                setIsLoading(true);
                dispatch(fetchBooksBySearch(searchData))
            } catch(err) {
                console.log("failed to fetch data", err)
            } finally {
                setIsLoading(false)
            }
        }
    }, [canSearch, dispatch, searchData]);

    useEffect(() => {
        const getData = setTimeout(() => {
            handleSearchData()
        }, 500);

        return () => clearTimeout(getData)
    }, [searchData, handleSearchData])
    return (
        <>
            <div>
                <input 
                    name="searchData"
                    id="searchData"
                    placeholder="Find you favorite..."
                    type="text"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                />
                <button onClick={() => setSearchData('')}>X</button>
            </div>
            <button type="submit" onClick={handleSearchData} disabled={!canSearch}>Search</button>
        </>
    )
}