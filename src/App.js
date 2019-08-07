import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducer';
import AddContact from './Components/AddContact';
import ContactContainer from './Components/ContactContainer';
import './App.css';

const store = createStore(reducers, applyMiddleware(thunk));
function App() {
  return (
    <Provider store={store}>
        <div className="App">
          <BrowserRouter baseroute='/'>
            <Switch>
              <Route path='/add' render={(props) => <AddContact {...props} />} />
              <Route path='/edit' render={(props) => <AddContact {...props} />} />
              <Route path='/' render={(props) => <ContactContainer {...props} />} />
              <Redirect to='/' />
            </Switch>
         </BrowserRouter>
        </div>
    </Provider>
  );
}

export default App;
