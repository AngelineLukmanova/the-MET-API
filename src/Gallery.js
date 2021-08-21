import React, { useEffect, useState, useContext } from 'react';
import './Gallery.css'
import DisplaySearchResults from './DisplaySearchResults';
import { SearchContext } from './context/search.context';
import { SpinnerContext } from './context/spinner.context';
import axios from 'axios';

function Gallery() {
    const { searchRequest } = useContext(SearchContext);
    const { isLoading } = useContext(SpinnerContext);
    const [searchResults, setSearchResuts] = useState('');
    const [artResult, setArtResult] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isOnView=true&q=';
        let keyWordUrl = searchRequest.searchVal;
        let departmentUrl = searchRequest.selectDepartments === 'defaultSelect' ? '' : `&departmentId=${searchRequest.selectDepartments}`;
        let isHighlightUrl = searchRequest.checkedInput ? '&isHighlight=true' : '';

        setArtResult([]);
        const getArtIds = async () => {
            try {
                let res = await axios.get(`${baseUrl}${keyWordUrl}${departmentUrl}${isHighlightUrl}`, { headers: { Accept: 'application/json' } });
                let ids = res.data.objectIDs ? res.data.objectIDs.slice(0, 45) : setError('No posts were found. Try different key word');
                setSearchResuts(ids);
            } catch (e) {
                setError(e);
            }
        };
        searchRequest && getArtIds();
    }, [searchRequest]);

    return (
        <div className="Gallery">
            <div className="Gallery-search-results">
                {searchResults
                    ? <>
                        <div className={`Gallery-spinner ${isLoading ? '' : 'hide'}`}>
                            <i className="fas fa-circle-notch fa-spin"></i>
                            <h1>Loading...</h1>
                        </div>
                        <div className={`${!isLoading ? '' : 'hide'}`}>
                            <DisplaySearchResults
                                searchData={searchResults}
                                artData={artResult}
                                setArtData={setArtResult}
                                errorMsg={error}
                                setErrorMsg={setError}
                            />
                        </div>
                    </>
                    : <h1>
                        {error
                            ? error
                            : 'Welcome to The Metropolitan Museum of Art Collection API. Use the search form to find and experience beautiful art'
                        }
                    </h1>
                }
            </div>
        </div>
    );
}

export default Gallery;

