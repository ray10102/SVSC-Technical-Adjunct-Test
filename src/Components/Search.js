import { useState } from 'react';

function Search(props) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const handleSubmit = (event) => {
        props.handleSubmit(value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Search by username: 
                <input type="text" value={value} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default Search;