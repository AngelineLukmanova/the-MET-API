import React, { useEffect } from 'react';
import Pagination from './Pagination';
import DisplayArt from './DisplayArt';

function DisplaySearchResults({ searchData, artData, setArtData, setErrorMsg }) {

    useEffect(() => {
        searchData.forEach(id => {
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
                .then((response) => {
                    if (response.ok) return response.json();
                    throw new Error('something went wrong while requesting posts');
                })
                .then((res) => setArtData(prevArray => [...prevArray, res]))
                .catch(() => setErrorMsg("Something went wrong. Try again."));
        });
    }, [searchData, setArtData, setErrorMsg]);

    return (
        <div className="DisplaySearchResults">
            {artData.length > 0 &&
                <Pagination
                    data={artData}
                    RenderComponent={DisplayArt}
                    pageLimit={5}
                    dataLimit={9}
                />
            }
        </div>
    );
}

export default DisplaySearchResults;
