import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable';
import { reducer as formReducer } from 'redux-form';
import rootEpic from './redux/epics/index';
import reducers from './redux/reducers/';

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = compose(
    applyMiddleware(epicMiddleware, ),
  )(createStore);

const reducer = combineReducers(
    {
        ...reducers,
        form: formReducer
    });

export const store = createStoreWithMiddleware(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Application = (
    <Provider store={store}>
        <App />
    </Provider>);

ReactDOM.render(Application, document.getElementById('root'));
