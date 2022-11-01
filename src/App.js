import './App.css';

function Item() {
  return (
    <div>
      <h1>Item detail</h1>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Homepage</h1>
      <h3>This is going to be the home page</h3>
      <p>The list of items are going to show here:</p>
      <p>Api call and display items</p>
      <ul>
        <li>link to details</li>
      </ul>

    </div>
  );
}

export default App;
