import React, { useState, useContext } from 'react';
import './Pagination.css';
import { SpinnerContext } from './context/spinner.context';

function Pagination({ data, RenderComponent, pageLimit, dataLimit }) {
    const [currentPage, setCurrentPage] = useState(1);
    const { setLoading } = useContext(SpinnerContext);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
        window.scrollTo(0, 0);
        setLoading(true);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
        window.scrollTo(0, 0);
        setLoading(true);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
        setLoading(true);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(Math.ceil(data.length / dataLimit)).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div>
            <div className="dataContainer">
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent key={idx} data={d} />
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}
                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === Math.ceil(data.length / dataLimit) ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>
        </div>
    );
}

export default Pagination;