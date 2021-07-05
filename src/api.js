import * as React from 'react';
import './App.css';

const { useState, useEffect } = React;

function API() {
    const [name, setName] = useState(null);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    {name != null ? `Repository: ${name}` : "Loading"}
                </p>
            </header>
        </div>
    );
}

export default API;
