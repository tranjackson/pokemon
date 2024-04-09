import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Loading from "../components/Loading";

const PokeDetails = () => {
  const params = useParams();
  console.log(params);
  // Get the id from the URL
  const { id } = useParams();
  console.log(id);

  // State variables for pokemon data and loading status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [pokemon, setPokemon] = useState(undefined);

  // Fetch data from the API
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
          setPokemon(response.data);
          setLoading(false);
        })
        .catch((error) => {
          // Handle any errors
          console.log(error);
          console.log(error.response);

          // The error object contains a response which contains a status and data.
          // Including network connection error
          const { status, data } = error.response
            ? error.response
            : {
                status: "Network Error",
                data: "Please check your internet connection",
              };

          setError(`${status} ${data}`);
          setLoading(false);
        })
        .then(() => {
          console.log("More!");
        });
    }, 3000);
  }, [id]); // Empty array to run the effect only once

  console.log(pokemon);

  // Display data once fetched
  return (
    <div>
      {/* If loading condition IS true, then display <Loading /> */}
      {loading && <Loading />}

      {/* If loading is NOT true, and there is NO error, then display the message */}
      {!loading && !error && !pokemon && (
        <div className="text-center">
          <p className="lead text-center">No Pokemon found.</p>
        </div>
      )}
      {/* If loading is NOT true, and error IS true, then display the message */}
      {!loading && error && (
        <div className="text-center">
          <p className="lead">{error}</p>
          <Link to="/" className="btn btn-custom">
            Go Back
          </Link>
        </div>
      )}
      {/* If loading is NOT true, and error is NOT true and launch state has data then display the data */}
      {!loading && !error && pokemon && (
        <div className="card">
          <div className="card-header header-custom">
            <h5>{pokemon.name}</h5>
          </div>
          <div className="card-body">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div>
              <table className="table table-light table-striped table-hover custom-table-striped">
                <thead className="custom-thead">
                  <tr>
                    <th scope="col">Stats</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Dynamically create rows for each stat */}
                  {pokemon.stats.map((item) => (
                    <tr key={item.stat.name}>
                      <th scope="row">{item.stat.name.replace("-", " ")}</th>
                      <td>{item.base_stat}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Height</th>
                    <td>{pokemon.height}</td>
                  </tr>
                  <tr>
                    <th scope="row">Weight</th>
                    <td>{pokemon.weight}</td>
                  </tr>
                  <tr>
                    <th scope="row">Base Experience</th>
                    <td>{pokemon.base_experience}</td>
                  </tr>
                  <tr>
                    <th scope="row">Abilities</th>
                    <td>
                      {pokemon.abilities
                        .map((ability) => ability.ability.name)
                        .join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Types</th>
                    <td>
                      {pokemon.types.map((type) => type.type.name).join(", ")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <Link to="/" className="btn btn-primary">
              Go back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeDetails;
