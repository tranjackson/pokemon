import { useState, useEffect } from 'react';  // Using React Hooks
import axios from 'axios'; // Import the axios library
import { Link } from 'react-router-dom';


// Import components
import Loading from '../components/Loading';

const Pokemons = () => {

    // State variables for pokemon data and loading status
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    // Add an error state
    const [error, setError] = useState(undefined);

    // Fetch data from the API
    useEffect( () => {
        window.setTimeout( () => {
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
                .then((response) => {
                    setPokemon(response.data.results);
                    setLoading(false);
                })
                .catch( (error) => {
                    // Handle any errors
                    console.log(error);
                    console.log(error.response);
    
                    // The error object contains a response which contains a status and data.
                    const { status, data } = error.response; 
    
                    setError(`${status} ${data}`);
    
                    setLoading(false);
                })
                .then( () => {
                    console.log('More!');
                });
        }, 3000);
    }
    , []); // Empty array to run the effect only once

    console.log(pokemon);

   
    // Display data once fetched
    return (
        <div>
            {/* If loading condition IS true, then display <Loading /> */}
            {loading && (
                <Loading />)
            }
            {/* If loading is false and error is undefined, but no Pokémon data was found then display the message */}
            {!loading && !error && pokemon.length === 0 && (
                <p className="lead text-center">No Pokemon found.</p>
                )}
            {/* If loading is NOT true, and error IS true, then display the message */}
            {!loading && error && (
                <p className="lead text-center text-danger">{error}</p>
            )}
            {/* If loading is NOT true, and error is NOT true and launches length is greater than 0, then display the data */}
            {
            !loading && !error && pokemon && (
                <div className="row">
                    {pokemon.map((poke, index) => (
                        <div className="col-md-3" key={index}>
                            <div className="card my-2 card-custom">
                                <div className="card-body card-content">
                                    <h5 className="card-title">{poke.name}</h5>
                                    <Link to={`/pokemon/${index + 1}`}>View</Link>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                </div>)
            } 
        </div>
    );
}

export default Pokemons; // Export the Pokemons component