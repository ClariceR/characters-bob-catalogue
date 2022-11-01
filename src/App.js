import './App.css';
import { useReducer, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export function Item() {
  return (
    <div>
      <h1>Item detail</h1>
      <Link to="/">back to home</Link>
    </div>
  );
}

function Character({ name, image }) {
  return (
    <>
      <h2>{name}</h2>
      <img src={image} alt={name} height="150px" />
    </>
  );
}

const query = `
query {
  characters {
    id
    name
    image
    hairColor
    age
    occupation
    relatives {
      name
    }
    firstEpisode
    voicedBy
  }
}`;

const opts = {
  method: 'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify({ query }),
};

export function App() {
  const URL = `https://bobsburgers-api.herokuapp.com/graphql/`;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(URL, opts)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!data) return null;

  return (
    <div className="App">
      <div>
        {data.data.characters.map((character) => (
          <div className="characters-bkg" key={character.id}>
            <Character name={character.name} image={character.image} />
          </div>
        ))}
      </div>
    </div>
  );
}
