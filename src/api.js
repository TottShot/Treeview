import React from 'react';
import './App.css';
import fetchGraphQL from './utilities/fetchGraphQL';

const { useState, useEffect } = React;

function API() {
    const [name, setName] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        fetchGraphQL(`
      query RepositoryNameQuery {
        hello
      }
    `).then(response => {
            if (abortController.signal.aborted) {
                return;
            }
            const data = response.data;
            setName(data.hello);
        }).catch(error => {
            console.error(error);
        });

        return () => abortController.abort();
    }, []);

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
