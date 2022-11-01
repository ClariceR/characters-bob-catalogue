import './App.css';
import { useReducer, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export function Detail(props) {
  const location = useLocation();
  console.log('props: ', props);
  console.log('location: ', location);

  const data = location.state?.data;
  return (
    <div>
      <div>
        <h1>{data.name}</h1>
        <img src={data.image} alt={data.name} height="150px" />
        <p>{data.firstEpisode ? `First episode: ${data.firstEpisode}` : ""}</p>
        <p>{data.age ? `Age: ${data.age}` : ""}</p>
        <p>{data.occupation ? `Occupation: ${data.occupation}` : ""}</p>
        <p>{data.voicedBy ? `Voiced by: ${data.voicedBy}` : ""}</p>
      </div>
      <Link to="/">back to home</Link>
    </div>
  );
}

function Character({ id, name, image, age, firstEpisode, occupation, voicedBy }) {
  const [data, setData] = useState({
    id: id,
    name: name,
    image: image,
    age: age,
    firstEpisode: firstEpisode,
    occupation: occupation,
    voicedBy: voicedBy,
  });
  return (
    <>
      <Link to="detail" state={{ data: data }}>
        <h2>{name}</h2>
      </Link>
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
            <Character
              id={character.id}
              name={character.name}
              image={character.image}
              age={character.age}
              firstEpisode={character.firstEpisode}
              occupation={character.occupation}
              voicedBy={character.voicedBy}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
