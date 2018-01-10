import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';

const store = createStore(reducer);

/* app is passed down in the render and browser router imported and used to wrap app for routing. */
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
