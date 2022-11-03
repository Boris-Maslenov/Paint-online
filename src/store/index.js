import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from '../reducer/reducer';

//const store = createStore(reducer, compose( applyMiddleware(ReduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) );
const store = createStore(reducer,  applyMiddleware(ReduxThunk) );

export default store;