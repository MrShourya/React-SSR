import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Home from './src/pages/homePageComponent';

ReactDOM.hydrate(
    <BrowserRouter>
        <Home></Home>
    </BrowserRouter>,
    document.querySelector('#root')
);
