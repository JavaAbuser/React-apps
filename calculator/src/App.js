import React from 'react';
import Calculator from "./components/Calculator";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import exercisesReducer from './pages/exercises/reduces/exercises';

const store = createStore(exercisesReducer);

class App extends React.Component{
render(){
  return (
      <div className="App">
          <Provider store={store}>
              <Calculator/>
          </Provider>
      </div>
  );
}
}

export default App;
