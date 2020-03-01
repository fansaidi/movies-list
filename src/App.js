import React from 'react';
import './App.css';
import MoviesList from './components/Movies/List';
import { Switch, Route } from 'react-router-dom';
import Details from './components/Details/Details';

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Switch>
          <Route path="/movies/:id" component={Details} exact />
            <React.Fragment>
              <MoviesList />
            </React.Fragment>
        </Switch>
      </div>
    </div>
  );
}

export default App;
