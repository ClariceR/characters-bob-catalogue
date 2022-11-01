import './App.css';
import {Link, Outlet} from 'react-router-dom'

export function Item() {
  return (
    <div>
      <h1>Item detail</h1>
      <Link to="/">back to home</Link>
    </div>
  );
}

export function App() {
  return (
    <div className="App">
      <h1>Homepage</h1>
      <h3>This is going to be the home page</h3>
      <p>The list of items are going to show here:</p>
      <p>Api call and display items</p>
      <ul>
        <li>
          <Link to='/item'>link to details</Link>
        </li>
      </ul>
    </div>
  );
}

