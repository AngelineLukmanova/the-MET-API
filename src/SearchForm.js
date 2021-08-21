import React, { useEffect, useState, useContext } from 'react';
import './SearchForm.css';
import { SearchContext } from './context/search.context';
import { SpinnerContext } from './context/spinner.context';
import axios from 'axios';

function SearchForm() {
    const [departments, setDepartments] = useState([]);
    const { setSearchRequest } = useContext(SearchContext);
    const [selectDepartments, setSelectDepartments] = useState("defaultSelect");
    const [searchVal, setSearchVal] = useState('');
    const [checkedInput, setCheckedInput] = useState(false);

    const { isLoading, setLoading } = useContext(SpinnerContext);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                let dep = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/departments', { headers: { Accept: 'application/json' } });
                setDepartments(dep.data.departments);
            } catch (e) {
                alert(e);
            }
        };
        getDepartments();
    }, []);


    return (
        <div className={`SearchForm ${isLoading ? 'loading' : ''}`}>
            <div className="Gallery-form-container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setSearchRequest(searchVal, selectDepartments, checkedInput);
                }}>
                    <input
                        required
                        type="text"
                        placeholder="Enter Key Word..."
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}>
                    </input>
                    <select
                        value={selectDepartments}
                        onChange={e => setSelectDepartments(e.target.value)}>
                        <option value="defaultSelect">
                            All Departments
                        </option>
                        {departments.map(d => (
                            <option key={d.displayName} value={d.departmentId}>
                                {d.displayName}
                            </option>
                        ))}
                    </select>
                    <input
                        type="checkbox"
                        id="isHighlight"
                        checked={checkedInput}
                        onChange={() => setCheckedInput(!checkedInput)}
                    >
                    </input>
                    <label htmlFor="isHighlight">Important artwork in the collection</label>
                    <button onClick={() => setLoading(true)}>Search <i className="fas fa-search"></i></button>
                </form>
            </div>
        </div>
    );
}

export default SearchForm;