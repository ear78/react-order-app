import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* app is passed down in the render and browser router imported and used to wrap app for routing. */
const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
