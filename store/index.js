import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import calculator from './reducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

// estado inicial da store
const initialState = {
  expression: '',
  displayE: '',
  result: 0,
};

// store
const store = createStore(
  calculator,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
